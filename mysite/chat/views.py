from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def index(request):
    return render(request, "chat/index.html")

@csrf_exempt
def lobby(request):
    if request.method == "POST":
        name = request.POST.get("name")
        user, created = User.objects.get_or_create(username=name)
        login(request, user)
        name = request.user.username
        return render(request, "chat/lobby.html", {"name": name})
    else:
        name = request.user.username
        return render(request, "chat/lobby.html", {"name": name})

def room(request, room_name):
    name = request.user.username
    return render(request, "chat/room.html", {"room_name": room_name, "name": name})

def logout_user(request):
    logout(request)
    return redirect("chat:index")
