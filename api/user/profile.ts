import { authAxios, nonAuthAxios } from '../../lib/axios/';

export const getUserProfile = async (userName: string) => {
    try {
        const response = await nonAuthAxios().get(`users/profile/${userName}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get username');
    }
};

export const editUserProfile = async (about: string) => {
    try {
        const response = await authAxios().patch(`users/profile/${about}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get about');
    }
}