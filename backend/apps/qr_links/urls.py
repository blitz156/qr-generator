from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.qr_links.views import QRLinkViewSet

router = DefaultRouter()
router.register(r"", QRLinkViewSet, basename="qr-link")

urlpatterns = [
    path("", include(router.urls)),
]
