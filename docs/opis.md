# Identyfikacja wizualna i plan strony www

## Impreza

Strona internetowa jest budowana dla imprezy Rajd Śnieżki
Jest ot rajd samochodowy, samochodów osobowych. Pod tą nazwą będą odbywać się imprezy 2 rang:
1 Runda Rajdowych Samochodowych Mistrzostw Dolnego Śląska w randzie Rajdu Okręgowego (RO)
1 Runda Mistrzostw Południa w randzie Rally Sprintu (RS)
Data 17-18 Października 2026
Miejsce rajdu Jelenia Góra
Logo znajduje się w fodlerze /assets/logo.png
Logo ze spashem bardziej dynamiczne znajduje się /assets/logo-splash.png

## Klimat imprezy o strony www

Do wizerunku strony wykorzystywane są auta rajdopwe i charakterystyczny wizerunek rochlapywanej wody/piasku, błota.
Kilmat rajdowy i samochodowy nie moze jednak przskaddzać w czytelnoiści projektu. Imprezy rozgrywane jak Rally Karkonbosze to rajdy asfaltowe.

## Design

### Ogólny zarys

Czytelna strona eventowa, posadające jednak sporo elementów nadających dynamikę. Naprzykład przejscie między sekcjami przyponające jakby jedna nawiezchnia rozchlapała sie na drugą
Być moe nawiązania do ulic asfaltów a więc do nawierzchni rajdów. Mile widziane elementy jak pochołki flagi.
Najwaniejszą jednak funkcją jest czytelnosć i responsywnosć w podejsciu mobile firts.

## Kolorystyka

### Tło napisów/strony głównej sekcji

Proponowany biały lub zblizony do białego

### Napisy głównej sekcji

Poroponowany kolor czarny lub zlizony do czarnego

### Kolory strony

Główne kolory wydarzenia to:

- zółty - #F76003
- czarny - #18364E
  DO teł mozna uyć przyciemnionych wersji np
- zółty - #C04B02
- czarny - #0E2133 + szary #24455F

## Struktura strony

### Hero

Pierwszy element zajmujący 100 szerokości i wysokości strony a w nim:

- Obrazek rajdowy lub film za jakimś darkeningiem (moze nie pełny a właśnie w formie rochlapanejk wody/błota) który nie będzie odciągał uwagi/
- animacvja z wjazdem/pojawieniem się nazwy rajdu opraz daty
- na górze biały pasek na 125px desktop / 90px mobile
  - na pasku po lewej logo rajdu z linkiem do łównej strony i animają on hover
  - po prawej ikony sociali + link do wyników online, które w mobilce zmieną się w hambuirgera od menu
- pod paskiem menu o wysokości 52px. Elementy menu:
  - Informacje
    - o rajdzie
    - aktualności
    - lista zgłoszeń
  - Zawodnicy RSMDS
  - Zawodnicy RPP
  - Kibice
    - mieszkańcy
    - przydatne infomacje
    - sklep
  - Partnerzy
  - Kontakt
- na dole Hero odnośnik przesuwający na aktualnści - dobrze jakby był animowany
- DO obrazka/filmu hero dobrze jakby były zółto czarne wstawki nawiązujące do koorystyki i klimatu rajdu

### Panel aktualności

Zółty prosty panel aktualności

- na szeorokosć 3 ostatni newsy i poniejh przycisk zobacz więcej

### Pane skrótów

Sekcja mopze być ciemna i znowu z przjeście między sekcjami w stulu rochlapanej wody/błota
ładne duzę ikony z napisami i animają on hover grid 3 w kadym poziomie:

- Dział zawodników
- Dla kiubiców
- Dla mieszkańców

- program rajdu
- mapy rajdu
- partnerzy

### Partnerzy

Dział partnerów
Na początek podział sponsor tytularny a więc na 2 częsci, po lewej logo (place holder) po prawej tekst (dodaj jaki larum impsum)
Później reszta parnerow pojawiajaca sie rzędami, zróbmy miejsce na przynajmniej 3 rzędy i wrzućmy jakiś placeholdera na raize

### Cykle i organizatorzy

Kolejna sekcja będzie wyraźnie oddzielona koorem tła i będzie zawierać 2 listy

- Organizatorzy
  - Automobilklub Karkonosze - logo: /assets/AKK-Orange-white.webp
  - Polski Związek Motorowy - logo: /assets/pzm.webp
- Rajd w cyklu - tu mozemy naprzykłąd zmienić ikony w kółka
- Rajdowe Mistrzostrwa Południa - logo /assets/rmp.jpog
- `Rajdowe Samochodowe Mistrzostwa Dolnego Sląska - logo /assets/rsmds.jpg

## Techniczne aspekty strony

Strona powinna być responsywna i czytlna zarówno na mobilklach jak i destopie.
Nie musimy uzywać jakiś mechanizmów cachujących bardzo, ale szybkośc strony te jest bardzo wazna.
Uzywajmy placeholderów wszędzie tam gdzie będziemy doładowywać grafdiki/filmy
