from django.shortcuts import render
from .models.models_Entite_marchandise import *
from .models.models_documents import *
from django.shortcuts import get_object_or_404
import json
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


from io import BytesIO
from barcode import EAN13  # Choose appropriate barcode type
import barcode


from django.apps import apps
from Comptoire.models.models_ligneDocument import *
from Comptoire.models.models_documents import *
from Comptoire.models.models_info_extra import EtatsClient, Etatoperations, LiseEtatSortie, TypePayement


# Create your views here.

def comptoire_view(request):
    Articles = Article.objects.all()

    return render(request,'comptoire.html', {'Articles':Articles})

@csrf_exempt
@require_POST
def trait_enregistrer(request, modeFen, doc):
    data = json.loads(request.body)
    document_obj = data['document']
    ligneDoc_obj = data['ligneDocument']
    match modeFen:
        case 'vente': # Vente
            match doc:
                case 'fact-pro': # FactureProformat
                    pass
                case 'fact': # Facture
                    pass
                case 'fact-av': # FactureAvoir
                    pass  
                case 'bon-art-out': # BonArtOut
                    doc_typePayement = TypePayement.objects.get(pk=document_obj['type_payement']) # getting the instance of the model
                    doc_etat = Etatoperations.objects.get(pk=document_obj['etat']) # getting the instance of the model
                    doc_imprime = LiseEtatSortie.objects.get(pk=document_obj['imprime']) # getting the instance of the model
                    user = User.objects.get(pk=document_obj['editeur']) # Remove when user Auth is implemented and add request.user instead

                    var = BonArtOut.objects.create(num=document_obj['num'], date=document_obj['date'], proprietaire=document_obj['proprietaire'], montant=document_obj['montant'], type_payement=doc_typePayement, etat=doc_etat, imprime=doc_imprime, editeur=user)
                    var.num = str(var.pk) + var.num # After Creation of the object, set the num to the id of the object + the num
                    var.save()
                    for ligneDoc in ligneDoc_obj: # Each Doc has multiple LigneDoc                  
                        LigneBonArtOut.objects.create(id_doc=var.id, id_art=ligneDoc['id_art'], qte=ligneDoc['qte'], prix=ligneDoc['prix'], montant=ligneDoc['montant'])
                case 'bon-liv': # BonLivraison
                    pass    



        case 'achat': # Achat
            match doc:
                case 'bon-cmd': # BonCMD
                    pass
                case 'bon-art-in': # BonArtIn
                    pass
                case 'bon-recep': # BonReception   
                    pass         


        case 'etablissement': # Etablissement
            match doc:
                case 'bon-trans': # BonTransfert
                    pass
                case 'bon-reception': # BonReception
                    pass
                case 'bon-tran': # BonTranzition   
                    pass        

    return JsonResponse({'details': 'Data received'}, status=200)

                                      


# Fonction pour retourner les factures du client
                
def getClientFactures(request, id_propreot):
    Factures_propreot = Facture.objects.filter(propretaire = id_propreot)      
    print(Factures_propreot)
    T_mont = 0.0
    T_ligne_mont = 0.0
    for fact_propreot in  Factures_propreot:
        T_mont += fact_propreot.montant
        ligneFactures = LigneFacture.objects.filter(id_doc = fact_propreot.id)
        for ligne_fact in ligneFactures:
            T_ligne_mont += ligne_fact.montant

    total = {T_mont,T_ligne_mont}
    return total

# Fonction pour verifier ...

def verifierDocument(request, doc, doc_id):
    modelName = "Ligne" + doc
    
    doc_name = doc
    doc_class = apps.get_model('Comptoire', doc_name)        
    document = doc_class.objects.get(pk=doc_id)

    # Get the model class dynamically
    model_class = apps.get_model('Comptoire', modelName)        
    ligneDocuments = model_class.objects.filter(id_doc=doc_id)
    total = 0.0

    for ligneDoc in ligneDocuments:
        total += float(ligneDoc.montant) 

    if total == document.montant:
        return True
    
    # Traitement si le montant != total
    #
    #
    return False


def calculCreance():
    pass

