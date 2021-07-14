import React, { useEffect, useState } from 'react';
import { IndexState } from '../../types';
import { getCommunityStats } from '../../api/site/stats';

export const CommunityStats = () => {
    const [state, setState] = useState<IndexState>({
        Users: 0,
        Snippets: 0,
        Challenges: 0,
    });

    useEffect(() => {
        const communityStats = async () => {
            const data = await getCommunityStats();
            if (!data) return;
            setState(data.value);
        };
        communityStats();
    }, []);

    const { Users, Snippets, Challenges } = state;

    return (
        <div className="mt-16">
            <div className="text-2xl font-thin sm:my-8">Community Stats</div>
            <div className="sm:flex sm:flex-row sm:flex-wrap">
                <div className="sm:border-r sm:border-b-0 sm:px-16 sm:py-0 py-8 border-b max-w-max mx-auto">
                    <div className="text-2xl font-semibold">{Users}</div>
                    <div className="font-thin mt-2">Users</div>
                </div>
                <div className="sm:border-r sm:border-b-0 sm:px-16 sm:py-0 py-8 border-b max-w-max mx-auto">
                    <div className="text-2xl font-semibold">{Snippets}</div>
                    <div className="font-thin mt-2">Snippets</div>
                </div>
                <div className="sm:px-16 sm:py-0 py-8 max-w-max mx-auto">
                    <div className="text-2xl font-semibold">{Challenges}</div>
                    <div className="font-thin mt-2">Q&A</div>
                </div>
            </div>
        </div>
    );
};
