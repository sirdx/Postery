import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import {
  defaultLanguage,
  supportedLanguages,
} from 'src/config/i18n';

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    supportedLngs: supportedLanguages.map(
      (lang) => lang.code,
    ),
    nonExplicitSupportedLngs: true,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
    debug: process.env.NODE_ENV === 'development'
  });

export default i18next;