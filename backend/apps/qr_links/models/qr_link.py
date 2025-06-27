import uuid
from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model


class QRLink(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    link_to_redirect = models.URLField()
    link_description = models.CharField(max_length=255)
    link_hash = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def image_html(self):
        from apps.qr_links.services.qr_link import QRLinkService
        return QRLinkService().generate_qr_image_html_tag(self.link_hash)
