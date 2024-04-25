from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,default=1,related_name="profile")
    rights= models.CharField(max_length=200)
    
    def __str__(self):
        return f"{self.user.username} : {self.rights.split()}"

# Create your models here.
