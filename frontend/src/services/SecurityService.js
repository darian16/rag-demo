import {Component} from 'react'
//------------------------------------------------------------------------------------

import RoutingService from "./RoutingService";
//------------------------------------------------------------------------------------

class SecurityService extends Component {
    static acl = {
        error404: { path: '/error404', auth: false, namespace: 'error_pages' },
        home: { path: '/', auth: false, namespace: 'app' }
    };

    static protectByAcl(action) {
        let url = null;
        let acl = SecurityService.acl;

        for (let key in acl) {
            let path = acl[key].path

            if (path.indexOf(':id') >= 0) {
                //Tiene parámetros...
                path = path.replace('/:id', '');

                if (RoutingService.urlContains(path)) {
                    url = acl[key];
                    break;
                }                
            }
            else {
                if (RoutingService.urlContainsExactly(path)) {
                    url = acl[key];
                    break;
                } 
            }
        }

        if (!url) return RoutingService.redirectTo(acl.error404.path);

        action();
    }
}

export default SecurityService;
