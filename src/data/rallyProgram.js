/**
 * Program rajdu z regulaminu uzupełniającego, ułożony dniami.
 * Godziny i miejsca są przepisane z tabeli organizatora.
 */
const roProgram = [
  {
    shortDate: "03.10",
    dayOfWeek: "Sobota",
    label: "Regulamin i zapisy",
    isRaceDay: false,
    events: [
      {
        time: "",
        name: "Opublikowanie Regulaminu Uzupełniającego",
        location: "www.rallykarkonosze.pl",
      },
      { time: "", name: "Otwarcie Listy zgłoszeń", location: "" },
      { time: "", name: "Otwarcie zgłoszeń akredytacji dla Mediów", location: "" },
    ],
  },
  {
    shortDate: "09.10",
    dayOfWeek: "Piątek",
    label: "Zamknięcie zapisów",
    isRaceDay: false,
    events: [
      {
        time: "23:59",
        name: "Zamknięcie zgłoszeń akredytacji dla Mediów",
        location: "",
      },
      { time: "23:59", name: "Zamknięcie Listy zgłoszeń", location: "" },
      {
        time: "23:59",
        name: "Termin zamówienia dodatkowej powierzchni w Parku Serwisowym",
        location: "",
      },
    ],
  },
  {
    shortDate: "13.10",
    dayOfWeek: "Wtorek",
    label: "Publikacje oficjalne",
    isRaceDay: false,
    events: [
      {
        time: "",
        name: "Opublikowanie Listy zgłoszeń",
        location: "www.rallykarkonosze.pl",
      },
      {
        time: "",
        name: "Opublikowanie Planu Parku Serwisowego",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
    ],
  },
  {
    shortDate: "14.10",
    dayOfWeek: "Środa",
    label: "Publikacje oficjalne",
    isRaceDay: false,
    events: [
      {
        time: "",
        name: "Opublikowanie Harmonogramu Odbioru Administracyjnego",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
      {
        time: "",
        name: "Opublikowanie Harmonogramu Badania Kontrolnego",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
    ],
  },
  {
    shortDate: "17.10",
    dayOfWeek: "Sobota",
    label: "Odbiór administracyjny i ceremonia startu",
    isRaceDay: true,
    events: [
      {
        time: "08:00–11:00",
        name: "Odbiór Administracyjny",
        location:
          "Zespół Szkół Technicznych „Mechanik”, ul. Obrońców Pokoju 10, 58-500 Jelenia Góra",
      },
      {
        time: "08:00–11:00",
        name: "Wydawanie Książki drogowej, Mapy Rajdu",
        location:
          "Zespół Szkół Technicznych „Mechanik”, ul. Obrońców Pokoju 10, 58-500 Jelenia Góra",
      },
      {
        time: "08:00–11:00",
        name: "Wydawanie materiałów i dokumentów",
        location:
          "Zespół Szkół Technicznych „Mechanik”, ul. Obrońców Pokoju 10, 58-500 Jelenia Góra",
      },
      {
        time: "08:00–11:00",
        name: "Wydawanie urządzeń GPS do zapoznania z trasą rajdu",
        location:
          "Zespół Szkół Technicznych „Mechanik”, ul. Obrońców Pokoju 10, 58-500 Jelenia Góra",
      },
      {
        time: "08:30",
        name: "Rozpoczęcie zapoznania z trasą",
        location: "Zgodnie z Załącznikiem 2",
      },
      {
        time: "16:00",
        name: "Zakończenie zapoznania z trasą rajdu",
        location: "Zgodnie z Załącznikiem 2",
      },
      {
        time: "10:00–15:00",
        name: "Badanie Kontrolne BK 1",
        location:
          "„Stacja Kontroli Pojazdów PZM”, ul. Wolności 57, 58-500 Jelenia Góra",
      },
      {
        time: "08:00–15:00",
        name: "Montaż urządzeń GPS",
        location:
          "„Stacja Kontroli Pojazdów PZM”, ul. Wolności 57, 58-500 Jelenia Góra",
      },
      {
        time: "15:00–15:30",
        name: "Powtórne Badanie Kontrolne",
        location:
          "„Stacja Kontroli Pojazdów PZM”, ul. Wolności 57, 58-500 Jelenia Góra",
      },
      {
        time: "16:00",
        name: "Opublikowanie zmienionej Listy Zgłoszeń",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
      {
        time: "15:30",
        name: "Opublikowanie Harmonogramu wjazdu do Strefy Oczekiwania przed Ceremonią Startu",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
      {
        time: "15:30",
        name: "Opublikowanie Listy startowej dla Ceremonii Startu Honorowego",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
      {
        time: "20:00",
        name: "Opublikowanie Listy startowej dla Sekcji 1 (PKC 0)",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
      {
        time: "17:00",
        name: "Ceremonia Startu Honorowego",
        location:
          "„Urząd Miasta Jelenia Góra”, Plac Ratuszowy 2, 58-500 Jelenia Góra",
      },
    ],
  },
  {
    shortDate: "18.10",
    dayOfWeek: "Niedziela",
    label: "Dzień rajdu",
    isRaceDay: true,
    events: [
      {
        time: "08:00",
        name: "Start Rajdu - Sekcja 1 (PKC 0)",
        location: "Park Serwisowy",
      },
      { time: "16:10", name: "„Ceremonia Podium”", location: "" },
      { time: "15:33", name: "Meta Rajdu (PKC 6C)", location: "" },
      {
        time: "Natychmiast po przyjeździe na metę rajdu",
        name: "Badanie Kontrolne BK 2 (zgodnie z instrukcjami sędziów)",
        location:
          "Stacja Kontroli Pojazdów PZM w Jeleniej Górze, ul. Wolności 57, 58-500 Jelenia Góra",
      },
      {
        time: "16:00",
        name: "Opublikowanie klasyfikacji prowizorycznej",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
      {
        time: "16:10",
        name: "Rozdanie nagród",
        location:
          "„Urząd Miasta Jelenia Góra”, Plac Ratuszowy 2, 58-500 Jelenia Góra",
      },
      {
        time: "Po podpisaniu przez ZSS i upłynięciu czasu na protesty",
        name: "Opublikowanie klasyfikacji końcowej",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
    ],
  },
];

const rsProgram = [
  {
    shortDate: "03.10",
    dayOfWeek: "Sobota",
    label: "Regulamin i zapisy",
    isRaceDay: false,
    events: [
      {
        time: "",
        name: "Opublikowanie Regulaminu Uzupełniającego",
        location: "www.rallykarkonosze.pl",
      },
      { time: "", name: "Otwarcie Listy zgłoszeń", location: "" },
      { time: "", name: "Otwarcie zgłoszeń akredytacji dla Mediów", location: "" },
    ],
  },
  {
    shortDate: "11.10",
    dayOfWeek: "Niedziela",
    label: "Zamknięcie zapisów",
    isRaceDay: false,
    events: [
      {
        time: "23:59",
        name: "Zamknięcie zgłoszeń akredytacji dla Mediów",
        location: "",
      },
      { time: "23:59", name: "Zamknięcie Listy zgłoszeń", location: "" },
      {
        time: "23:59",
        name: "Termin zamówienia dodatkowej powierzchni w Parku Serwisowym",
        location: "",
      },
    ],
  },
  {
    shortDate: "13.10",
    dayOfWeek: "Wtorek",
    label: "Publikacje oficjalne",
    isRaceDay: false,
    events: [
      {
        time: "",
        name: "Opublikowanie Listy zgłoszeń",
        location: "www.rallykarkonosze.pl",
      },
      {
        time: "",
        name: "Opublikowanie Planu Parku Serwisowego",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
    ],
  },
  {
    shortDate: "14.10",
    dayOfWeek: "Środa",
    label: "Publikacje oficjalne",
    isRaceDay: false,
    events: [
      {
        time: "",
        name: "Opublikowanie Harmonogramu Odbioru Administracyjnego",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
      {
        time: "",
        name: "Opublikowanie Harmonogramu Badania Kontrolnego",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
    ],
  },
  {
    shortDate: "17.10",
    dayOfWeek: "Sobota",
    label: "Odbiór administracyjny i ceremonia startu",
    isRaceDay: true,
    events: [
      { time: "08:00–11:00", name: "Odbiór Administracyjny", location: "" },
      {
        time: "08:00–11:00",
        name: "Wydawanie Książki drogowej, Mapy Rajdu",
        location:
          "„Divemed Sp. z o.o.”, ul. Nowowiejska 81, 58-500 Jelenia Góra",
      },
      {
        time: "08:00–11:00",
        name: "Wydawanie materiałów i dokumentów",
        location:
          "„Divemed Sp. z o.o.”, ul. Nowowiejska 81, 58-500 Jelenia Góra",
      },
      {
        time: "08:00–11:00",
        name: "Wydawanie urządzeń GPS do zapoznania z trasą rajdu",
        location:
          "„Divemed Sp. z o.o.”, ul. Nowowiejska 81, 58-500 Jelenia Góra",
      },
      {
        time: "08:30",
        name: "Rozpoczęcie zapoznania z trasą",
        location: "Zgodnie z Załącznikiem 2",
      },
      {
        time: "16:00",
        name: "Zakończenie zapoznania z trasą rajdu",
        location: "Zgodnie z Załącznikiem 2",
      },
      {
        time: "10:00–15:00",
        name: "Badanie Kontrolne BK 1",
        location:
          "„Stacja Kontroli Pojazdów PZM”, ul. Wolności 57, 58-500 Jelenia Góra",
      },
      {
        time: "10:00–15:00",
        name: "Montaż urządzeń GPS",
        location:
          "„Stacja Kontroli Pojazdów PZM”, ul. Wolności 57, 58-500 Jelenia Góra",
      },
      {
        time: "15:00–15:30",
        name: "Powtórne Badanie Kontrolne",
        location:
          "„Stacja Kontroli Pojazdów PZM”, ul. Wolności 57, 58-500 Jelenia Góra",
      },
      {
        time: "16:00",
        name: "Opublikowanie zmienionej Listy Zgłoszeń",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
      {
        time: "15:30",
        name: "Opublikowanie Harmonogramu wjazdu do Strefy Oczekiwania przed Ceremonią Startu",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
      {
        time: "15:30",
        name: "Opublikowanie Listy startowej dla Ceremonii Startu Honorowego",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
      {
        time: "20:00",
        name: "Opublikowanie Listy startowej do Sekcji 1 (PKC 0)",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
      {
        time: "17:00",
        name: "Ceremonia Startu Honorowego",
        location:
          "„Urząd Miasta Jelenia Góra”, Plac Ratuszowy 2, 58-500 Jelenia Góra",
      },
    ],
  },
  {
    shortDate: "18.10",
    dayOfWeek: "Niedziela",
    label: "Dzień rajdu",
    isRaceDay: true,
    events: [
      {
        time: "08:45",
        name: "Start Rajdu - Sekcja 1 (PKC 0)",
        location: "Park Serwisowy",
      },
      { time: "16:50", name: "„Ceremonia Podium”", location: "" },
      { time: "16:18", name: "Meta Rajdu (PKC 6C)", location: "" },
      {
        time: "Natychmiast po przyjeździe na metę rajdu",
        name: "Badanie Kontrolne BK 2 (zgodnie z instrukcjami sędziów)",
        location:
          "Stacja Kontroli Pojazdów PZM w Jeleniej Górze, ul. Wolności 57, 58-500 Jelenia Góra",
      },
      {
        time: "16:30",
        name: "Opublikowanie klasyfikacji prowizorycznej",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
      {
        time: "16:48",
        name: "Rozdanie nagród",
        location:
          "„Urząd Miasta Jelenia Góra”, Plac Ratuszowy 2, 58-500 Jelenia Góra",
      },
      {
        time: "Po podpisaniu przez ZSS i upłynięciu czasu na protesty",
        name: "Opublikowanie klasyfikacji końcowej",
        location: "Elektroniczna Tablica Ogłoszeń",
      },
    ],
  },
];

const programs = {
  ro: roProgram,
  rs: rsProgram,
};

export function getRallyProgram(tierKey) {
  return programs[tierKey] ?? null;
}
