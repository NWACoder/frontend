import { authAxios } from '../../lib/axios/';
import { Snippet } from '../../types';

export const createSnippet = async (snippet: Snippet) => {
    const { title, tags, items, public: _public } = snippet;
    try {
        const res = await authAxios().post('/snippets', {
            title,
            items,
            public: _public,
            tags,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateSnippet = async (snippet: Snippet) => {
    const { title, tags, items, public: _public, _id } = snippet;
	console.log(items)
    try {
        const res = await authAxios().patch(`/snippets/${_id}`, {
            title,
            items,
            public: _public,
            tags,
        });
		console.log(res.data)
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
