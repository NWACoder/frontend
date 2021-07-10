import axios from 'axios';

export const authAxios = () => {
    const token = localStorage.getItem('codeParcelUserToken');
    if (token === null) throw new Error('Unauthorized');
    return axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 1000,
        headers: { Authorization: `Bearer: ${token}` },
    });
};

export const nonAuthAxios = () => {
    return axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 1000,
    });
};
