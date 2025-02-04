export enum Countries {
  Ashenmoor = "Ashenmoor",
  Baschichium = "Baschichium",
  Ellamali = "Ellamali",
  Farsight = "Farsight",
  Foratstar = "Foratstar",
  Goldtail = "Goldtail",
  Granbazaar = "Granbazaar",
  Jotunhammer = "Jotunhammer",
  Kantenlant = "Kantenlant",
  Lagvaden = "Lagvaden",
  Mandikanta = "Mandikanta",
  Poisontooth = "Poisontooth",
  Prayja = "Prayja",
  Rarchivia = "Rarchivia",
  Ratterra = "Ratterra",
  Soldem = "Soldem",
  Stoucket = "Stoucket",
  Tamla = "Tamla",
  Underforge = "Underforge",
  Untermarkt = "Untermarkt",
  Woodweb = "Woodweb"
}

export const COUNTRIES_LIST = Object.values(Countries);

export const getCountryIcon = (country: Countries) => `/assets/countries/Icon_Country_${country}.png`;
