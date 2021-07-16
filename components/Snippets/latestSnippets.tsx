import React, { useEffect, useState } from 'react';
import { getLatestSnippets } from '../../api/snippet';
import { SnippetCard } from '../../components/Dashboard/SnippetCard';
import { Snippet } from '../../types';

export const LatestSnippets = () => {
    const [state, setState] = useState<Snippet[]>([]);

    useEffect(() => {
        const latestSnippets = async () => {
            const res = await getLatestSnippets(9);

            setState([...res]);
        };
        latestSnippets();
    }, []);

    return (
        <div className="mt-4">
            <div className="text-2xl p-4 bg-blue-300 w-max my-2">
                Latest Snippets
            </div>
            <div className="grid grid-cols-3 gap-4">
                {state.map((item: any) => {
                    return <SnippetCard key={item._id} snippet={item} />;
                })}
            </div>
        </div>
    );
};
