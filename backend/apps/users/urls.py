from django.urls import path
from apps.users.views import UserInfoView
from apps.users.views.language import LanguageUpdateView

urlpatterns = [
    path("info/", UserInfoView.as_view(), name="user-info"),
    path("language/", LanguageUpdateView.as_view(), name="user-language-update"),
]
