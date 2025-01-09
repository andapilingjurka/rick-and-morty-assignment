import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          headerTitle: "List of Rick and Morty Characters",
          loading: "Loading...",
          noMoreCharacters: "No more characters to display.",
          filterByStatus: "Filter by Status:",
          filterBySpecies: "Filter by Species:",
          sortBy: "Sort by:",
          all: "All",
          none: "None",
          status: "Status",
          species: "Species",
          gender: "Gender",
          name: "Name",
          origin: "Origin",
          alive: "Alive",
          dead: "Dead",
          unknown: "Unknown",
          human: "Human",
          alien: "Alien",
        },
      },
      de: {
        translation: {
          headerTitle: "Liste der Rick und Morty Charaktere",
          loading: "Wird geladen...",
          noMoreCharacters: "Keine weiteren Charaktere zum Anzeigen.",
          filterByStatus: "Nach Status filtern:",
          filterBySpecies: "Nach Spezies filtern:",
          sortBy: "Sortieren nach:",
          all: "Alle",
          none: "Keine",
          status: "Status",
          species: "Spezies",
          gender: "Geschlecht",
          name: "Name",
          origin: "Herkunft",
          alive: "Lebendig",
          dead: "Tot",
          unknown: "Unbekannt",
          human: "Mensch",
          alien: "Alien",
        },
      },
    },
    lng: 'en', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
