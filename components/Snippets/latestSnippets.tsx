import React, { useEffect, useState } from 'react';
import { getLatestSnippets } from '../../api/snippet';
import { SnippetCard } from '../../components/Dashboard/SnippetCard';

export const LatestSnippets = () => {
    const [state, setState] = useState<any>([]);

    useEffect(() => {
        const latestSnippets = async () => {
            const res = await getLatestSnippets(9);

            setState([... res]);

        };
        latestSnippets();
    }, []);

    return (
        <div className="mt-4">
        	<div>
        		Latest Snippets
        	</div>
        	<div className="grid grid-cols-3 gap-4">
        		{ state.map( (item: any) => {
                	return (<SnippetCard key={item._id} files={1} forks={0} stars={0} title={item.title} author={item.user_id.username} />)
            	})}
        	</div>
        	
        </div>
    );
};
