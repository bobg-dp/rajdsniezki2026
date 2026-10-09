/**
 * Nagrania z kanału Automobilklubu Karkonosze.
 * Prezentacje tras są przypisane do rang z tytułu filmu.
 * Stara Kamienica dla KJS i Rally Sprintu to jedno nagranie.
 */
export const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/@automobilklubkarkonosze";

const videos = [
  {
    id: "nq1gshknJis",
    title: "Rozmowa z dyrektorem rajdu",
    subtitle: "Automobilklub Karkonosze",
    tiers: ["ro", "rs", "kjs"],
  },
  {
    id: "D00rXQqqVDI",
    title: "OS Michałowice",
    subtitle: "Prezentacja trasy Rajdu Okręgowego",
    tiers: ["ro"],
  },
  {
    id: "ZyiOjbGurQI",
    title: "OS Stara Kamienica",
    subtitle: "Prezentacja trasy Rajdu Okręgowego",
    tiers: ["ro"],
  },
  {
    id: "807Pr3tTPJA",
    title: "OS Michałowice",
    subtitle: "Prezentacja trasy Rally Sprintu",
    tiers: ["rs"],
  },
  {
    id: "XZIZH2WXiBc",
    title: "OS Stara Kamienica",
    subtitle: "Prezentacja trasy Rally Sprintu i KJS",
    tiers: ["rs", "kjs"],
  },
  {
    id: "5x0fKUEb8wg",
    title: "OS Michałowice",
    subtitle: "Prezentacja trasy KJS",
    tiers: ["kjs"],
  },
];

export function getVideosForTier(tierKey) {
  return videos.filter((video) => video.tiers.includes(tierKey));
}
