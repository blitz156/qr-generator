from rest_framework.serializers import ModelSerializer
from apps.qr_links.models.qr_link import QRLink


class QRLinkSerializer(ModelSerializer):
    class Meta:
        model = QRLink
        fields = '__all__'
