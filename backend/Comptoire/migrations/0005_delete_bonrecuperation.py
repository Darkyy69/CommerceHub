# Generated by Django 5.0.3 on 2024-03-24 11:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Comptoire', '0004_bonrecuperation_bontransfer_bontranzition'),
    ]

    operations = [
        migrations.DeleteModel(
            name='BonRecuperation',
        ),
    ]