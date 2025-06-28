from django.contrib import admin

from apps.qr_links.models import QRLink, QRLinkVisit


class QRLinkAdmin(admin.ModelAdmin):
    list_display = ("user", "link_description", "link_to_redirect", "image_html")


class QRLinkVisitAdmin(admin.ModelAdmin):
    list_display = ("qr_link__id", "visited_at", "user_agent", "ip_address")


admin.site.register(QRLink, QRLinkAdmin)
admin.site.register(QRLinkVisit, QRLinkVisitAdmin)
