import { nonAuthAxios } from '../lib/axios'

export const getAllSnippets = async () => {
    try {
		const response = await nonAuthAxios().get(`snippets`);
		return response.data;
    } catch (error) {
		console.error(error);
    }
};


export const getLatestSnippets = async (size: number) => {
    try {
		const response = await nonAuthAxios().get(`snippets/latest?size=${size}`);
		return response.data;
    } catch (error) {
		console.error(error);
    }
};
