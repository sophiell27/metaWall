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
    debug: import.meta.env.MODE === 'development', // Show debug logs

    interpolation: {
      escapeValue: false, // React already escapes
    },

    backend: {
      loadPath: '/metaWall/locales/{{lng}}/translation.json',
    },
    supportedLngs: ['en', 'zh'],
    nonExplicitSupportedLngs: true,
  });
i18n.on('languageChanged', (lng) => {
  const supportedLngs = i18n.options.supportedLngs;
  if (!supportedLngs) return;
  if (!supportedLngs.includes(lng)) {
    const baseLang = lng.split('-')[0];
    const matchedLang = supportedLngs.find((lang) => lang.startsWith(baseLang));

    if (matchedLang) {
      i18n.changeLanguage(matchedLang);
    } else {
      i18n.changeLanguage(i18n.options.fallbackLng as string);
    }
  }
});

export default i18n;
