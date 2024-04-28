from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator
import re
# Create your models here.

def validate_barcode(value):
    if not re.match(r'^\d{13}$', str(value)):
        raise ValidationError(
            _('%(value)s is not a valid 13-digit barcode'),
            params={'value': value},
        )    




class Famille(models.Model):
    codif = models.CharField(max_length=10)
    disignation = models.CharField(max_length=50)
    def __str__(self):
        return 'Famille: ' + str(self.disignation)
    
class S_famille(models.Model):
    id_famille = models.ForeignKey(Famille, on_delete=models.CASCADE)
    codif = models.CharField(max_length=10)
    disignation = models.CharField(max_length=50)
    def __str__(self):
        return 'S_famille: ' + str(self.disignation)
    
class Article(models.Model):
    codif = models.CharField(max_length=10)
    disignation = models.CharField(max_length=50)
    def __str__(self):
        return 'Article: ' + str(self.disignation)

class S_article (models.Model):
    id_S_famille = models.ForeignKey(S_famille, on_delete=models.CASCADE)
    id_Article = models.ForeignKey(Article, on_delete=models.CASCADE)
    codif = models.CharField(max_length=10, blank=False)
    disignation = models.CharField(max_length=50, blank=False)
    # P_achat = models.FloatField(blank=False, validators=[MinValueValidator(limit_value=0)])
    P_achat = models.FloatField(blank=False, default=0.0)
    P_vente = models.FloatField(blank=False)
    P_min = models.FloatField(blank=False, default=0.0)
    barrcode = models.CharField(max_length=13, validators=[validate_barcode], unique=True)
    fournisseur_best = models.IntegerField()

    def __str__(self):
        return 'S_article: ' + str(self.disignation) + ' - Barrcode: ' + str(self.barrcode)
    
