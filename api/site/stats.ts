import { nonAuthAxios } from '../../lib/axios'

export const getCommunityStats = async () => {
    try {
		const response = await nonAuthAxios().get(`site/community-stats`);
		return response.data;
    } catch (error) {
		console.error(error);
    }
};
