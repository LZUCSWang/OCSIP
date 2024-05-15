#### 本项目为django主体的基于EfficientNet V2模型的卵巢癌亚型识别平台

#### 项目环境

```
python = 3.10.4
```

```
pip install -r requirements.txt
```

#### 运行以下命令在本地启动项目

    python manage.py runserver

#### 在服务器启动项目（8000为服务器开放的端口，需要前往控制台设置)

    python manage.py runserver 0.0.0.0:8000

#### 如果有红字提示就先运行（数据库相关）

    python manage.py makemigrations

    python manage.py migrate

#### 登录后台admin界面

##### 创建超级用户

```
python manage.py createsuperuser
```

##### 登录后台

```
http://127.0.0.1:8000/admin
```

##### 相关仓库

[zpc-dragon/Python-lzu-task: 基于2023秋的Python课设 (github.com)](https://github.com/zpc-dragon/Python-lzu-task)
