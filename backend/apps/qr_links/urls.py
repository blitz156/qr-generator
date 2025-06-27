from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.qr_links.views import QRLinkRedirectAPIView, QRLinkViewSet

router = DefaultRouter()
router.register(r'qr-links', QRLinkViewSet, basename='qr-link')

urlpatterns = [
    path("<str:link_hash>/", QRLinkRedirectAPIView.as_view()),
    path('', include(router.urls)),
]
