import sqlite3
from django.urls import reverse
from django.contrib import messages
from django.shortcuts import render, redirect
import os
import json
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from home.forms import LoginForm
from django.contrib import auth
from PY import ftoken2account, upload_data, get_dataset, get_datasets, creat_dataset, delete_dataset, rename_dataset, delete_data
from PY import login as py_login
# Create your views here.
global_token = ''
global_dataset_id = ''


def usr(request, token):
    global global_token
    global_token = token
    return render(request, 'usr.html', {'token': token, 'username': ftoken2account(token), 'datasets': get_datasets(token)})


def home(request):
    global global_dataset_id
    global global_token
    if request.method == "POST":
        dataset_id = request.POST.get('dataset_id')
        global_dataset_id = dataset_id
        dataset_name = get_datasets(global_token)[dataset_id]['name']
        # print(dataset_name)
        return redirect(reverse('home'))
    else:
        print(global_token, global_dataset_id)
        dataset = json.dumps(get_dataset(global_token, global_dataset_id))
        print(dataset)
        return render(request, 'home.html', {'dataset': dataset})


def django_login(request):
    global global_token
    if request.method == "POST":
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            cd = login_form.cleaned_data
            global_token = py_login(cd['username'], cd['password'])
            if global_token == '':
                # return HttpResponse("用户名或密码错误")
                return render(request, 'login.html', {'error': 1})
            else:
                return redirect('usr', token=global_token)
        else:
            # return HttpResponse("输入不合法")
            return render(request, 'login.html', {'error': 2})
    else:
        return render(request, 'login.html', {'error': 0})


# 参考（django）01 django实现前端上传图片到后端保存_django保存图片-CSDN博客.pdf
def django_upload_data(request):
    # 由前端指定的name获取到图片数据
    global global_token
    global global_dataset_id
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
    upload_data(global_token, global_dataset_id, [(img_name, data)])
    # json2sqlite()
    # messages.SUCCESS(request,'success')
    return HttpResponseRedirect(reverse('home'))


def django_delete_data(request):
    global global_token
    if request.method == 'POST':
        data_id = request.POST.get('data_id')
        if delete_data(global_token, global_dataset_id, data_id):
            HttpResponse('success')
        else:
            HttpResponse('failue')
    pass


def django_create_dataset(request):

    if request.method == 'POST':
        # 获取提交的数据
        global global_token
        dataset_name = request.POST.get('create_dataset_name')
        # print(token, dataset_name)
        datasets = get_datasets(global_token)
        dup = 0
        for dataset_id, dataset_info in datasets.items():
            if dataset_info['name'] == dataset_name:
                dup = 1
        if dup == 0:
            # 在这里处理你的逻辑，比如保存数据到数据库等
            dataset_id = creat_dataset(global_token, dataset_name)
        # 返回一个简单的响应，你可以根据实际需求进行修改
        return render(request, 'usr.html', {'dup': dup, 'token': global_token, 'username': ftoken2account(global_token), 'datasets': get_datasets(global_token)})
    # 如果是 GET 请求，可以根据实际需求返回一个页面或其他响应
    return HttpResponse('Invalid request method')


def django_delete_dataset(request):
    if request.method == 'POST':
        global global_token
        account = ftoken2account(global_token)
        dataset_name = request.POST.get('delete_dataset_name')
        conn = sqlite3.connect('db.sqlite3')
        c = conn.cursor()
        c.execute("SELECT dataset_id FROM datasets WHERE dataset_name = ? AND account_id = (SELECT id FROM account WHERE username = ?)", (dataset_name, account,))
        try:
            dataset_id = c.fetchone()[0]
        except:
            # 删除不存在的数据集
            return render(request, 'usr.html', {'dup': 0, 'del': 1, 'token': global_token, 'username': ftoken2account(global_token), 'datasets': get_datasets(global_token)})
        conn.close()
        print(dataset_id)
        if delete_dataset(global_token, dataset_id):
            return render(request, 'usr.html', {'dup': 0, 'token': global_token, 'username': ftoken2account(global_token), 'datasets': get_datasets(global_token)})
        else:
            # HttpResponse('failue')
            # 删除失败
            return render(request, 'usr.html', {'dup': 0, 'del': 1, 'token': global_token, 'username': ftoken2account(global_token), 'datasets': get_datasets(global_token)})
    return HttpResponse('Invalid request method')


def django_rename_dataset(request):
    global global_token
    if request.method == 'POST':
        account = ftoken2account(global_token)
        previous_dataset_name = request.POST.get('previous_dataset_name')
        new_dataset_name = request.POST.get('new_dataset_name')
        conn = sqlite3.connect('db.sqlite3')
        c = conn.cursor()
        c.execute("SELECT dataset_id FROM datasets WHERE dataset_name = ? AND account_id = (SELECT id FROM account WHERE username = ?)",
                  (new_dataset_name, account,))
        if c.fetchone() != None:
            # 新重命名的数据集已存在
            return render(request, 'usr.html', {'dup': 0, 'ren': 2, 'token': global_token, 'username': ftoken2account(global_token), 'datasets': get_datasets(global_token)})
        c.execute("SELECT dataset_id FROM datasets WHERE dataset_name = ? AND account_id = (SELECT id FROM account WHERE username = ?)",
                  (previous_dataset_name, account,))
        try:
            dataset_id = c.fetchone()[0]
        except:
            # 原重命名的数据集不存在
            return render(request, 'usr.html', {'dup': 0, 'ren': 1, 'token': global_token, 'username': ftoken2account(global_token), 'datasets': get_datasets(global_token)})
        conn.close()
        if rename_dataset(global_token, dataset_id, new_dataset_name):
            return render(request, 'usr.html', {'dup': 0, 'ren': 0, 'token': global_token, 'username': ftoken2account(global_token), 'datasets': get_datasets(global_token)})
        else:
            # 重命名失败
            return render(request, 'usr.html', {'dup': 0, 'ren': 1, 'token': global_token, 'username': ftoken2account(global_token), 'datasets': get_datasets(global_token)})
    return HttpResponse('Invalid request method')


def django_research_dataset(request):
    if request.method == 'POST':
        global global_token
        global global_dataset_id
        dataset_name = request.POST.get('research_dataset_name')
        dataset = {}
        for key, value in get_datasets(global_token).items():
            if value['name'] == dataset_name:
                dataset[key] = value
                break
        # print(dataset_name)
        return render(request, 'usr.html', {'token': global_token, 'username': ftoken2account(global_token), 'datasets': dataset})
    return HttpResponse('Invalid request method')
