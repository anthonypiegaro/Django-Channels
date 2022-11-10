from django.urls import path

from . import views

app_name = "chat"
urlpatterns = [
    path("", views.index, name="index"),
    path("lobby/", views.lobby, name="lobby"),
    path("<str:room_name>/", views.room, name="room"),
    path("user/logout/", views.logout_user, name="logout_user"),
]