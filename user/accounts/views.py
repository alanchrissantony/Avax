from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts.models import Users, OTP
from accounts.serializers import UserSerializer, CustomTokenObtainPairSerializer
from accounts.tasks import send_email
from django.utils.crypto import get_random_string
from django.shortcuts import get_object_or_404


# Create your views here.
class SendOTPView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        email = request.data.get('email')
        registered = request.data.get('registered')
        if not email:
            return Response({'detail': 'Email is required'}, status=400)
        
        user_exists = Users.objects.filter(email=email, is_active=True).exists()

        if registered and not user_exists:
            return Response({'detail': 'User does not exist'}, status=400)

        if not registered and user_exists:
            return Response({'detail': 'User already exists'}, status=400)
      
        otp = get_random_string(length=6, allowed_chars='0123456789')
        OTP.objects.filter(email=email).delete()
        OTP.objects.create(email=email, otp=otp)

        subject='OTP Verification'
        message= f"{otp} is your One-Time Password for account verification on Avax. This OTP is valid for 1 minute. Please do not share it with anyone."

        try:
            send_email.delay(email, subject, message)
        except Exception as e:
            print(e)
            return Response({'detail': 'Failed to send OTP. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print(otp)
        return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)
    
class VerifyOTPView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        try:
            otp_entry = OTP.objects.get(email=email, otp=otp)
        except OTP.DoesNotExist:
            return Response({'detail': 'Invalid OTP. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)

        if otp_entry.is_expired():
            otp_entry.delete()
            return Response({'detail': 'OTP has expired. Please request a new one.'}, status=status.HTTP_400_BAD_REQUEST)
        print(request.data)
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            otp_entry.delete()
            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ResetView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        password = request.data.get('password')
        
        try:
            otp_entry = OTP.objects.get(email=email, otp=otp)
        except OTP.DoesNotExist:
            return Response({'detail': 'Invalid OTP. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)
 
        if otp_entry.is_expired():
            otp_entry.delete()
            return Response({'detail': 'OTP has expired. Please request a new one.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Users.objects.get(email=email)
        except Users.DoesNotExist:
            return Response({'detail': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(data={'password': password}, partial=True)
        
        if serializer.is_valid():
            user.set_password(serializer.validated_data['password'])
            user.save()
            otp_entry.delete()
            return Response({"message": "Password has been changed successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomTokenRefreshView(TokenRefreshView):
    pass


class UpdateUserView(APIView):

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        otp = request.data.get('otp')
        data = request.data.get('data')

        if not email or not otp:
            return Response({'detail': 'Email and OTP are required.'}, status=status.HTTP_400_BAD)
        
        otp_instance = OTP.objects.filter(email=email, otp=otp).first()

        if not otp_instance:
            return Response({'detail': 'Invalid OTP.'}, status=status.HTTP_400_BAD)
        
        if otp_instance.is_expired():
            return Response({'detail': 'OTP has expired. Please request a new one.'}, status=status.HTTP_400_BAD)
        
        artist = get_object_or_404(Users, email=email)

        serializer = UserSerializer(artist, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            otp_instance.delete()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)