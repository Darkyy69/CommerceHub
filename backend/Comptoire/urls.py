from django.urls import path, include
from .views import comptoire_view, trait_enregistrer, verifierDocument, getClientFactures


urlpatterns = [
    path('', comptoire_view, name='comptoire'),

    path('verifier-document/', verifierDocument, name='verifierDocument'),
    path('get-client-factures/<int:propreot>/', getClientFactures, name='getClientFactures'),
    path('enregistrer/<str:modeFen>/<str:doc>/', trait_enregistrer, name='trait_enregistrer'),
]