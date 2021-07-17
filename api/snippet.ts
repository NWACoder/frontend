import { nonAuthAxios } from '../lib/axios';

export const getAllSnippets = async () => {
    try {
        const response = await nonAuthAxios().get(`snippets`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch snippets');
    }
};

export const getLatestSnippets = async (size: number) => {
    try {
        const response = await nonAuthAxios().get(
            `snippets/latest?size=${size}`
        );
        return response.data;
    } catch (error) {
        console.error('Failed to fetch latest snippets');
    }
};

export const getSnippet = async (id: string) => {
    try {
        const response = await nonAuthAxios().get(`snippets/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch snippet ID:${id}`);
    }
};
