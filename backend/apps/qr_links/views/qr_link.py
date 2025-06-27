from django.http import HttpResponseRedirect
from rest_framework.views import APIView

from apps.qr_links.services.qr_link import QRLinkService


class QRLinkRedirectAPIView(APIView):
    permission_classes = ()

    def get(self, request, link_hash: str, *args, **kwargs):
        link_to_redirect = QRLinkService().get_link_to_redirect_by_hash(link_hash)
        return HttpResponseRedirect(link_to_redirect)
