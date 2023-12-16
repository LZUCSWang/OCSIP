"""OCSIP URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.urls import path
from home.views import home, django_upload_data, django_login, usr, django_creat_dataset, django_delete_data, django_rename_dataset, django_delete_dataset
urlpatterns = [
    path("admin/", admin.site.urls),
    path("usr/<str:token>", usr, name="usr"),
    path("home/", home, name="home"),
    path("", django_login, name="login"),
    path('upload_data/', django_upload_data, name='add'),
    path('creat_dataset/', django_creat_dataset,
         name='creat_dataset'),
    path('delete_data/', django_delete_data, name='delete_data'),
    path('rename_dataset/', django_rename_dataset, name='rename_dataset'),
    path('delete_dataset/', django_delete_dataset, name='delete_dataset'),
    # path(r'^media/(?P<path>.*)', serve, {"document_root":settings.MEDIA_ROOT}),
]
