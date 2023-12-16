from django.urls import reverse
from django.contrib import messages
from django.shortcuts import render, redirect
import os
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from home.forms import LoginForm
from django.contrib import auth
from PY import ftoken2account, upload_data, get_dataset, get_datasets, creat_dataset, delete_dataset, rename_dataset, delete_data
from PY import login as py_login
# Create your views here.
token = ''
dataset_id = ''


def usr(request, token):
    return render(request, 'usr.html', {'token': token, 'username': ftoken2account(token), 'datasets': get_datasets(token)})


def django_creat_dataset(request):
    if request.method == 'POST':
        # 获取提交的数据
        global token
        dataset_name = request.POST.get('dataset_name')
        print(token, dataset_name)
        dataset_id = creat_dataset(token, dataset_name)
        # 在这里处理你的逻辑，比如保存数据到数据库等

        # 返回一个简单的响应，你可以根据实际需求进行修改
        # return HttpResponse(f'Token: {token}, Dataset Name: {dataset_name}, dataset_id: {dataset_id},Creat Dataset Success!')
        return render(request, 'usr.html', {'token': token, 'username': ftoken2account(token), 'datasets': get_datasets(token)})
    # 如果是 GET 请求，可以根据实际需求返回一个页面或其他响应
    return HttpResponse('Invalid request method')


def home(request):
    global dataset_id
    if request.method == "POST":
        dataset_id = request.POST.get('dataset_id')
        dataset_name = get_datasets(token)[dataset_id]['name']
        # print(dataset_name)
        return redirect(reverse('home'))
    else:
        return render(request, 'home.html', {'dataset': get_dataset(token, dataset_id)})


def django_login(request):
    global token
    if request.method == "POST":
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            cd = login_form.cleaned_data
            token = py_login(cd['username'], cd['password'])
            return redirect('usr', token=token)
        else:
            return HttpResponse("输入不合法")
    else:
        return render(request, 'login.html')


# 参考（django）01 django实现前端上传图片到后端保存_django保存图片-CSDN博客.pdf
def django_upload_data(request):
    # 由前端指定的name获取到图片数据
    global token
    global dataset_id
    img = request.FILES.get('img')
    # 获取图片的全文件名
    img_name = img.name
    # 截取文件后缀和文件名
    mobile = os.path.splitext(img_name)[0]
    ext = os.path.splitext(img_name)[1]
    # 重定义文件名
    img_name = f'{mobile}{ext}'
    # print(img_name)
    upload_dir = os.path.join(os.getcwd(), 'usr_upload')
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    img_path = os.path.join(upload_dir, img_name)
    if not os.path.exists(img_path):
        # return HttpResponse('File already exists')
        # 写入文件
        with open(img_path, 'ab') as fp:
            # 如果上传的图片非常大，就通过chunks()方法分割成多个片段来上传
            for chunk in img.chunks():
                fp.write(chunk)
        # fp.write(img.read())
    # 上传到AI库里
    with open(img_path, "rb") as f:
        data = f.read()
    upload_data(token, dataset_id, [(img_name, data)])
    # json2sqlite()
    # messages.SUCCESS(request,'success')
    return HttpResponseRedirect(reverse('home'))


def django_delete_dataset(request):
    if request == 'post':
        global token
        dataset_id = request.POST.get('dataset_id')
        if delete_dataset(token, dataset_id):
            HttpResponse('success')
        else:
            HttpResponse('failue')
    pass


def django_rename_dataset(request):
    global token
    if request.method == 'POST':
        dataset_id = request.POST.get('dataset_id')
        new_name = request.POST.get('new_name')
        if rename_dataset(token, dataset_id, new_name):
            HttpResponse('success')
        else:
            HttpResponse('failue')
    pass


def django_delete_data(request):
    global token
    if request.method == 'POST':
        dataset_id = request.POST.get('dataset_id')
        data_id = request.POST.get('data_id')
        if delete_data(token, dataset_id, data_id):
            HttpResponse('success')
        else:
            HttpResponse('failue')
    pass
