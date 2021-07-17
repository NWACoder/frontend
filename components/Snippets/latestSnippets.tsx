import React, { useEffect, useState } from 'react';
import { getLatestSnippets } from '../../api/snippet';
import { Snippet } from '../../types';
import { ViewSnippet } from './ViewSnippet';

export const LatestSnippets = () => {
    const [state, setState] = useState<Snippet[]>([]);

    useEffect(() => {
        const latestSnippets = async () => {
            const res = await getLatestSnippets(9);
            if (!res) return;
            setState(res);
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
                    return <ViewSnippet key={item._id} snippet={item} />;
                })}
            </div>
        </div>
    );
};
