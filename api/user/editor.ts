import { authAxios } from '../../lib/axios/';
import { Snippet } from '../../types';

export const createSnippet = async (snippet: Snippet) => {
    const { title, tags, items, public: _public } = snippet;
    try {
        const res = await authAxios().post('/snippets', {
            title,
            items,
            public: _public,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchSnippet = async (id: string) => {
    try {
        const res = await authAxios().get(`/snippets/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
