# Generated by Django 4.0.3 on 2022-03-21 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum_posts', '0003_alter_forumpost_rating_postrating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='forumpost',
            name='date_posted',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]