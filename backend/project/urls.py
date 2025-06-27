from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path(
        "api/",
        include([]),
    ),
    path(
        "public-api/",
        include(
            [
                path("qr/", include("apps.qr_links.urls")),
            ]
        ),
    ),
    path("admin/", admin.site.urls),
]
