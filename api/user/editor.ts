import { authAxios } from '../../lib/axios/';
import { Item, Snippet } from '../../types';

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
    const { title, tags, public: _public, _id, items } = snippet;
    try {
        const res = await authAxios().patch(`/snippets/${_id}`, {
            items,
            title,
            public: _public,
            tags,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createItem = async (item: Item) => {
    const { name, content } = item;
    try {
        const res = await authAxios().post(`/items`, {
            name,
            content,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const updateItem = async (item: Item) => {
    const { name, content, _id } = item;
    try {
        const res = await authAxios().patch(`/items/${_id}`, {
            name,
            content,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteItem = async (id: string) => {
    try {
        const res = await authAxios().delete(`/items/${id}`);
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
