import axios from 'axios';

export const API_URL = 'http://192.168.31.235:9000'

export const get = (endpoint) =>{
    const url = `${API_URL}/${endpoint}`;
    return axios.get(url);
}

export const post = (endpoint, data)=>{
    const url = `${API_URL}/${endpoint}`;
    return axios.post(url, data);
}