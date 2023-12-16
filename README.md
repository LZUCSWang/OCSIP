    本文件夹为django主体的基于EfficientNet V2模型的卵巢癌亚型识别平台

运行以下命令在本地启动项目

    `python manage.py runserver`

在服务器启动项目（8000为服务器开放的端口，需要前往控制台设置)

    `python manage.py runserver 0.0.0.0:8000`

如果有红字提示就先运行（数据库相关）

    `python manage.py makemigrations`

    `python manage.py migrate`

登录后台admin界面

    `python manage.py createsuperuser`创建超级用户

    `http://127.0.0.1:8000/admin`登录后台

    OCSIP目录下的home.html为前端的datashow.html，仅修改了资源调用路径，AI为推理工具，仅修改了PY包名
