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
    let accessToken = localStorage.getItem('accessToken') || '';
    return {
        headers: {
            authorization: accessToken
        }
    };
};

const agent = async (path, data = {}, type = 'get') => {
    let res = null;
    if (type === 'get') {
        res = await axios.get(`${API_URL}${path}`, data, includeToken());
    } else {
        res = await axios.post(`${API_URL}${path}`, data, includeToken());
    }
    return res.data;
};

export default agent;