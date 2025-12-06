from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from docx import Document
from docx.shared import Pt, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
import io
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/generate-doc', methods=['POST'])
def generate_doc():
    try:
        data = request.json
        
        # Tworzenie dokumentu Word
        doc = Document()
        
        # Styl tytułu
        title = doc.add_heading('SPECYFIKACJA WARUNKÓW ZAMÓWIENIA (SWZ)', 0)
        title.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
        doc.add_paragraph()
        
        # 1. Dane zamawiającego
        if any([data.get('zamawiajacyNazwa'), data.get('zamawiajacyAdres'), 
                data.get('zamawiajacyTelefon'), data.get('zamawiajacyEmail'), 
                data.get('zamawiajacyWWW')]):
            doc.add_heading('1. Dane zamawiającego', level=1)
            if data.get('zamawiajacyNazwa'):
                doc.add_paragraph(f"Nazwa: {data['zamawiajacyNazwa']}")
            if data.get('zamawiajacyAdres'):
                doc.add_paragraph(f"Adres: {data['zamawiajacyAdres']}")
            if data.get('zamawiajacyTelefon'):
                doc.add_paragraph(f"Telefon: {data['zamawiajacyTelefon']}")
            if data.get('zamawiajacyEmail'):
                doc.add_paragraph(f"E-mail: {data['zamawiajacyEmail']}")
            if data.get('zamawiajacyWWW'):
                doc.add_paragraph(f"Strona internetowa: {data['zamawiajacyWWW']}")
        
        # 2. Adres strony WWW dla dokumentów
        if data.get('dokumentyWWW'):
            doc.add_heading('2. Adres strony WWW dla dokumentów', level=1)
            doc.add_paragraph(data['dokumentyWWW'])
        
        # 3. Tryb udzielenia zamówienia
        if data.get('trybZamowienia'):
            doc.add_heading('3. Tryb udzielenia zamówienia', level=1)
            doc.add_paragraph(data['trybZamowienia'])
        
        # 4. Informacja o negocjacjach
        if data.get('negocjacje'):
            doc.add_heading('4. Informacja o negocjacjach', level=1)
            doc.add_paragraph(data['negocjacje'])
        
        # 5. Opis przedmiotu zamówienia
        if data.get('opisPrzedmiotu'):
            doc.add_heading('5. Opis przedmiotu zamówienia (OPZ)', level=1)
            doc.add_paragraph(data['opisPrzedmiotu'])
        
        # 6. Termin wykonania zamówienia
        if data.get('terminWykonania'):
            doc.add_heading('6. Termin wykonania zamówienia', level=1)
            doc.add_paragraph(data['terminWykonania'])
        
        # 7. Projektowane postanowienia umowy
        if data.get('postanowieniaUmowy'):
            doc.add_heading('7. Projektowane postanowienia umowy', level=1)
            doc.add_paragraph(data['postanowieniaUmowy'])
        
        # 8. Informacje o komunikacji elektronicznej
        if data.get('komunikacjaElektroniczna'):
            doc.add_heading('8. Informacje o komunikacji elektronicznej', level=1)
            doc.add_paragraph(data['komunikacjaElektroniczna'])
        
        # 9. Komunikacja tradycyjna
        if data.get('komunikacjaTradycyjna'):
            doc.add_heading('9. Komunikacja tradycyjna', level=1)
            doc.add_paragraph(data['komunikacjaTradycyjna'])
        
        # 10. Osoby do kontaktu
        if data.get('osobyKontakt'):
            doc.add_heading('10. Osoby do kontaktu', level=1)
            doc.add_paragraph(data['osobyKontakt'])
        
        # 11. Termin związania ofertą
        if data.get('terminZwiazania'):
            doc.add_heading('11. Termin związania ofertą', level=1)
            doc.add_paragraph(data['terminZwiazania'])
        
        # 12. Opis sposobu przygotowania oferty
        if data.get('sposobPrzygotowania'):
            doc.add_heading('12. Opis sposobu przygotowania oferty', level=1)
            doc.add_paragraph(data['sposobPrzygotowania'])
        
        # 13. Sposób oraz termin składania ofert
        if data.get('terminSkladania'):
            doc.add_heading('13. Sposób oraz termin składania ofert', level=1)
            doc.add_paragraph(data['terminSkladania'])
        
        # 14. Termin otwarcia ofert
        if data.get('terminOtwarcia'):
            doc.add_heading('14. Termin otwarcia ofert', level=1)
            doc.add_paragraph(data['terminOtwarcia'])
        
        # 15. Podstawy wykluczenia
        if data.get('podstawyWykluczenia'):
            doc.add_heading('15. Podstawy wykluczenia', level=1)
            doc.add_paragraph(data['podstawyWykluczenia'])
        
        # 16. Sposób obliczenia ceny
        if data.get('sposobObliczeniaCeny'):
            doc.add_heading('16. Sposób obliczenia ceny', level=1)
            doc.add_paragraph(data['sposobObliczeniaCeny'])
        
        # 17. Opis kryteriów oceny ofert
        if data.get('kryteriaOceny'):
            doc.add_heading('17. Opis kryteriów oceny ofert', level=1)
            doc.add_paragraph(data['kryteriaOceny'])
        
        # 18. Formalności po wyborze
        if data.get('formalnosciPoWyborze'):
            doc.add_heading('18. Formalności po wyborze', level=1)
            doc.add_paragraph(data['formalnosciPoWyborze'])
        
        # 19. Pouczenie o środkach ochrony prawnej
        if data.get('pouczenieOchronaPrawna'):
            doc.add_heading('19. Pouczenie o środkach ochrony prawnej', level=1)
            doc.add_paragraph(data['pouczenieOchronaPrawna'])
        
        # Zapisz do bufora
        file_stream = io.BytesIO()
        doc.save(file_stream)
        file_stream.seek(0)
        
        return send_file(
            file_stream,
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            as_attachment=True,
            download_name='SWZ_Przetarg.docx'
        )
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
