from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.qr_links.models import QRLink
from apps.qr_links.serializers import QRLinkSerializer

class QRLinkViewSet(viewsets.ModelViewSet):
    serializer_class = QRLinkSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return QRLink.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        data = request.data
        data['user'] = request.user

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
