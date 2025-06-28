from rest_framework.serializers import ModelSerializer
from apps.qr_links.models.qr_link import QRLink


class QRLinkCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = QRLink
        fields = ["user", "link_to_redirect", "link_description"]


class QRLinkGetSerializer(ModelSerializer):
    class Meta:
        model = QRLink
        fields = [
            "link_to_redirect",
            "link_description",
            "qr_link",
            "image_html",
            "created_at",
            "link_hash",
            "visit_count",
        ]
