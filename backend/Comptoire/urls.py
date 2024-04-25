from django.urls import path, include
from .views import comptoire_view, print_article, trait_enregistrer, test, verifierDocument, getClientFactures, print_pdf, win32print_test


urlpatterns = [
    path('', comptoire_view, name='comptoire'),
    path('article/<int:article_id>/', print_article, name='print_article'),
    
    path('test/', test, name='test'),
    path('print_pdf/', print_pdf, name='print_pdf'),
    path('win32print_test/', win32print_test, name='win32print_test'),

    path('verifier-document/', verifierDocument, name='verifierDocument'),
    path('get-client-factures/<int:propreot>/', getClientFactures, name='getClientFactures'),
    path('enregistrer/<int:modeFen>/<int:doc>', trait_enregistrer, name='trait_enregistrer'),
]