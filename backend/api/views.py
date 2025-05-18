import openai
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# ——— Login ———
class LoginView(APIView):
    def post(self, request):
        serializer = TokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            return Response({'token': serializer.validated_data['access']})
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

# ——— Generate ———
class GenerateImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        image_file   = request.FILES.get('image')
        prompt       = request.data.get('prompt')
        aspect_ratio = request.data.get('aspectRatio')

        if not image_file or not prompt:
            return Response(
                {'detail': 'Missing image or prompt.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        openai.api_key = settings.OPENAI_API_KEY
        try:
            response = openai.Image.create_variation(
                image=image_file,
                n=1,
                size="1024x1024"
            )
            url = response['data'][0]['url']
            return Response({'imageUrl': url})
        except Exception as e:
            return Response(
                {'detail': 'Generation failed', 'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
