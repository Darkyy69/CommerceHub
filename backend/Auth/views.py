from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login, logout
from .models import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
import json

# @csrf_exempt
@require_POST
def login_view(request):
    if request.method == "GET":
        return render (request,'login.html')
    else:
        data = json.loads(request.body) #parse the json data
        username=data.get('username')
        password=data.get('password')
        if username is None or password is None:
            return JsonResponse({"detail": "invalid credentials"}, status=400)
        user=authenticate(username=username,password=password)
        if user is not None:
            login(request,user)
            return JsonResponse({'rights':request.user.profile.rights,'user_id':user.id})
        else :
            #invalid login render login page with error message 
            return JsonResponse({"detail":"invalids credentials"},status=400)

def signup(request):
    if request.method == "POST":
        username=request.POST.get('username')
        password=request.POST.get('password')
        rights=request.POST.get('rights')
        if User.objects.filter(username=username).exists():
            message="username already used"
            return JsonResponse({"detail":"credentials already used"},status=400)
        
        user=User.objects.create_user(username=username,password=password)
        Profile.objects.create(user=user,rights=rights)
        return JsonResponse({"details":"successfully created a profile"},status=201) #redirect to login page    
    else:
        #render the signup page 
        return render(request,'signup.html')
    
def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail":"You are not logged in!"}, status=400)
    logout(request)
    return JsonResponse({"detail":"Succesfully logged out!"})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})
    return JsonResponse({"isAuthenticated": True, 'username':request.user.username, 'rights':request.user.profile.rights,'user_id':request.user.id})

def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": False})
    return JsonResponse({"username":request.user.username})


