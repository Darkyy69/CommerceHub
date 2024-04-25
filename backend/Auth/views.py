from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login
from .models import *
from django.http import JsonResponse

def login_view(request):
    if request.method == "GET":
        return render (request,'login.html')
    else:
        username=request.POST.get('username')
        password=request.POST.get('password')
        user=authenticate(request,username=username,password=password)
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

# Create your views here.
