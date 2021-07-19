import { authAxios, nonAuthAxios } from '../lib/axios';
// @ts-ignore
export const createChallenge = async (data) => {
    try {
        const response = await authAxios().post(`challenges`,data);
        return response.data;
    } catch (error) {
        console.error('Failed to create Challenge');
    }
};

export const getAllChallenges = async () => {
    try {
        const response = await nonAuthAxios().get(`challenges`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Challenges');
    }
};

export const getUserChallenges = async () => {
    try {
        const response = await authAxios().get(`challenges/user`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Challenges');
    }
};

export const searchtChallenge = async (query: string) => {
    try {
        const response = await nonAuthAxios().get(`challenges/search?query=${query}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to search Challenges`);
    }
};

export const getChallenge = async (id: string) => {
    try {
        const response = await nonAuthAxios().get(`challenges/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch snippet ID:${id}`);
    }
};