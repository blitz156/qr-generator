from django.http import HttpResponseRedirect
from rest_framework.views import APIView

from apps.qr_links.services.qr_link import QRLinkService


class QRLinkRedirectAPIView(APIView):
    permission_classes = ()

    def get(self, request, link_hash: str, *args, **kwargs):
        user_agent = request.META.get("HTTP_USER_AGENT")
        ip_address = request.META.get("REMOTE_ADDR")
        link_to_redirect = QRLinkService().get_link_to_redirect_by_hash(
            link_hash, user_agent=user_agent, ip_address=ip_address
        )
        return HttpResponseRedirect(link_to_redirect)
