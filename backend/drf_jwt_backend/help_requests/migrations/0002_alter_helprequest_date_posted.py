# Generated by Django 4.0.3 on 2022-03-23 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('help_requests', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='helprequest',
            name='date_posted',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]