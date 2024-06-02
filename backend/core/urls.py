"""
URL configuration for StockIt project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.shortcuts import render

def index_view(request, path):
    return render(request, 'dist/index.html')
def index_view_nopath(request):
    return render(request, 'dist/index.html')

# def index_view_dev(request):
#     return render(request, 'templates/base.html')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('comptoire/', include('Comptoire.urls')),
    path('api/', include('core.api.urls')),
    path('auth/',include('Auth.urls')),
    # for production
    # path('<path:path>', index_view),
    # path('', index_view_nopath),

    # For Development
    # path('', index_view_dev),
    path('', TemplateView.as_view(template_name="templates/base.html")),
    # Catch all routes
    path('<path:path>', TemplateView.as_view(template_name="base.html")),




]
