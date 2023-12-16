from django.db import models
# from PY import sqlite2json, clear_data
# models.py


# class student(models.Model):
#     SEX_CHOICES = ((1, '男'), (2, '女'), (3, '保密'))
#     name = models.CharField(max_length=20, verbose_name='姓名')
#     age = models.IntegerField(help_text='正数', verbose_name='年龄')
#     sex = models.IntegerField(
#         choices=SEX_CHOICES, verbose_name='性别', default=3)

#     class Meta:
#         verbose_name_plural = verbose_name = '学生'

#     def __str__(self) -> str:
#         return f'{self.name},{self.age},{self.sex}'


# class account(models.Model):
#     username = models.CharField(max_length=20, verbose_name='用户名')
#     token = models.CharField(max_length=50, verbose_name='token')
#     date_hierarchy = 'pub_date'

#     class Meta:
#         verbose_name_plural = verbose_name = '账户'

#     def __str__(self) -> str:
#         return f'{self.username}:{self.token}'


# class data(models.Model):
#     username = models.CharField(max_length=20, verbose_name='用户名')
#     password_md5 = models.CharField(max_length=50, verbose_name='密码(md5)')
#     dataset_id = models.CharField(max_length=50, verbose_name='数据集ID')
#     dataset_name = models.CharField(max_length=50, verbose_name='数据集名称')
#     dataset_created_time = models.DateTimeField(verbose_name='数据集创建时间')
#     dataset_updated_time = models.DateTimeField(verbose_name='数据集更新时间')
#     img_id = models.CharField(max_length=50, verbose_name='图片ID')
#     img_name = models.CharField(max_length=50, verbose_name='图片名称')
#     img_created_time = models.DateTimeField(verbose_name='图片创建时间')
#     img_class = models.CharField(max_length=50, verbose_name='图片类别')
#     img_show = models.ImageField(
#         upload_to='static/data/pictures', verbose_name='图片展示')
    # def save(self, force_insert=False, force_update=False, using=None,
    #          update_fields=None):
    #     # 执行 save(), 将数据保存进数据库
    #     super().save(
    #         force_insert=force_insert,
    #         force_update=force_update,
    #         using=using,
    #         update_fields=update_fields
    #     )
    #     clear_data(clearpic=False, clearsqlite=False)
    #     sqlite2json()
    # def delete(self, *args, **kwargs):
    #     # 执行我们希望在删除文章时进行的操作
    #     # Comment.objects.filter(article=self).delete()
    #     super().delete(*args, **kwargs)
    #     clear_data(clearpic=False, clearsqlite=False)
    #     sqlite2json()


class account(models.Model):
    username = models.CharField(max_length=200, verbose_name='用户名')
    password_md5 = models.CharField(max_length=200, verbose_name='密码(md5)')

    class Meta:
        db_table = 'account'
        verbose_name = '用户'
        verbose_name_plural = verbose_name

    def __str__(self) -> str:
        return f'{self.username}'


class datasets(models.Model):
    dataset_id = models.CharField(max_length=50, verbose_name='数据集ID')
    dataset_name = models.CharField(max_length=50, verbose_name='数据集名称')
    dataset_created_time = models.DateTimeField(verbose_name='数据集创建时间')
    dataset_updated_time = models.DateTimeField(verbose_name='数据集更新时间')
    account = models.ForeignKey(
        account, on_delete=models.CASCADE, verbose_name='用户')  # 一对多

    class Meta:
        db_table = 'datasets'
        verbose_name = '数据集'
        verbose_name_plural = verbose_name

    def __str__(self) -> str:
        return f'{self.dataset_name}'


class dataset(models.Model):
    data_id = models.CharField(max_length=50, verbose_name='图片ID')
    data_name = models.CharField(max_length=50, verbose_name='图片名称')
    data_created_time = models.DateTimeField(verbose_name='图片创建时间')
    data_class = models.CharField(max_length=50, verbose_name='图片类别')
    data_path = models.ImageField(
        upload_to='static/data/pictures', verbose_name='图片路径')
    dataset = models.ForeignKey(
        datasets, on_delete=models.CASCADE, verbose_name='数据集')  # 一对多
    account = models.ForeignKey(
        account, on_delete=models.CASCADE, verbose_name='用户')  # 一对多

    class Meta:
        db_table = 'dataset'
        verbose_name = '数据'
        verbose_name_plural = verbose_name

    def __str__(self) -> str:
        return f'{self.data_name}'
