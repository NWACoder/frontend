import { authAxios, nonAuthAxios } from '../lib/axios';
import { Challenge } from '../types';
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

export const updateChallenge = async (challenge: Challenge) => {
    const { name,  _id, content } = challenge;
    try {
        const res = await authAxios().patch(`/challenges/${_id}`, {
            name,
            content,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateSolutions = async (challenge: Challenge) => {
    const { name,  _id, content, solutions } = challenge;
    try {
        const res = await authAxios().patch(`/challenges/${_id}`, {
            name,
            content,
            solutions
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteChallenge = async (id: string) => {
	try {
        const res = await authAxios().delete(`/challenges/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

