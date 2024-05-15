#### 前台

##### 三个页面

![image-20231223163045561](https://github.com/LZUCSWang/OCSIP/blob/main/pic/login.jpg)

![user](https://github.com/LZUCSWang/OCSIP/blob/main/pic/user.jpg)

![image-20231224115315297](https://github.com/LZUCSWang/OCSIP/blob/main/pic/dataset_main_.png)

##### 登录页面

​		在启动项目后直接进入本地地址或服务器IP，例如本例中使用默认的本地地址和默认端口号，`127.0.0.1:8000`，即可进入**登录页面**

![login_none](https://github.com/LZUCSWang/OCSIP/blob/main/pic/login_none.jpg)

- 如果用户为新用户则会直接创建新用户，并进入**用户管理页面**

- 如果密码错误则会红字提示**用户名或密码错误**

  ![login_passworderror](https://github.com/LZUCSWang/OCSIP/blob/main/pic/login_passworderror.jpg)

- 如果账号密码不符合要求设置要求则会提示**用户名或密码不符合要求**

  ![login_a](https://github.com/LZUCSWang/OCSIP/blob/main/pic/login_a.jpg)

##### 用户管理页面

​		该页面会显示用户的个人信息，包括用户的**token**，**用户名**，以及该用户下的各**数据集**及信息，并实现对当前用户下的各数据集实现增删查改的功能。

![user](https://github.com/LZUCSWang/OCSIP/blob/main/pic/user.jpg)

- 创建数据集可根据名称创建数据集，如果已经存在则会提示

  ![user_test1](https://github.com/LZUCSWang/OCSIP/blob/main/pic/user_test1.jpg)

  ![user_test2](https://github.com/LZUCSWang/OCSIP/blob/main/pic/user_test2.jpg)

  ![user_create_exsit](https://github.com/LZUCSWang/OCSIP/blob/main/pic/user_create_exsit.jpg)

- 删除数据集可根据数据集名称删除数据集，如果删除不存在的数据集则会提示

  ![user_delete_test1](https://github.com/LZUCSWang/OCSIP/blob/main/pic/user_delete_test1.jpg)

  ![image-20231223165236912](https://github.com/LZUCSWang/OCSIP/blob/main/pic/user_dataset_notfound.png)

- 重命名数据集可根据输入的数据集名称检索并重命名为新的数据集名称，如果要被重命名的数据集名称不存在或要重命名的数据集新名称已存在均会提示

  ![user_rename_test2_test1](https://github.com/LZUCSWang/OCSIP/blob/main/pic/user_rename_test2_test1.jpg)

  ![user_rename_exsit](https://github.com/LZUCSWang/OCSIP/blob/main/pic/user_rename_exsit.jpg)

  ![user_rename_notfound](https://github.com/LZUCSWang/OCSIP/blob/main/pic/user_rename_notfound.jpg)

- 查找数据集能够检索出对应数据集名称的数据集，如果检索不到则会提示

  ![user_search](https://github.com/LZUCSWang/OCSIP/blob/main/pic/user_search.jpg)

  ![user_search_notfound](https://github.com/LZUCSWang/OCSIP/blob/main/pic/user_search_notfound.jpg)

##### 数据集详情页面

​		数据详情页面主要包含分为AI推理和数据管理两个功能

![dataset](https://github.com/LZUCSWang/OCSIP/blob/main/pic/dataset_main.png)

##### AI推理

- 点击**导入**可以打开文件选择框选择要进行AI推理的图像文件，并会显示加载动画

  ![image-20231224115414329](https://github.com/LZUCSWang/OCSIP/blob/main/pic/dataset_import.png)

  ![image-20231224115445487](https://github.com/LZUCSWang/OCSIP/blob/main/pic/dataset_import_loading.png)

- 在后端进行AI推理并将该图片识别成某一类（本次识别成**LGSC**类）

  ![image-20231224115558482](https://github.com/LZUCSWang/OCSIP/blob/main/pic/dataset_import_show.png)

##### 数据管理

- 点击上方各个标签可以切换到对应标签下的所有图像，并且标签栏的切换会伴随切换动画

  ![image-20231224115648634](https://github.com/LZUCSWang/OCSIP/blob/main/pic/dataset_switch.png)

- 点击任一图像会在左侧显示该图像对应详细信息

  ![image-20231224115731290](https://github.com/LZUCSWang/OCSIP/blob/main/pic/dataset_img_info.png)

- 点击各图像上方的复选框可以勾选图像，并可进一步删除对应图像

  ![image-20231224115755466](https://github.com/LZUCSWang/OCSIP/blob/main/pic/dataset_checkbox.png)

- 全选本页可以实现批量删除

  ![image-20231224115839042](https://github.com/LZUCSWang/OCSIP/blob/main/pic/dataset_delete_all.png)

- 其他细节

  - 将鼠标悬浮在左侧标签栏会悬浮显示标签中文信息

    ![image-20231224115934168](https://github.com/LZUCSWang/OCSIP/blob/main/pic/dataset_label_zh.png)
    
  - 鼠标悬浮在图像上会悬浮显示图像信息
  
    ![image-20231224120056988](https://github.com/LZUCSWang/OCSIP/blob/main/pic/dataset_label_info.png)

#### 后台

##### 主页面

​		后台页面使用了django自带的框架，使用创建的管理账户登录后可在这个页面中可以对用户数据内的数据进行增删查改。

![admin_login](https://github.com/LZUCSWang/OCSIP/blob/main/pic/admin_login.jpg)

![admin](https://github.com/LZUCSWang/OCSIP/blob/main/pic/admin.jpg)

##### 用户

- 该页面可以管理登录页面中所有的用户信息

  ![admin_account_show](https://github.com/LZUCSWang/OCSIP/blob/main/pic/admin_account_show.jpg)

- 可添加和修改用户

  ![admin_account_add](https://github.com/LZUCSWang/OCSIP/blob/main/pic/admin_account_add.jpg)

  ![admin_account_modify](https://github.com/LZUCSWang/OCSIP/blob/main/pic/admin_account_modify.jpg)

##### 数据集

- 该页面可以同时管理所有用户的数据集，每个项目除了包含数据集本身的信息外还关联了该数据集归属的用户，并添加一个过滤器可过滤某用户下的所有数据集

  ![admin_datasets_show](https://github.com/LZUCSWang/OCSIP/blob/main/pic/admin_datasets_show.jpg)

- 可添加和删除数据集

  ![admin_datasets_add](https://github.com/LZUCSWang/OCSIP/blob/main/pic/admin_datasets_add.jpg)

  ![admin_dataset_modify](https://github.com/LZUCSWang/OCSIP/blob/main/pic/admin_dataset_modify.jpg)

##### 数据

- 该页面可以管理所有上传的图像数据，每个项目除了包含数据本身的信息外还关联了数据归属的数据集以及其用户，并可以通过数据集，用户和类别进行过滤

  ![admin_dataset_show](https://github.com/LZUCSWang/OCSIP/blob/main/pic/admin_dataset_show.jpg)

- 可手动添加数据或修改原有数据

  ![admin_dataset_add](https://github.com/LZUCSWang/OCSIP/blob/main/pic/admin_dataset_add.jpg)

  ![admin_dataset_modify](https://github.com/LZUCSWang/OCSIP/blob/main/pic/admin_dataset_modify.jpg)