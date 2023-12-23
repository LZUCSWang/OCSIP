from django.db import models

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
