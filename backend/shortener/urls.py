from django.urls import path
from .views import ShortenURLView, RedirectView, AnalyticsView

urlpatterns = [
    path('api/shorten/', ShortenURLView.as_view(), name='shorten-url'),
    path('api/analytics/<str:short_code>/', AnalyticsView.as_view(), name='analytics'),
    path('<str:short_code>/', RedirectView.as_view(), name='redirect'),
]
