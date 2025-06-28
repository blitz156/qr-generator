import base64

import qrcode
from io import BytesIO

from django.conf import settings
from django.utils.safestring import mark_safe

from apps.qr_links.models.qr_link import QRLink
from apps.qr_links.models.qr_link_visit import QRLinkVisit


class QRLinkService:
    def generate_qr_image(self, text: str) -> BytesIO:
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(text)
        qr.make(fit=True)

        img = qr.make_image(fill="black", back_color="white")

        image_data = BytesIO()
        img.save(image_data, format="PNG")

        return image_data

    def generate_qr_image_base64(self, text: str) -> str:
        image_data = self.generate_qr_image(text)
        image_data_base64 = base64.b64encode(image_data.getvalue()).decode("utf-8")

        return image_data_base64

    def generate_qr_image_html_tag(self, link: str) -> str:
        qr_image_base64 = self.generate_qr_image_base64(link)

        return mark_safe(
            f'<img src="data:image/png;base64,{qr_image_base64}" alt="QR Code" />'
        )

    def get_link_to_redirect_by_hash(
        self, link_hash: str, user_agent: str = None, ip_address: str = None
    ):
        link_obj = QRLink.objects.get(link_hash=link_hash)
        QRLinkVisit.objects.create(
            qr_link=link_obj, user_agent=user_agent or "", ip_address=ip_address
        )
        return link_obj.link_to_redirect
