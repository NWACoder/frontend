import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
export const authAxios = () => {
    const token = localStorage.getItem('codeParcelUserToken');
    if (token === null) throw new Error('Unauthorized');
    return axios.create({
        baseURL,
        timeout: 1000,
        headers: { Authorization: `Bearer: ${token}` },
    });
};

export const nonAuthAxios = () => {
    return axios.create({
        baseURL,
        timeout: 1000,
    });
};
