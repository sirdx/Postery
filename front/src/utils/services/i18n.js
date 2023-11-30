import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import {
  defaultLanguage,
  supportedLanguages,
} from 'src/utils/config/i18n';
import { formatDistance } from 'date-fns';

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
      format: function(value, format, lng) {
        if (format === 'distance') {
          const locale = supportedLanguages.find(val => val.code === lng).dateFns;
          return formatDistance(value, new Date(), { addSuffix: true, locale: locale })
        }

        return value;
      }
    },
    debug: process.env.NODE_ENV === 'development'
  });

export default i18next;