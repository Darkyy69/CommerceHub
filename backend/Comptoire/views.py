from django.shortcuts import render
from .models.models_Entite_marchandise import *
from .models.models_documents import *
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
import json

from io import BytesIO
from barcode import EAN13  # Choose appropriate barcode type
import barcode
from reportlab.graphics import renderPDF
from svglib.svglib import svg2rlg  # svglib for parsing SVG to reportlab graphics
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


from django.apps import apps
from Comptoire.models.models_ligneDocument import *
from Comptoire.models.models_documents import *

# Create your views here.

def comptoire_view(request):
    Articles = Article.objects.all()

    return render(request,'comptoire.html', {'Articles':Articles})


def trait_enregistrer(request, modeFen, doc):
    
    data = json.loads(request.body)
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
                    
                    var = BonArtOut.objects.create(data.num,data.date,data.propretaire,data.montant,data.type_payement,data.etat,data.imprime,data.editeur)
                    LigneBonArtOut.objects.create(var.id,data.id_art,)
                    #num == id
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




















# from win32 import win32print
import win32print

from barcode import Code128
from barcode.writer import ImageWriter

def print_barcode(text, printer_name):
    # Generate barcode image
    code128 = Code128(text, writer=ImageWriter())
    barcode_file = code128.save('barcode')

    # Get the default printer
    printer_info = win32print.GetDefaultPrinter()

    # Specify the printer to use
    printer_name = printer_info

    # Open the printer
    printer_handle = win32print.OpenPrinter(printer_name)

    # Start a new print job
    job_info = ('Python Print Job', None, printer_name)
    job_handle = win32print.StartDocPrinter(printer_handle, 1, job_info)

    # Start a new page
    win32print.StartPagePrinter(printer_handle)

    # Print the barcode image
    dc = win32print.GetDC(printer_name)
    dc.StartDoc('Python Print Job')
    dc.StartPage()
    dc.BitBlt((100, 100), (200, 200), barcode_file, (0, 0), win32print.SRCCOPY)
    dc.EndPage()
    dc.EndDoc()
    dc.DeleteDC()

    # End the print job
    win32print.EndPagePrinter(printer_handle)
    win32print.EndDocPrinter(printer_handle)
    win32print.ClosePrinter(printer_handle)


def win32print_test(request):
    # Usage example
    text_to_print = "123456789"
    printer_name = "None"  # Specify the printer name if not using the default printer
    print_barcode(text_to_print, printer_name)
    return render(request,'test_method.html', {})


from win32printing import Printer

def test(request):
    
    font = {
        "height": 12,
    }
    with Printer(linegap=1) as printer:
        printer.text("--------------- RECEIPT ---------------\n", align="center", font_config=font)
        printer.text("Date: March 11, 2024\n", font_config=font)
        printer.text("Time: 12:00 PM\n\n", font_config=font)
        printer.text("Items Purchased:\n", font_config=font)
        printer.text("1. Product A           $10.00\n", font_config=font)
        printer.text("2. Product B           $15.00\n", font_config=font)
        printer.text("3. Product C           $20.00\n\n", font_config=font)
        printer.text("Subtotal:                          $45\n", font_config=font)
        printer.text("Tax (7%):                          $3.15\n", font_config=font)
        printer.text("Total:                             $48.15\n\n", font_config=font)
        printer.text("Thank you for your purchase!\n", font_config=font)
        printer.text("Have a great day!\n", font_config=font)
        # printer.new_page()

    return render(request,'test_method.html', {})






from reportlab.lib.pagesizes import letter, landscape
from reportlab.pdfgen import canvas


def print_pdf(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="thermal_print.pdf"'

    # Create PDF document with letter page size (8.5 x 11 inches)
    c = canvas.Canvas(response, pagesize=letter)

    # Add content to the PDF
    text_lines = [
        "Line 1",
        "Line 2",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 3",
        "Line 33",
        "Line 3",
        "Line 3",
        "Line 3",
        
        # Add more lines as needed...
    ]
    y_position = 700  # Initial Y position for the first line

    for line in text_lines:
        c.drawString(100, y_position, line)
        y_position -= 20  # Adjust for next line
        if y_position < 50:
            break  # Limit to prevent overflow

    # Calculate dynamic page height based on content height
    content_height = 700 - y_position  # Calculate total content height
    page_height = content_height + 50  # Add extra margin for safety

    # Finish and save the PDF
    c.showPage()
    c.save()

    # Send PDF to printer
    # Add your code here to send the generated PDF to the printer
    # Example: os.system('lpr thermal_print.pdf')

    return response


# def print_pdf(request):
#     response = HttpResponse(content_type='application/pdf')
#     response['Content-Disposition'] = 'attachment; filename="thermal_print.pdf"'

#     # Define custom page size based on thermal paper roll width
#     page_width = 57  # Width in millimeters (adjust as needed)
#     page_height = 200  # Height in millimeters (adjust as needed)    

#     # Create PDF document
#     c = canvas.Canvas(response, pagesize=(page_width, page_height))

#     c.setFont("Helvetica", 10)
#     c.drawString(0, 200, "Hello, Thermal Printer!")
#     c.setFont("Helvetica", 6)
#     c.drawCentredString(0,0,"Im a centered string")
#     # Add more content as needed...

#     # Finish and save the PDF
#     c.showPage()
#     c.save()

#     # Send PDF to printer
#     # Add your code here to send the generated PDF to the printer
#     # Example: os.system('lpr thermal_print.pdf')

#     return response


def print_article(request, article_id):
    article = get_object_or_404(Article, pk=article_id)

    # Generate barcode
    barcode_value = article.barrcode
    if barcode_value:
        barcode_instance = EAN13(barcode_value)
        # Save barcode as SVG to a BytesIO object
        buffer = BytesIO()
        barcode_instance.write(buffer, options={'module_width': 0.2, 'module_height': 15, 'quiet_zone': 6})
        buffer.seek(0)

        # Parse SVG to reportlab graphics
        drawing = svg2rlg(buffer)

        # Convert reportlab graphics to PDF
        pdf_buffer = BytesIO()
        c = canvas.Canvas(pdf_buffer, pagesize=letter)

        # Draw barcode
        renderPDF.draw(drawing, c, 100, 700)

        # Add additional information
        c.drawString(100, 650, "Article Disignation: {}".format(article.disignation))
        c.drawString(100, 630, "Article ID: {}".format(article.id))
        # Add more information as needed

        # Save the PDF
        c.save()

        # Return PDF as HttpResponse
        response = HttpResponse(pdf_buffer.getvalue(), content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="barcode-article-'+str(article_id)+'.pdf"'
        return response
    else:
        return HttpResponse("Barcode value is not available for this article.")