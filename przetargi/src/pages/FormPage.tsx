import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileDown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  // 1. Zamawiający
  oznaczenieSpawy: string;
  nazwaZamawiajacego: string;
  
  // 2. Przedmiot zamówienia
  nazwaPrzedmiotu: string;
  
  // 3. Wartość
  wartoscZamowienia: string;
  wartoscEuro: string;
  
  // 4. Tryb podstawowy
  trybPodstawowy: string;
  
  // 5. Osoby wykonujące czynności
  osobyWykonujace: string;
  
  // 7. Ogłoszenie o zamówieniu
  dataOgloszeniaBZP: string;
  numerOgloszeniaBZP: string;
  
  // 9. SWZ
  adresSWZ: string;
  
  // 11. Termin składania ofert
  terminSkladaniaOfertData: string;
  terminSkladaniaOfertGodzina: string;
  
  // 12. Otwarcie ofert
  dataOtwarciaOfert: string;
  godzinaOtwarciaOfert: string;
  
  // 22. Najkorzystniejsza oferta
  nazwaWykonawcy: string;
  kwotaOferty: string;
  uzasadnienieWyboru: string;
  
  // 29. Udzielenie zamówienia
  dataZawarciaUmowy: string;
  wykonawcaUmowy: string;
  kwotaUmowy: string;
  
  // Ogłoszenie o wyniku
  dataOgloszeniaWyniku: string;
  numerOgloszeniaWyniku: string;
  
  // 32. Osoba sporządzająca
  osobaSPorzadzajaca: string;
  dataSporzadzenia: string;
  
  // 33. Zatwierdzenie
  osobaZatwierdzajaca: string;
  dataZatwierdzenia: string;
}

const initialFormData: FormData = {
  oznaczenieSpawy: '',
  nazwaZamawiajacego: '',
  nazwaPrzedmiotu: '',
  wartoscZamowienia: '',
  wartoscEuro: '',
  trybPodstawowy: 'bez_negocjacji',
  osobyWykonujace: '',
  dataOgloszeniaBZP: '',
  numerOgloszeniaBZP: '',
  adresSWZ: '',
  terminSkladaniaOfertData: '',
  terminSkladaniaOfertGodzina: '',
  dataOtwarciaOfert: '',
  godzinaOtwarciaOfert: '',
  nazwaWykonawcy: '',
  kwotaOferty: '',
  uzasadnienieWyboru: '',
  dataZawarciaUmowy: '',
  wykonawcaUmowy: '',
  kwotaUmowy: '',
  dataOgloszeniaWyniku: '',
  numerOgloszeniaWyniku: '',
  osobaSPorzadzajaca: '',
  dataSporzadzenia: '',
  osobaZatwierdzajaca: '',
  dataZatwierdzenia: '',
};

const FormPage = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const hasAnyData = Object.values(formData).some(value => value && value.trim() !== '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
      a.download = 'Protokol_Przetargu.docx';
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
          Protokół Postępowania w Trybie Podstawowym
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FORMULARZ */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wypełnij dane protokołu</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
                  
                  {/* 1. Dane podstawowe */}
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left font-semibold">
                      1. Dane podstawowe
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="oznaczenieSpawy">Oznaczenie sprawy</Label>
                        <Input
                          id="oznaczenieSpawy"
                          name="oznaczenieSpawy"
                          value={formData.oznaczenieSpawy}
                          onChange={handleChange}
                          placeholder="np. ZP/01/2025"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nazwaZamawiajacego">Pełna nazwa zamawiającego</Label>
                        <Textarea
                          id="nazwaZamawiajacego"
                          name="nazwaZamawiajacego"
                          value={formData.nazwaZamawiajacego}
                          onChange={handleChange}
                          placeholder="Pełna nazwa zamawiającego"
                          rows={2}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 2. Przedmiot zamówienia */}
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left font-semibold">
                      2. Przedmiot zamówienia
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="nazwaPrzedmiotu">Nazwa przedmiotu zamówienia</Label>
                        <Textarea
                          id="nazwaPrzedmiotu"
                          name="nazwaPrzedmiotu"
                          value={formData.nazwaPrzedmiotu}
                          onChange={handleChange}
                          placeholder="Nazwa zamówienia nadana przez zamawiającego"
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 3. Wartość zamówienia */}
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left font-semibold">
                      3. Wartość zamówienia
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="wartoscZamowienia">Wartość zamówienia (zł)</Label>
                        <Input
                          id="wartoscZamowienia"
                          name="wartoscZamowienia"
                          value={formData.wartoscZamowienia}
                          onChange={handleChange}
                          placeholder="np. 150 000,00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="wartoscEuro">Równowartość w euro</Label>
                        <Input
                          id="wartoscEuro"
                          name="wartoscEuro"
                          value={formData.wartoscEuro}
                          onChange={handleChange}
                          placeholder="np. 35 000,00"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 4. Tryb podstawowy */}
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left font-semibold">
                      4. Tryb udzielenia zamówienia
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="trybPodstawowy">Tryb podstawowy</Label>
                        <Select 
                          value={formData.trybPodstawowy} 
                          onValueChange={(value) => handleSelectChange('trybPodstawowy', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Wybierz tryb" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bez_negocjacji">Bez możliwości negocjacji (art. 275 pkt 1)</SelectItem>
                            <SelectItem value="mozliwosc_negocjacji">Z możliwością negocjacji (art. 275 pkt 2)</SelectItem>
                            <SelectItem value="negocjacje">Z negocjacjami (art. 275 pkt 3)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 5. Osoby wykonujące czynności */}
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left font-semibold">
                      5. Osoby wykonujące czynności
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="osobyWykonujace">Osoby wykonujące czynności</Label>
                        <Textarea
                          id="osobyWykonujace"
                          name="osobyWykonujace"
                          value={formData.osobyWykonujace}
                          onChange={handleChange}
                          placeholder="Imię i nazwisko, funkcja"
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 6. Ogłoszenie o zamówieniu */}
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-left font-semibold">
                      6. Ogłoszenie o zamówieniu (BZP)
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="dataOgloszeniaBZP">Data zamieszczenia w BZP</Label>
                        <Input
                          id="dataOgloszeniaBZP"
                          name="dataOgloszeniaBZP"
                          type="date"
                          value={formData.dataOgloszeniaBZP}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="numerOgloszeniaBZP">Numer ogłoszenia</Label>
                        <Input
                          id="numerOgloszeniaBZP"
                          name="numerOgloszeniaBZP"
                          value={formData.numerOgloszeniaBZP}
                          onChange={handleChange}
                          placeholder="np. 2025/BZP 00012345/01"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 7. SWZ */}
                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-left font-semibold">
                      7. Specyfikacja Warunków Zamówienia
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="adresSWZ">Adres strony z SWZ</Label>
                        <Input
                          id="adresSWZ"
                          name="adresSWZ"
                          value={formData.adresSWZ}
                          onChange={handleChange}
                          placeholder="https://..."
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 8. Termin składania ofert */}
                  <AccordionItem value="item-8">
                    <AccordionTrigger className="text-left font-semibold">
                      8. Termin składania ofert
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="terminSkladaniaOfertData">Data</Label>
                        <Input
                          id="terminSkladaniaOfertData"
                          name="terminSkladaniaOfertData"
                          type="date"
                          value={formData.terminSkladaniaOfertData}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="terminSkladaniaOfertGodzina">Godzina</Label>
                        <Input
                          id="terminSkladaniaOfertGodzina"
                          name="terminSkladaniaOfertGodzina"
                          type="time"
                          value={formData.terminSkladaniaOfertGodzina}
                          onChange={handleChange}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 9. Otwarcie ofert */}
                  <AccordionItem value="item-9">
                    <AccordionTrigger className="text-left font-semibold">
                      9. Otwarcie ofert
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="dataOtwarciaOfert">Data otwarcia</Label>
                        <Input
                          id="dataOtwarciaOfert"
                          name="dataOtwarciaOfert"
                          type="date"
                          value={formData.dataOtwarciaOfert}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="godzinaOtwarciaOfert">Godzina otwarcia</Label>
                        <Input
                          id="godzinaOtwarciaOfert"
                          name="godzinaOtwarciaOfert"
                          type="time"
                          value={formData.godzinaOtwarciaOfert}
                          onChange={handleChange}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 10. Najkorzystniejsza oferta */}
                  <AccordionItem value="item-10">
                    <AccordionTrigger className="text-left font-semibold">
                      10. Najkorzystniejsza oferta
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="nazwaWykonawcy">Nazwa wykonawcy</Label>
                        <Input
                          id="nazwaWykonawcy"
                          name="nazwaWykonawcy"
                          value={formData.nazwaWykonawcy}
                          onChange={handleChange}
                          placeholder="Nazwa firmy"
                        />
                      </div>
                      <div>
                        <Label htmlFor="kwotaOferty">Kwota oferty (zł)</Label>
                        <Input
                          id="kwotaOferty"
                          name="kwotaOferty"
                          value={formData.kwotaOferty}
                          onChange={handleChange}
                          placeholder="np. 145 000,00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="uzasadnienieWyboru">Uzasadnienie wyboru</Label>
                        <Textarea
                          id="uzasadnienieWyboru"
                          name="uzasadnienieWyboru"
                          value={formData.uzasadnienieWyboru}
                          onChange={handleChange}
                          placeholder="Uzasadnienie faktyczne i prawne wyboru"
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 11. Udzielenie zamówienia */}
                  <AccordionItem value="item-11">
                    <AccordionTrigger className="text-left font-semibold">
                      11. Udzielenie zamówienia
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="dataZawarciaUmowy">Data zawarcia umowy</Label>
                        <Input
                          id="dataZawarciaUmowy"
                          name="dataZawarciaUmowy"
                          type="date"
                          value={formData.dataZawarciaUmowy}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="wykonawcaUmowy">Wykonawca (nazwa)</Label>
                        <Input
                          id="wykonawcaUmowy"
                          name="wykonawcaUmowy"
                          value={formData.wykonawcaUmowy}
                          onChange={handleChange}
                          placeholder="Nazwa wykonawcy"
                        />
                      </div>
                      <div>
                        <Label htmlFor="kwotaUmowy">Kwota umowy (zł)</Label>
                        <Input
                          id="kwotaUmowy"
                          name="kwotaUmowy"
                          value={formData.kwotaUmowy}
                          onChange={handleChange}
                          placeholder="np. 145 000,00"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 12. Ogłoszenie o wyniku */}
                  <AccordionItem value="item-12">
                    <AccordionTrigger className="text-left font-semibold">
                      12. Ogłoszenie o wyniku postępowania
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="dataOgloszeniaWyniku">Data zamieszczenia w BZP</Label>
                        <Input
                          id="dataOgloszeniaWyniku"
                          name="dataOgloszeniaWyniku"
                          type="date"
                          value={formData.dataOgloszeniaWyniku}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="numerOgloszeniaWyniku">Numer ogłoszenia</Label>
                        <Input
                          id="numerOgloszeniaWyniku"
                          name="numerOgloszeniaWyniku"
                          value={formData.numerOgloszeniaWyniku}
                          onChange={handleChange}
                          placeholder="np. 2025/BZP 00012345/01"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 13. Osoba sporządzająca */}
                  <AccordionItem value="item-13">
                    <AccordionTrigger className="text-left font-semibold">
                      13. Osoba sporządzająca protokół
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="osobaSPorzadzajaca">Imię i nazwisko</Label>
                        <Input
                          id="osobaSPorzadzajaca"
                          name="osobaSPorzadzajaca"
                          value={formData.osobaSPorzadzajaca}
                          onChange={handleChange}
                          placeholder="Imię i nazwisko"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataSporzadzenia">Data sporządzenia</Label>
                        <Input
                          id="dataSporzadzenia"
                          name="dataSporzadzenia"
                          type="date"
                          value={formData.dataSporzadzenia}
                          onChange={handleChange}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* 14. Zatwierdzenie */}
                  <AccordionItem value="item-14">
                    <AccordionTrigger className="text-left font-semibold">
                      14. Zatwierdzenie protokołu
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div>
                        <Label htmlFor="osobaZatwierdzajaca">Imię i nazwisko zatwierdzającego</Label>
                        <Input
                          id="osobaZatwierdzajaca"
                          name="osobaZatwierdzajaca"
                          value={formData.osobaZatwierdzajaca}
                          onChange={handleChange}
                          placeholder="Imię i nazwisko"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataZatwierdzenia">Data zatwierdzenia</Label>
                        <Input
                          id="dataZatwierdzenia"
                          name="dataZatwierdzenia"
                          type="date"
                          value={formData.dataZatwierdzenia}
                          onChange={handleChange}
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
                        Wygeneruj protokół (.docx)
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

          {/* PODGLĄD DOKUMENTU */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Card className="bg-white shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-xl">Podgląd dokumentu</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Symulacja strony A4 */}
                <div className="max-h-[75vh] overflow-y-auto">
                  <div className="bg-white p-8 min-h-[600px] shadow-inner" style={{ fontFamily: 'Times New Roman, serif' }}>
                    
                    {/* Nagłówek dokumentu */}
                    <div className="text-right text-sm mb-4">
                      oznaczenie sprawy <span className="border-b border-dotted border-gray-400 inline-block min-w-[150px] text-center">
                        {formData.oznaczenieSpawy || '...........................'}
                      </span>
                      <span className="ml-4 font-bold">DRUK ZP-TP</span>
                    </div>

                    {/* Tytuł */}
                    <h1 className="text-center font-bold text-lg mb-6 mt-8">
                      PROTOKÓŁ POSTĘPOWANIA W TRYBIE PODSTAWOWYM
                    </h1>

                    <p className="text-sm mb-4">Protokół dotyczy:</p>
                    <p className="text-sm mb-1 ml-4">• zamówienia publicznego</p>
                    <p className="text-sm mb-6 ml-4">• umowy ramowej</p>

                    {/* Tabela z danymi */}
                    <table className="w-full border-collapse text-sm mb-6">
                      <tbody>
                        {/* 1. Zamawiający */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold">1.</td>
                          <td className="border border-gray-400 p-2">
                            <p className="font-bold mb-2">Zamawiający</p>
                            <p className="mb-1">Pełna nazwa zamawiającego/zamawiających wspólnie przeprowadzających:</p>
                            <p className="border-b border-dotted border-gray-400 min-h-[20px] mt-1">
                              {formData.nazwaZamawiajacego || '.................................................'}
                            </p>
                          </td>
                        </tr>

                        {/* 2. Przedmiot zamówienia */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold">2.</td>
                          <td className="border border-gray-400 p-2">
                            <p className="font-bold mb-2">Przedmiot zamówienia</p>
                            <p className="mb-1">Nazwa przedmiotu zamówienia/umowy ramowej:</p>
                            <p className="border-b border-dotted border-gray-400 min-h-[20px] mt-1">
                              {formData.nazwaPrzedmiotu || '.........................................'}
                            </p>
                          </td>
                        </tr>

                        {/* 3. Wartość */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold">3.</td>
                          <td className="border border-gray-400 p-2">
                            <p className="font-bold mb-2">Wartość</p>
                            <p className="mb-1">
                              • zamówienia <span className="border-b border-dotted border-gray-400 inline-block min-w-[100px] text-center">
                                {formData.wartoscZamowienia || '.........................'}
                              </span> zł, co stanowi równowartość <span className="border-b border-dotted border-gray-400 inline-block min-w-[80px] text-center">
                                {formData.wartoscEuro || '......................'}
                              </span> euro
                            </p>
                          </td>
                        </tr>

                        {/* 5. Tryb */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold">5.</td>
                          <td className="border border-gray-400 p-2">
                            <p className="font-bold mb-2">Zamawiający udziela zamówienia w trybie podstawowym:</p>
                            <p className={`mb-1 ${formData.trybPodstawowy === 'bez_negocjacji' ? 'font-bold' : ''}`}>
                              • bez możliwości negocjacji, na podstawie art. 275 pkt 1 ustawy
                            </p>
                            <p className={`mb-1 ${formData.trybPodstawowy === 'mozliwosc_negocjacji' ? 'font-bold' : ''}`}>
                              • z możliwością negocjacji, na podstawie art. 275 pkt 2 ustawy
                            </p>
                            <p className={`mb-1 ${formData.trybPodstawowy === 'negocjacje' ? 'font-bold' : ''}`}>
                              • z negocjacjami, na podstawie art. 275 pkt 3 ustawy
                            </p>
                          </td>
                        </tr>

                        {/* 7. Ogłoszenie o zamówieniu */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold">7.</td>
                          <td className="border border-gray-400 p-2">
                            <p className="font-bold mb-2">Ogłoszenie o zamówieniu</p>
                            <p className="mb-1">
                              1. Ogłoszenie o zamówieniu zostało zamieszczone w BZP w dniu <span className="border-b border-dotted border-gray-400 inline-block min-w-[100px] text-center">
                                {formData.dataOgloszeniaBZP ? new Date(formData.dataOgloszeniaBZP).toLocaleDateString('pl-PL') : '..........................'}
                              </span> r., pod nr <span className="border-b border-dotted border-gray-400 inline-block min-w-[120px] text-center">
                                {formData.numerOgloszeniaBZP || '.................'}
                              </span>
                            </p>
                          </td>
                        </tr>

                        {/* 9. SWZ */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold">9.</td>
                          <td className="border border-gray-400 p-2">
                            <p className="font-bold mb-2">Specyfikacja warunków zamówienia (SWZ)</p>
                            <p className="mb-1">SWZ została udostępniona na stronie internetowej prowadzonego postępowania:</p>
                            <p className="border-b border-dotted border-gray-400 min-h-[20px] mt-1">
                              {formData.adresSWZ || '......................................................................................'}
                            </p>
                          </td>
                        </tr>

                        {/* 11. Termin składania ofert */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold">11.</td>
                          <td className="border border-gray-400 p-2">
                            <p className="font-bold mb-2">Sposób i termin składania ofert</p>
                            <p className="mb-1">
                              1. Termin składania ofert upłynął w dniu <span className="border-b border-dotted border-gray-400 inline-block min-w-[100px] text-center">
                                {formData.terminSkladaniaOfertData ? new Date(formData.terminSkladaniaOfertData).toLocaleDateString('pl-PL') : '................'}
                              </span> r. o godz. <span className="border-b border-dotted border-gray-400 inline-block min-w-[50px] text-center">
                                {formData.terminSkladaniaOfertGodzina || '......'}
                              </span>
                            </p>
                          </td>
                        </tr>

                        {/* 12. Otwarcie ofert */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold">12.</td>
                          <td className="border border-gray-400 p-2">
                            <p className="font-bold mb-2">Otwarcie ofert</p>
                            <p className="mb-1">
                              Otwarcie ofert nastąpiło w dniu <span className="border-b border-dotted border-gray-400 inline-block min-w-[100px] text-center">
                                {formData.dataOtwarciaOfert ? new Date(formData.dataOtwarciaOfert).toLocaleDateString('pl-PL') : '................'}
                              </span> r. o godz. <span className="border-b border-dotted border-gray-400 inline-block min-w-[50px] text-center">
                                {formData.godzinaOtwarciaOfert || '......'}
                              </span>
                            </p>
                          </td>
                        </tr>

                        {/* 22. Najkorzystniejsza oferta */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold">22.</td>
                          <td className="border border-gray-400 p-2">
                            <p className="font-bold mb-2">Najkorzystniejsza oferta</p>
                            <p className="mb-1">
                              Jako najkorzystniejszą wybrano ofertę wykonawcy: <span className="border-b border-dotted border-gray-400 inline-block min-w-[200px]">
                                {formData.nazwaWykonawcy || '.......................................'}
                              </span>
                            </p>
                            <p className="mb-1">
                              na kwotę: <span className="border-b border-dotted border-gray-400 inline-block min-w-[100px] text-center">
                                {formData.kwotaOferty || '.........................'}
                              </span> zł
                            </p>
                            {formData.uzasadnienieWyboru && (
                              <p className="mb-1 mt-2">
                                <span className="font-semibold">Uzasadnienie:</span> {formData.uzasadnienieWyboru}
                              </p>
                            )}
                          </td>
                        </tr>

                        {/* 29. Udzielenie zamówienia */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold">29.</td>
                          <td className="border border-gray-400 p-2">
                            <p className="font-bold mb-2">Udzielenie zamówienia</p>
                            <p className="mb-1">
                              1. Umowa została zawarta w dniu <span className="border-b border-dotted border-gray-400 inline-block min-w-[100px] text-center">
                                {formData.dataZawarciaUmowy ? new Date(formData.dataZawarciaUmowy).toLocaleDateString('pl-PL') : '...............'}
                              </span> r., z <span className="border-b border-dotted border-gray-400 inline-block min-w-[200px]">
                                {formData.wykonawcaUmowy || '.......................................'}
                              </span>
                            </p>
                            <p className="mb-1">
                              na kwotę <span className="border-b border-dotted border-gray-400 inline-block min-w-[100px] text-center">
                                {formData.kwotaUmowy || '.........................'}
                              </span> zł
                            </p>
                          </td>
                        </tr>

                        {/* Ogłoszenie o wyniku */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold"></td>
                          <td className="border border-gray-400 p-2">
                            <p className="mb-1">
                              2. Ogłoszenie o wyniku postępowania zostało zamieszczone w BZP w dniu <span className="border-b border-dotted border-gray-400 inline-block min-w-[100px] text-center">
                                {formData.dataOgloszeniaWyniku ? new Date(formData.dataOgloszeniaWyniku).toLocaleDateString('pl-PL') : '........................'}
                              </span> r. pod nr <span className="border-b border-dotted border-gray-400 inline-block min-w-[120px] text-center">
                                {formData.numerOgloszeniaWyniku || '.................'}
                              </span>
                            </p>
                          </td>
                        </tr>

                        {/* 32. Osoba sporządzająca */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold">32.</td>
                          <td className="border border-gray-400 p-2">
                            <p className="font-bold mb-2">Osoba sporządzająca protokół</p>
                            <p className="mb-1">
                              Protokół sporządził: <span className="border-b border-dotted border-gray-400 inline-block min-w-[250px]">
                                {formData.osobaSPorzadzajaca || '......................................................................................'}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 ml-28">(imię i nazwisko)</p>
                            {formData.dataSporzadzenia && (
                              <p className="mt-2">Data: {new Date(formData.dataSporzadzenia).toLocaleDateString('pl-PL')}</p>
                            )}
                          </td>
                        </tr>

                        {/* 33. Zatwierdzenie */}
                        <tr className="border border-gray-400">
                          <td className="border border-gray-400 p-2 w-8 align-top font-bold">33.</td>
                          <td className="border border-gray-400 p-2">
                            <p className="font-bold mb-2">Zatwierdzenie protokołu</p>
                            <p className="mb-1">
                              <span className="border-b border-dotted border-gray-400 inline-block min-w-[250px]">
                                {formData.osobaZatwierdzajaca || '...........................................................................................................'}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500">(imię i nazwisko kierownika zamawiającego lub osoby upoważnionej)</p>
                            {formData.dataZatwierdzenia && (
                              <p className="mt-2">Data: {new Date(formData.dataZatwierdzenia).toLocaleDateString('pl-PL')}</p>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Stopka */}
                    <div className="border-t border-gray-300 pt-4 mt-8 text-center text-xs text-gray-500">
                      <p>..................................................................</p>
                      <p>numer strony &nbsp;&nbsp;&nbsp; (podpis osoby sporządzającej protokół)</p>
                    </div>

                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
