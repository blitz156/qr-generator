from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.qr_links.models import QRLink
from apps.qr_links.serializers import QRLinkCreateUpdateSerializer, QRLinkGetSerializer


class QRLinkViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    lookup_field = 'link_hash'

    def get_serializer_class(self):
        if self.action == "create":
            return QRLinkCreateUpdateSerializer
        else:
            return QRLinkGetSerializer

    def get_queryset(self):
        return QRLink.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        data = request.data
        data["user"] = request.user.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
