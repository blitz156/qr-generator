from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path(
        "api/",
        include(
            [
                path("qr/", include("apps.qr_links.urls")),
            ]
        ),
    ),
    path(
        "public-api/",
        include(
            [
                path("qr/", include("apps.qr_links.public_urls")),
                path("users/", include("apps.users.public_urls")),
            ]
        ),
    ),
    path("admin/", admin.site.urls),
]
