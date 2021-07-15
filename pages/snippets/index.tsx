import { Layout } from '../../components/Common/Layout';
import React, { useEffect, useState } from 'react';
import { getAllSnippets } from '../../api/snippet';
import { SnippetCard } from '../../components/Dashboard/SnippetCard';

export default function Index() {

	const [state, setState] = useState<any>({ listItems: [] });

	useEffect(() => {
	    const allSnippets = async () => {
	    	const res = await getAllSnippets();
	    	setState({ listItems: res});
	    };
	    allSnippets();
	}, []);

	const {listItems} = state;
    return (
        <>
            <Layout> 
                <main className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                { listItems.map( (item: any) => {
                	return (<SnippetCard key={item._id} files={1} forks={0} stars={0} title={item.title} author={item.user_id.username} />)
            	})}
                </main>
            </Layout>
        </>
    );
}
