# import_data.py
import pandas as pd
import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()
from Comptoire.models.models_Entite_marchandise import S_article

def import_data(file_path):
    df = pd.read_excel(file_path)

    for index, row in df.iterrows():
        S_article.objects.create(
            barrcode=row['cb'],
            codif=row['article'][:10],
            disignation=row['article'],
            P_vente=row['PrixVente'],
            P_min="0.0",
            P_achat="0.0",
            fournisseur_best="1",
            id_Article_id="2",
            id_S_famille_id="2"
        )

if __name__ == "__main__":
    file_path = "Table Article.xls"
    import_data(file_path)
