import { authAxios } from '../../lib/axios/';

export const fetchUserSnippets = async () => {
    try {
        const res = await authAxios().get('/snippets/user');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
