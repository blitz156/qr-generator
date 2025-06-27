from django.contrib import admin

from apps.qr_links.models.qr_link import QRLink


class QRLinkAdmin(admin.ModelAdmin):
    list_display = ("user", "link_description", "link_to_redirect", "image_html")


admin.site.register(QRLink, QRLinkAdmin)
