from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts.models import Users, OTP
from accounts.serializers import UserSerializer, CustomTokenObtainPairSerializer
from accounts.tasks import send_otp_email
from django.utils.crypto import get_random_string


# Create your views here.
class SendOTPView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        email = request.data.get('email')
        registered = request.data.get('registered')
        if not email:
            return Response({'error': 'Email is required'}, status=400)
        
        user_exists = Users.objects.filter(email=email, is_active=True).exists()

        if registered and not user_exists:
            return Response({'error': 'User does not exist'}, status=400)

        if not registered and user_exists:
            return Response({'error': 'User already exists'}, status=400)
      
        otp = get_random_string(length=6, allowed_chars='0123456789')
        OTP.objects.filter(email=email).delete()
        OTP.objects.create(email=email, otp=otp)

        try:
            send_otp_email.delay(email, otp)
        except Exception as e:
            print(e)
            return Response({'error': 'Failed to send OTP. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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
            return Response({'error': 'Invalid OTP. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)

        if otp_entry.is_expired():
            otp_entry.delete()
            return Response({'error': 'OTP has expired. Please request a new one.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)

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
            return Response({'error': 'Invalid OTP. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)
 
        if otp_entry.is_expired():
            otp_entry.delete()
            return Response({'error': 'OTP has expired. Please request a new one.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Users.objects.get(email=email)
        except Users.DoesNotExist:
            return Response({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data={'password': password}, partial=True)
        
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


