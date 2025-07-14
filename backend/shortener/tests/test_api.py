import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from shortener.models import ShortURL

@pytest.mark.django_db
def test_shorten_creates_unique_code():
    client = APIClient()

    url = "https://example.com/test-url"
    response = client.post(reverse("shorten-url"), {"original_url": url}, format="json")

    assert response.status_code == 201

    data = response.json()
    assert "short_url" in data
    assert ShortURL.objects.filter(original_url=url).exists()
