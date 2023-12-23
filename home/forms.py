from django import forms
# from .models import UploadedImage
# Create your models here.
from django.contrib.auth.models import User


class LoginForm(forms.Form):
    username = forms.CharField(min_length=3, max_length=10)  # 限制用户名长度为3-10个字符
    password = forms.CharField(
        min_length=8, widget=forms.PasswordInput)  # 限制密码长度最少为8个字符
