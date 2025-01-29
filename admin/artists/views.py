from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from artists.producers import request_artists, request_verify_artist
from artists.consumers import artists_response

class Artists(APIView):

    permission_classes = [IsAuthenticated]

    
    def get(self, request):
        request_artists()
        artists = artists_response()
        return Response({'data': artists}, status=status.HTTP_200_OK)
    
    def patch(self, request):
        try:
            request_verify_artist(request.data)
            response = artists_response()
            return Response({'data': response}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Not implemented'}, status=status.HTTP_501_NOT_IMPLEMENTED)

