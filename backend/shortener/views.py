from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ShortURL
from .serializers import ShortURLSerializer
from django.http import HttpResponseRedirect


class ShortenURLView(APIView):
    def post(self, request):
        serializer = ShortURLSerializer(data=request.data)
        if serializer.is_valid():
            short_url = ShortURL.objects.create(
                original_url=serializer.validated_data['original_url']
            )
            # Use http or https based on incoming request
            scheme = request.scheme
            host = request.get_host()
            return Response({
                'short_url': f"{scheme}://{host}/{short_url.short_code}"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RedirectView(APIView):
    def get(self, request, short_code):
        print(f"Redirecting for code: {short_code}")  # Add this for debug
        short_url = get_object_or_404(ShortURL, short_code=short_code)
        short_url.click_count += 1
        short_url.save()
        return HttpResponseRedirect(redirect_to=short_url.original_url)


class AnalyticsView(APIView):
    def get(self, request, short_code):
        short_url = get_object_or_404(ShortURL, short_code=short_code)
        return Response({
            'short_code': short_code,
            'click_count': short_url.click_count
        }, status=status.HTTP_200_OK)
