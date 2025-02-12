import {Component} from 'react'
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
//------------------------------------------------------------------------------------

import RoutingService from "./RoutingService";
//------------------------------------------------------------------------------------

class CookieService extends Component {
    static getVersion() {
        return 'ai-agent-2025-01-15';
    }

    static localStorageIsEnabled() {
        try {
          localStorage.getItem('local-storage-enabled');
        } 
        catch (e) {
            return false;
        }

        return true;
    }

    static getCookieSessionName(name) {
        return CookieService.getVersion() + "-" + name;
    }

    static getCookie(name, default_value=null) {
        if (!localStorage) return null;

        name = CookieService.getCookieSessionName(name);

        let value = localStorage.getItem(name);
        if (value == null) return default_value;

        value = CryptoAES.decrypt(value, window.env.GENERIC_FRONTEND_REACTJS_AI_AGENT_ENCRYPT_KEY);
        value = value.toString(CryptoENC);
        return value;
    }

    static setCookie(name, value, is_permanent) {
        if (!localStorage) return;

        name = CookieService.getCookieSessionName(name);

        value = CryptoAES.encrypt(value, window.env.GENERIC_FRONTEND_REACTJS_AI_AGENT_ENCRYPT_KEY);
        localStorage.setItem(name, value);

        // Si no es permanente, se guarda una bandera indicando
        // que esta variable es de tipo session_storage...
        // Si es permanente, se elimina la bandera y queda con el funcionamiento por defecto.
        if (is_permanent) localStorage.removeItem("session_storage_" + name);
        else localStorage.setItem("session_storage_" + name, "default");
    }

    static removeCookie(name) {
        if (!localStorage) return;

        name = CookieService.getCookieSessionName(name);
        localStorage.removeItem(name);
        localStorage.removeItem("session_storage_" + name);
    }

    static clearSessionStorage() {
        if (!localStorage) return;

        let keys = Object.keys(localStorage);

        keys.forEach((key) => {
            if (localStorage.getItem("session_storage_" + key)) {
                localStorage.removeItem(key);
                localStorage.removeItem("session_storage_" + key);
            }
        });
    }

    static getLocale() {
        let locale = RoutingService.getParamValue('locale')
        if (locale) return locale;

        locale = 'en';
        if (!localStorage) return locale;

        locale = CookieService.getCookie('user_locale', locale);
        if (locale === '') locale = 'en';

        return locale;
    }

    static setLocale(locale) {
        if (!localStorage) return;
        CookieService.setCookie('user_locale', locale, true);
    }

    static isFirstLoad() {
        return (
            CookieService.getCookie('user_first_load') == null ||
            CookieService.getCookie('user_first_load') === '' ||
            CookieService.getCookie('user_first_load') === undefined
        );
    }

    static systemHasLoad() {
        CookieService.setCookie('user_first_load', 'true');
    }

    static getSmallAndTemporalCookie(name, default_value=null) {
        name = CookieService.getVersion() + name;
        let value = sessionStorage.getItem(name);
        if (!value) return default_value;

        return value;
    }

    static setSmallAndTemporalCookie(name, value) {
        name = CookieService.getVersion() + name;
        sessionStorage.setItem(name, value);
    }    
}

export default CookieService;
