import axios from 'axios';
import constants from './constants';
import base64 from 'base-64';

const API_URL = constants.API_URL;

export const isLoggedIn = () => {
    let accessToken = localStorage.getItem('accessToken') || '';
    try {
        let accessTokenBody = accessToken.split('.')[1];
        let accessTokenClaims = JSON.parse(base64.decode(accessTokenBody));
        if (accessTokenClaims.exp >= Date.now() / 1000) {
            // check if its user or admin
            let role = accessTokenClaims.role || '';
            return role;
        }
        return false;
    } catch (e) {
        return false;
    }
};

const includeToken = () => {
    let accessToken = `token ${localStorage.getItem('accessToken')}` || '';
    return {
        headers: {
            'Authorization': accessToken
        }
    };
};

const agent = async (path, data = {}, type = 'get') => {
    let res = null;
    if (type === 'get') {
        let config = includeToken();
        config.params = data;
        res = await axios.get(`${API_URL}${path}`, config);
    } else {
        let config = includeToken();
        res = await axios.post(`${API_URL}${path}`, data, config);
    }
    return res.data;
};

export default agent;

export const AuthAgent = {
    loginUser: data => agent('/auth/user', data, 'post'),
    loginAdmin: data => agent('/auth/admin', data, 'post') 
};

export const UserAgent = {
    get: data => agent('/secure/user/profile', data, 'get'),
    update: data => agent('/secure/user/profile', data, 'post'),
    register: data => agent('/secure/user/signup', data, 'post'),
    changePassword: data => agent('/secure/user/change-password', data, 'post')
};