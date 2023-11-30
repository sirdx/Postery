import { enUS, pl } from "date-fns/locale";

export const defaultLanguage = 'en';

export const supportedLanguages = [
  { code: 'en', name: 'English', dateFns: enUS },
  { code: 'pl', name: 'Polski', dateFns: pl },
];
