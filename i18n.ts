import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Load translations via HTTP
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Connect with React
  .init({
    fallbackLng: 'en', // Fallback language
    debug: true, // Show debug logs

    interpolation: {
      escapeValue: false, // React already escapes
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    supportedLngs: ['en', 'zh-TW'],
  });

export default i18n;
