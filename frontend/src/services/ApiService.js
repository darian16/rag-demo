import {Component} from 'react'
import axios from 'axios';

import RoutingService from "./RoutingService";

class ApiService extends Component {
    static active_requests_exits = {};
    static pending_requests = {};

    static execPendingRequests(t, service_url) {
        if (!ApiService.pending_requests[service_url]) return;

        let request_data = ApiService.pending_requests[service_url];
        ApiService.pending_requests[service_url] = null;

        if (request_data.method === 'get') {
            ApiService.requestEndpoint(t, request_data.service_url, request_data.endpoint, request_data.onSuccess, request_data.onError);
            return;
        }

        if (request_data.method === 'post') {
            ApiService.postEndpoint(t, request_data.service_url, request_data.endpoint, request_data.data, request_data.onSuccess, request_data.onError);
            return;
        }

        if (request_data.method === 'delete') {
            ApiService.deleteEndpoint(t, request_data.service_url, request_data.endpoint, request_data.onSuccess, request_data.onError);
            return;
        }
    }

    static requestEndpoint(t, service_url, endpoint, onSuccess, onError=null) {
        if (ApiService.active_requests_exits[service_url] || ApiService.pending_requests[service_url]) {
            // If active request exists, the next request will be pending...
            // or
            // If pending requests exists, pending requests is updated...
            // So, after active request is finished, only the last one pending will be executed...
            ApiService.pending_requests[service_url] = {method: 'get', endpoint: endpoint, onSuccess: onSuccess, onError: onError, service_url: service_url}
            return;
        }

        ApiService.active_requests_exits[service_url] = true;

        axios.get(service_url + '/' + endpoint, {
            headers: {
                'project': RoutingService.getProjectFromUrl().toUpperCase(),
                'app-token': window.env.GENERIC_BACKEND_RAILS_AI_AGENT_APP_TOKEN,
                'token': RoutingService.getParamValue('token')
            }
        })
        .then(response => {
            ApiService.active_requests_exits[service_url] = false;
            if (ApiService.pending_requests[service_url]) return;

            onSuccess(response.data);
        })
        .catch((error) => {
            ApiService.active_requests_exits[service_url] = false;

            if (ApiService.pending_requests[service_url]) return;

            if (onError) {
                let message = null;
                if (error.response) message = error.response.data;
                else message = error.message;

                if (message["error"]) message = message["error"];
                if (message.error) message = message.error;

                onError(error.response.status, message);
            }

            console.error(error);
        })
        .then(() => {
            ApiService.execPendingRequests(t, service_url);
        });
    }

    static postEndpoint(t, service_url, endpoint, data, onSuccess, onError=null) {
        if (ApiService.active_requests_exits[service_url] || ApiService.pending_requests[service_url]) {
            // See comments on requestEndpoint function...
            ApiService.pending_requests[service_url] = {method: 'post', endpoint: endpoint, data: data, onSuccess: onSuccess, onError: onError, service_url: service_url}
            return;
        }

        ApiService.active_requests_exits[service_url] = true;

        axios.post(service_url + '/' + endpoint, data, {
            headers: {
                'project': RoutingService.getProjectFromUrl().toUpperCase(),
                'app-token': window.env.GENERIC_BACKEND_RAILS_AI_AGENT_APP_TOKEN,
                'token': RoutingService.getParamValue('token')
            }
        })
        .then(response => {
            ApiService.active_requests_exits[service_url] = false;
            if (ApiService.pending_requests[service_url]) return;

            onSuccess(response.data);
        })
        .catch((error) => {
            ApiService.active_requests_exits[service_url] = false;
            if (ApiService.pending_requests[service_url]) return;

            if (onError) {
                if (error.response) onError(error.response.status, error.response.data);
                else onError(error.status, error.message);
            }

            console.error(error);
        })
        .then(() => {
            ApiService.execPendingRequests(t, service_url);
        });
    }

    static deleteEndpoint(t, service_url, endpoint, onSuccess, onError=null) {
        if (ApiService.active_requests_exits[service_url] || ApiService.pending_requests[service_url]) {
            // See comments on requestEndpoint function...
            ApiService.pending_requests[service_url] = {method: 'delete', endpoint: endpoint, onSuccess: onSuccess, onError: onError, service_url: service_url}
            return;
        }

        ApiService.active_requests_exits[service_url] = true;

        axios.delete(service_url + '/' + endpoint, {
            headers: {
                'project': RoutingService.getProjectFromUrl().toUpperCase(),
                'app-token': window.env.GENERIC_BACKEND_RAILS_AI_AGENT_APP_TOKEN,
                'token': RoutingService.getParamValue('token')
            }
        })
        .then(response => {
            ApiService.active_requests_exits[service_url] = false;
            if (ApiService.pending_requests[service_url]) return;

            onSuccess(response.data);
        })
        .catch((error) => {
            ApiService.active_requests_exits[service_url] = false;
            if (ApiService.pending_requests[service_url]) return;

            if (onError) {
                if (error.response) onError(error.response.status, error.response.data);
                else onError(error.status, error.message);
            }

            console.error(error);
        })
        .then(() => {
            ApiService.execPendingRequests(t, service_url);
        });
    }
}

export default ApiService;
