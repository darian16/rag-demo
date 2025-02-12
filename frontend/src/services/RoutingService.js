import {Component} from 'react'
//------------------------------------------------------------------------------------

class RoutingService extends Component {
    static getCurrentUrl() {
        return window.location.href;
    }

    static urlIsEqualTo(url) {
        return window.location.href === url;
    }

    static redirectHome() {
        window.location.assign('/');
    }

    static redirectTo(path) {
        window.location.assign(path);
    }

    static reload() {
        window.location.reload(true);
    }

    static isModule(module) {
        return (window.location.pathname.indexOf(module) === 0);
    }

    static urlContainsExactly(path) {
        return (
            window.location.pathname === (path) ||
            window.location.pathname === (path + '/')
        );
    }

    static urlContains(path) {
        return (
            window.location.href.indexOf(path) >= 0
        );
    }

    static urlContainsAny(tags) {
        let result = false;

        tags.split(',').forEach((x_tag) => {
            result = result || (window.location.href.indexOf(x_tag) >= 0);
        });

        return result;
    }

    static setPath(path) {
        window.history.pushState(null, null, path);
    }

    static getParamValue(name, default_value=null) {
        let url = new URL(window.location.href);
        let value = url.searchParams.get(name);
        if (!value) return default_value;

        return value;
    }

    static getCurrentQueryString() {
        return window.location.search;
    }

    static getQueryStringForRedirect(ignore_fields = null) {
        let parameters = window.location.search.replace('?', '').split("&");
        let query_string = "";

        parameters.forEach((x) => {
            let param_name = x.split('=')[0]

            if (param_name === "page") return;
            if (ignore_fields && ignore_fields.includes(param_name)) return;
            query_string += '&' + x;
        });

        return query_string;
    }

    static getBaseUrl() {
        return window.location.origin +
            window.location.pathname;
    }

    static getHash(default_value = null) {
        let hash = window.location.hash;
        if (!hash) return default_value;
        if (hash === '') return default_value;
        return decodeURI(hash.replace('#', ''));
    }

    static getHashAsDict(default_value=null) {
        let hash = window.location.hash;
        if (!hash) return default_value;

        hash = hash.replace('#app', '')
        if (hash === '') return default_value;

        var pieces = hash.replace('#', '').split("&"), data = {}, i, parts;

        for (i = 0; i < pieces.length; i++) {
            parts = pieces[i].split("=");
            if (parts.length < 2) {
                parts.push("");
            }

            data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }

        return data;
    }

    static buildHashParams(params_key_values) {
        let current_url_hash = RoutingService.getHash();
        let params = [];

        Object.keys(params_key_values).forEach(function(key) {
            if (params_key_values[key] && params_key_values[key].length > 0) {
                params.push(key + '=' + params_key_values[key])
            }
        });

        let new_url_hash = null;
        if (params.length > 0) new_url_hash = params.join('&');
        if (new_url_hash === current_url_hash) return null;

        if (!new_url_hash) new_url_hash = '';
        window.location.hash = '#' + new_url_hash;
        return new_url_hash;
    }

    static getHashParams() {
        let hash = RoutingService.getHash();
        if (!hash) return {};

        let params_list = hash.split('&');
        let params = {}

        params_list.forEach((x_param) => {
            x_param = x_param.split('=');
            if (x_param.length === 2) {
                params[x_param[0]] = x_param[1].split(',');
            }
        });

        return params;
    }

    static isAction(name) {
        name = name.split('|');
        let is_action = false;

        name.forEach((x) => {
            is_action = is_action || RoutingService.urlContains('#' + x);
        });

        return is_action;
    }

    static replaceHash(hash) {
        window.history.replaceState(undefined, undefined, '#' + hash);
    }
}

export default RoutingService;
