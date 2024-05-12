# Generated by Django 5.0.3 on 2024-05-02 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Comptoire', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bonartin',
            old_name='propretaire',
            new_name='proprietaire',
        ),
        migrations.RenameField(
            model_name='bonartout',
            old_name='propretaire',
            new_name='proprietaire',
        ),
        migrations.RenameField(
            model_name='boncmd',
            old_name='propretaire',
            new_name='proprietaire',
        ),
        migrations.RenameField(
            model_name='bonlivraison',
            old_name='propretaire',
            new_name='proprietaire',
        ),
        migrations.RenameField(
            model_name='bonreception',
            old_name='propretaire',
            new_name='proprietaire',
        ),
        migrations.RenameField(
            model_name='bontransfer',
            old_name='propretaire',
            new_name='proprietaire',
        ),
        migrations.RenameField(
            model_name='bontranzition',
            old_name='propretaire',
            new_name='proprietaire',
        ),
        migrations.RenameField(
            model_name='facture',
            old_name='propretaire',
            new_name='proprietaire',
        ),
        migrations.RenameField(
            model_name='factureavoir',
            old_name='propretaire',
            new_name='proprietaire',
        ),
        migrations.RenameField(
            model_name='factureprofor',
            old_name='propretaire',
            new_name='proprietaire',
        ),
        migrations.AlterField(
            model_name='s_article',
            name='P_achat',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='s_article',
            name='P_min',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='s_article',
            name='P_vente',
            field=models.FloatField(),
        ),
    ]
