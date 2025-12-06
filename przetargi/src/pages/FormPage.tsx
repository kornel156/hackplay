import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileDown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  // 1. Dane zamawiającego
  zamawiajacyNazwa: string;
  zamawiajacyAdres: string;
  zamawiajacyTelefon: string;
  zamawiajacyEmail: string;
  zamawiajacyWWW: string;

  // 2. Adres strony WWW dla dokumentów
  dokumentyWWW: string;

  // 3. Tryb udzielenia zamówienia
  trybZamowienia: string;

  // 4. Informacja o negocjacjach
  negocjacje: string;

  // 5. Opis przedmiotu zamówienia
  opisPrzedmiotu: string;

  // 6. Termin wykonania zamówienia
  terminWykonania: string;

  // 7. Projektowane postanowienia umowy
  postanowieniaUmowy: string;

  // 8. Informacje o komunikacji elektronicznej
  komunikacjaElektroniczna: string;

  // 9. Komunikacja tradycyjna
  komunikacjaTradycyjna: string;

  // 10. Osoby do kontaktu
  osobyKontakt: string;

  // 11. Termin związania ofertą
  terminZwiazania: string;

  // 12. Opis sposobu przygotowania oferty
  sposobPrzygotowania: string;

  // 13. Sposób oraz termin składania ofert
  terminSkladania: string;

  // 14. Termin otwarcia ofert
  terminOtwarcia: string;

  // 15. Podstawy wykluczenia
  podstawyWykluczenia: string;

  // 16. Sposób obliczenia ceny
  sposobObliczeniaCeny: string;

  // 17. Opis kryteriów oceny ofert
  kryteriaOceny: string;

  // 18. Formalności po wyborze
  formalnosciPoWyborze: string;

  // 19. Pouczenie o środkach ochrony prawnej
  pouczenieOchronaPrawna: string;
}

const initialFormData: FormData = {
  zamawiajacyNazwa: '',
  zamawiajacyAdres: '',
  zamawiajacyTelefon: '',
  zamawiajacyEmail: '',
  zamawiajacyWWW: '',
  dokumentyWWW: '',
  trybZamowienia: '',
  negocjacje: '',
  opisPrzedmiotu: '',
  terminWykonania: '',
  postanowieniaUmowy: '',
  komunikacjaElektroniczna: '',
  komunikacjaTradycyjna: '',
  osobyKontakt: '',
  terminZwiazania: '',
  sposobPrzygotowania: '',
  terminSkladania: '',
  terminOtwarcia: '',
  podstawyWykluczenia: '',
  sposobObliczeniaCeny: '',
  kryteriaOceny: '',
  formalnosciPoWyborze: '',
  pouczenieOchronaPrawna: '',
};

const FormPage = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateDoc = async () => {
    if (!hasAnyData) {
      toast({
        title: "Błąd",
        description: "Wypełnij przynajmniej jedno pole formularza",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-doc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Błąd generowania dokumentu');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SWZ_Przetarg.docx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Sukces",
        description: "Dokument został wygenerowany i pobrany",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się wygenerować dokumentu. Upewnij się, że serwer backend jest uruchomiony.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const hasAnyData = Object.values(formData).some(value => value.trim() !== '');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Formularz Specyfikacji Warunków Zamówienia (SWZ)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FORMULARZ */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wypełnij dane przetargu</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
                  
                  {/* 1. Dane zamawiającego */}
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left font-semibold">
                      1. Dane zamawiającego
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="zamawiajacyNazwa">Nazwa</Label>
                        <Input
                          id="zamawiajacyNazwa"
                          name="zamawiajacyNazwa"
                          value={formData.zamawiajacyNazwa}
                          onChange={handleChange}
                          placeholder="Nazwa zamawiającego"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zamawiajacyAdres">Adres</Label>
                        <Input
                          id="zamawiajacyAdres"
                          name="zamawiajacyAdres"
                          value={formData.zamawiajacyAdres}
                          onChange={handleChange}
                          placeholder="Adres zamawiającego"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zamawiajacyTelefon">Numer telefonu</Label>
                        <Input
                          id="zamawiajacyTelefon"
                          name="zamawiajacyTelefon"
                          value={formData.zamawiajacyTelefon}
                          onChange={handleChange}
                          placeholder="+48 ..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="zamawiajacyEmail">E-mail</Label>
                        <Input
                          id="zamawiajacyEmail"
                          name="zamawiajacyEmail"
                          type="email"
                          value={formData.zamawiajacyEmail}
                          onChange={handleChange}
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zamawiajacyWWW">Strona internetowa postępowania</Label>
                        <Input
                          id="zamawiajacyWWW"
                          name="zamawiajacyWWW"
                          value={formData.zamawiajacyWWW}
                          onChange={handleChange}
                          placeholder="https://..."
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 2. Adres strony WWW dla dokumentów */}
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left font-semibold">
                      2. Adres strony WWW dla dokumentów
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="dokumentyWWW">Strona z dokumentami SWZ</Label>
                        <Textarea
                          id="dokumentyWWW"
                          name="dokumentyWWW"
                          value={formData.dokumentyWWW}
                          onChange={handleChange}
                          placeholder="Adres strony, na której będą publikowane zmiany i wyjaśnienia treści SWZ"
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 3. Tryb udzielenia zamówienia */}
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left font-semibold">
                      3. Tryb udzielenia zamówienia
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="trybZamowienia">Tryb</Label>
                        <Input
                          id="trybZamowienia"
                          name="trybZamowienia"
                          value={formData.trybZamowienia}
                          onChange={handleChange}
                          placeholder="np. Tryb podstawowy bez negocjacji"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 4. Informacja o negocjacjach */}
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left font-semibold">
                      4. Informacja o negocjacjach
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="negocjacje">Możliwość negocjacji</Label>
                        <Textarea
                          id="negocjacje"
                          name="negocjacje"
                          value={formData.negocjacje}
                          onChange={handleChange}
                          placeholder="Czy zamawiający przewiduje wybór najkorzystniejszej oferty z możliwością prowadzenia negocjacji?"
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 5. Opis przedmiotu zamówienia */}
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left font-semibold">
                      5. Opis przedmiotu zamówienia (OPZ)
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="opisPrzedmiotu">Szczegółowy opis</Label>
                        <Textarea
                          id="opisPrzedmiotu"
                          name="opisPrzedmiotu"
                          value={formData.opisPrzedmiotu}
                          onChange={handleChange}
                          placeholder="Szczegółowe określenie przedmiotu zamówienia"
                          rows={5}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 6. Termin wykonania zamówienia */}
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-left font-semibold">
                      6. Termin wykonania zamówienia
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="terminWykonania">Termin</Label>
                        <Input
                          id="terminWykonania"
                          name="terminWykonania"
                          value={formData.terminWykonania}
                          onChange={handleChange}
                          placeholder="np. 30 dni od podpisania umowy"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 7. Projektowane postanowienia umowy */}
                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-left font-semibold">
                      7. Projektowane postanowienia umowy
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="postanowieniaUmowy">Postanowienia</Label>
                        <Textarea
                          id="postanowieniaUmowy"
                          name="postanowieniaUmowy"
                          value={formData.postanowieniaUmowy}
                          onChange={handleChange}
                          placeholder="Wzór umowy lub istotne postanowienia"
                          rows={5}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 8. Informacje o komunikacji elektronicznej */}
                  <AccordionItem value="item-8">
                    <AccordionTrigger className="text-left font-semibold">
                      8. Informacje o komunikacji elektronicznej
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="komunikacjaElektroniczna">Środki komunikacji</Label>
                        <Textarea
                          id="komunikacjaElektroniczna"
                          name="komunikacjaElektroniczna"
                          value={formData.komunikacjaElektroniczna}
                          onChange={handleChange}
                          placeholder="Wymagania techniczne, formaty plików, szyfrowanie na platformie"
                          rows={4}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 9. Komunikacja tradycyjna */}
                  <AccordionItem value="item-9">
                    <AccordionTrigger className="text-left font-semibold">
                      9. Komunikacja tradycyjna
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="komunikacjaTradycyjna">Dopuszczenie innej formy</Label>
                        <Textarea
                          id="komunikacjaTradycyjna"
                          name="komunikacjaTradycyjna"
                          value={formData.komunikacjaTradycyjna}
                          onChange={handleChange}
                          placeholder="Czy i kiedy dopuszcza się inną formę niż elektroniczna?"
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 10. Osoby do kontaktu */}
                  <AccordionItem value="item-10">
                    <AccordionTrigger className="text-left font-semibold">
                      10. Osoby do kontaktu
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="osobyKontakt">Osoby uprawnione</Label>
                        <Textarea
                          id="osobyKontakt"
                          name="osobyKontakt"
                          value={formData.osobyKontakt}
                          onChange={handleChange}
                          placeholder="Imię, nazwisko, stanowisko, telefon, e-mail"
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 11. Termin związania ofertą */}
                  <AccordionItem value="item-11">
                    <AccordionTrigger className="text-left font-semibold">
                      11. Termin związania ofertą
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="terminZwiazania">Termin</Label>
                        <Input
                          id="terminZwiazania"
                          name="terminZwiazania"
                          value={formData.terminZwiazania}
                          onChange={handleChange}
                          placeholder="np. 30 dni od terminu składania ofert"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 12. Opis sposobu przygotowania oferty */}
                  <AccordionItem value="item-12">
                    <AccordionTrigger className="text-left font-semibold">
                      12. Opis sposobu przygotowania oferty
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="sposobPrzygotowania">Wymagania</Label>
                        <Textarea
                          id="sposobPrzygotowania"
                          name="sposobPrzygotowania"
                          value={formData.sposobPrzygotowania}
                          onChange={handleChange}
                          placeholder="Język oferty, forma podpisów (kwalifikowany, zaufany, osobisty)"
                          rows={4}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 13. Sposób oraz termin składania ofert */}
                  <AccordionItem value="item-13">
                    <AccordionTrigger className="text-left font-semibold">
                      13. Sposób oraz termin składania ofert
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="terminSkladania">Termin i sposób</Label>
                        <Textarea
                          id="terminSkladania"
                          name="terminSkladania"
                          value={formData.terminSkladania}
                          onChange={handleChange}
                          placeholder="Data, godzina, platforma"
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 14. Termin otwarcia ofert */}
                  <AccordionItem value="item-14">
                    <AccordionTrigger className="text-left font-semibold">
                      14. Termin otwarcia ofert
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="terminOtwarcia">Data i godzina otwarcia</Label>
                        <Input
                          id="terminOtwarcia"
                          name="terminOtwarcia"
                          value={formData.terminOtwarcia}
                          onChange={handleChange}
                          placeholder="np. 15.01.2025 r. godz. 12:00"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 15. Podstawy wykluczenia */}
                  <AccordionItem value="item-15">
                    <AccordionTrigger className="text-left font-semibold">
                      15. Podstawy wykluczenia
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="podstawyWykluczenia">Przesłanki wykluczenia</Label>
                        <Textarea
                          id="podstawyWykluczenia"
                          name="podstawyWykluczenia"
                          value={formData.podstawyWykluczenia}
                          onChange={handleChange}
                          placeholder="Obligatoryjne przesłanki wykluczenia z art. 108 ust. 1"
                          rows={4}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 16. Sposób obliczenia ceny */}
                  <AccordionItem value="item-16">
                    <AccordionTrigger className="text-left font-semibold">
                      16. Sposób obliczenia ceny
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="sposobObliczeniaCeny">Metoda obliczenia</Label>
                        <Textarea
                          id="sposobObliczeniaCeny"
                          name="sposobObliczeniaCeny"
                          value={formData.sposobObliczeniaCeny}
                          onChange={handleChange}
                          placeholder="Cena ryczałtowa/kosztorysowa, VAT, transport itp."
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 17. Opis kryteriów oceny ofert */}
                  <AccordionItem value="item-17">
                    <AccordionTrigger className="text-left font-semibold">
                      17. Opis kryteriów oceny ofert
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="kryteriaOceny">Kryteria i wagi</Label>
                        <Textarea
                          id="kryteriaOceny"
                          name="kryteriaOceny"
                          value={formData.kryteriaOceny}
                          onChange={handleChange}
                          placeholder="np. Cena 60%, Gwarancja 40% - sposób wyliczania"
                          rows={4}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 18. Formalności po wyborze */}
                  <AccordionItem value="item-18">
                    <AccordionTrigger className="text-left font-semibold">
                      18. Formalności po wyborze
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="formalnosciPoWyborze">Wymagane czynności</Label>
                        <Textarea
                          id="formalnosciPoWyborze"
                          name="formalnosciPoWyborze"
                          value={formData.formalnosciPoWyborze}
                          onChange={handleChange}
                          placeholder="Co trzeba zrobić, aby podpisać umowę (np. wniesienie zabezpieczenia)"
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 19. Pouczenie o środkach ochrony prawnej */}
                  <AccordionItem value="item-19">
                    <AccordionTrigger className="text-left font-semibold">
                      19. Pouczenie o środkach ochrony prawnej
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="pouczenieOchronaPrawna">Informacja o odwołaniu</Label>
                        <Textarea
                          id="pouczenieOchronaPrawna"
                          name="pouczenieOchronaPrawna"
                          value={formData.pouczenieOchronaPrawna}
                          onChange={handleChange}
                          placeholder="Informacja o możliwości wniesienia odwołania do KIO"
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>

                <div className="mt-6 flex flex-col gap-4">
                  <Button 
                    onClick={handleGenerateDoc}
                    disabled={isGenerating || !hasAnyData}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generowanie...
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-5 w-5" />
                        Wygeneruj przetarg (.docx)
                      </>
                    )}
                  </Button>
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setFormData(initialFormData)}
                      className="flex-1"
                    >
                      Wyczyść formularz
                    </Button>
                    <Button className="flex-1" variant="secondary">
                      Zapisz dane
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PODGLĄD */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Podgląd wprowadzonych danych</CardTitle>
              </CardHeader>
              <CardContent>
                {!hasAnyData ? (
                  <p className="text-gray-500 text-center py-8">
                    Wprowadź dane w formularzu, aby zobaczyć podgląd
                  </p>
                ) : (
                  <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                    
                    {/* 1. Dane zamawiającego */}
                    {(formData.zamawiajacyNazwa || formData.zamawiajacyAdres || formData.zamawiajacyTelefon || formData.zamawiajacyEmail || formData.zamawiajacyWWW) && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">1. Dane zamawiającego</h3>
                        {formData.zamawiajacyNazwa && <p><strong>Nazwa:</strong> {formData.zamawiajacyNazwa}</p>}
                        {formData.zamawiajacyAdres && <p><strong>Adres:</strong> {formData.zamawiajacyAdres}</p>}
                        {formData.zamawiajacyTelefon && <p><strong>Telefon:</strong> {formData.zamawiajacyTelefon}</p>}
                        {formData.zamawiajacyEmail && <p><strong>E-mail:</strong> {formData.zamawiajacyEmail}</p>}
                        {formData.zamawiajacyWWW && <p><strong>WWW:</strong> {formData.zamawiajacyWWW}</p>}
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 2. Adres strony WWW dla dokumentów */}
                    {formData.dokumentyWWW && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">2. Adres strony WWW dla dokumentów</h3>
                        <p>{formData.dokumentyWWW}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 3. Tryb udzielenia zamówienia */}
                    {formData.trybZamowienia && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">3. Tryb udzielenia zamówienia</h3>
                        <p>{formData.trybZamowienia}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 4. Informacja o negocjacjach */}
                    {formData.negocjacje && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">4. Informacja o negocjacjach</h3>
                        <p className="whitespace-pre-wrap">{formData.negocjacje}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 5. Opis przedmiotu zamówienia */}
                    {formData.opisPrzedmiotu && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">5. Opis przedmiotu zamówienia (OPZ)</h3>
                        <p className="whitespace-pre-wrap">{formData.opisPrzedmiotu}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 6. Termin wykonania zamówienia */}
                    {formData.terminWykonania && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">6. Termin wykonania zamówienia</h3>
                        <p>{formData.terminWykonania}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 7. Projektowane postanowienia umowy */}
                    {formData.postanowieniaUmowy && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">7. Projektowane postanowienia umowy</h3>
                        <p className="whitespace-pre-wrap">{formData.postanowieniaUmowy}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 8. Informacje o komunikacji elektronicznej */}
                    {formData.komunikacjaElektroniczna && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">8. Informacje o komunikacji elektronicznej</h3>
                        <p className="whitespace-pre-wrap">{formData.komunikacjaElektroniczna}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 9. Komunikacja tradycyjna */}
                    {formData.komunikacjaTradycyjna && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">9. Komunikacja tradycyjna</h3>
                        <p className="whitespace-pre-wrap">{formData.komunikacjaTradycyjna}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 10. Osoby do kontaktu */}
                    {formData.osobyKontakt && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">10. Osoby do kontaktu</h3>
                        <p className="whitespace-pre-wrap">{formData.osobyKontakt}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 11. Termin związania ofertą */}
                    {formData.terminZwiazania && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">11. Termin związania ofertą</h3>
                        <p>{formData.terminZwiazania}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 12. Opis sposobu przygotowania oferty */}
                    {formData.sposobPrzygotowania && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">12. Opis sposobu przygotowania oferty</h3>
                        <p className="whitespace-pre-wrap">{formData.sposobPrzygotowania}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 13. Sposób oraz termin składania ofert */}
                    {formData.terminSkladania && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">13. Sposób oraz termin składania ofert</h3>
                        <p className="whitespace-pre-wrap">{formData.terminSkladania}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 14. Termin otwarcia ofert */}
                    {formData.terminOtwarcia && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">14. Termin otwarcia ofert</h3>
                        <p>{formData.terminOtwarcia}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 15. Podstawy wykluczenia */}
                    {formData.podstawyWykluczenia && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">15. Podstawy wykluczenia</h3>
                        <p className="whitespace-pre-wrap">{formData.podstawyWykluczenia}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 16. Sposób obliczenia ceny */}
                    {formData.sposobObliczeniaCeny && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">16. Sposób obliczenia ceny</h3>
                        <p className="whitespace-pre-wrap">{formData.sposobObliczeniaCeny}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 17. Opis kryteriów oceny ofert */}
                    {formData.kryteriaOceny && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">17. Opis kryteriów oceny ofert</h3>
                        <p className="whitespace-pre-wrap">{formData.kryteriaOceny}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 18. Formalności po wyborze */}
                    {formData.formalnosciPoWyborze && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">18. Formalności po wyborze</h3>
                        <p className="whitespace-pre-wrap">{formData.formalnosciPoWyborze}</p>
                        <Separator className="mt-4" />
                      </div>
                    )}

                    {/* 19. Pouczenie o środkach ochrony prawnej */}
                    {formData.pouczenieOchronaPrawna && (
                      <div>
                        <h3 className="font-semibold text-blue-700 mb-2">19. Pouczenie o środkach ochrony prawnej</h3>
                        <p className="whitespace-pre-wrap">{formData.pouczenieOchronaPrawna}</p>
                      </div>
                    )}

                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
