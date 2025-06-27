from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.qr_links.views import QRLinkRedirectAPIView

urlpatterns = [
    path("<str:link_hash>/", QRLinkRedirectAPIView.as_view()),
]
