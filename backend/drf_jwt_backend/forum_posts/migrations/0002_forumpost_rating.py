# Generated by Django 4.0.3 on 2022-03-20 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum_posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='forumpost',
            name='rating',
            field=models.IntegerField(default=3),
            preserve_default=False,
        ),
    ]