# api/views.py

import io
import base64
import replicate
from django.conf import settings
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

replicate.api_token = settings.REPLICATE_API_TOKEN


class GenerateImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):

        image_file   = request.FILES.get("image")
        prompt       = request.data.get("prompt")
        aspect_ratio = request.data.get("aspectRatio")
        if not image_file or not prompt:
            return Response(
                {"detail": "Missing image or prompt."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Wrap the uploaded file in BytesIO
        raw = image_file.read()
        img_stream = io.BytesIO(raw)

        # Replicate inputs
        model_name = "black-forest-labs/flux-dev"
        replicate_input = {
            "prompt": prompt,
            "guidance": 5.0,
            "image": img_stream,          
            "aspect_ratio": aspect_ratio, 
            "output_format": "jpg"
        }

        # Run the model
        try:
            output_files = replicate.run(model_name, input=replicate_input)
        except Exception as e:
            return Response(
                {"detail": "Replicate API error", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Read the first output’s bytes and base64‑encode
        try:
            jpg_bytes = output_files[0].read()
            b64 = base64.b64encode(jpg_bytes).decode("utf-8")
        except Exception as e:
            return Response(
                {"detail": "Output processing error", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Return JSON with base64‑jpeg
        return Response(
            {"imageData": b64},
            status=status.HTTP_200_OK
        )
