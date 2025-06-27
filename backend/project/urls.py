from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token

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
                path("login/", obtain_auth_token),
            ]
        ),
    ),
    path("admin/", admin.site.urls),
]
