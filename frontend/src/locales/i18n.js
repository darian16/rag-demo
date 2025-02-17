import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import CookieService from "services/CookieService";
import es from 'locales/es';

i18n
    .use(initReactI18next)
    .init({
        lng: CookieService.getLocale(),
        fallbackLng: "en",
        keySeparator: false,
        interpolation: { escapeValue: false },

        resources: {
            es
        },
    });
