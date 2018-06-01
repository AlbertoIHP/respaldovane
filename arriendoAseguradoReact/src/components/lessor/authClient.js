// in src/authClient.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'admin-on-rest';
import { BASE_URL } from '../Environment';
import axios from 'axios'

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        let email = username;

        return axios.post(BASE_URL + '/api/v1/login', {
            email,
            password
        })
            .then(response => {
                console.log(response);
                if(response.data.type!="lessor"){
                    return Promise.reject();
                }
                localStorage.setItem('lessortoken', response.data.token)
                return localStorage.setItem('role', response.data.type)


            })
            .then(() => {
                return Promise.resolve();

            })
            .catch(error => {
                console.log(error);
                
                return Promise.reject();
            });
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('lessortoken');
        localStorage.removeItem('role');

        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('lessortoken');
            localStorage.removeItem('role');

            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        const role = localStorage.getItem('role');

        return localStorage.getItem('lessortoken') ? Promise.resolve(role) : Promise.reject();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        return Promise.resolve(role);
    }
    return Promise.reject('Unknown method');
};