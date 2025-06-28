from django.db import models
from .qr_link import QRLink

class QRLinkVisit(models.Model):
    qr_link = models.ForeignKey(QRLink, on_delete=models.CASCADE, related_name='visits')
    visited_at = models.DateTimeField(auto_now_add=True)
    user_agent = models.TextField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
