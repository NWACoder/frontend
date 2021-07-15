import { Layout } from '../../components/Common/Layout';
import React, { useEffect, useState } from 'react';
import { getAllSnippets } from '../../api/snippet';
import { SnippetCard } from '../../components/Dashboard/SnippetCard';
import Search from '../../components/Search/search';
import PageHeader from '../../components/Common/PageHeader';

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
                <main>

                <PageHeader title="Snippets"/>

                <Search/>

                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                	{ listItems.map( (item: any) => {
                	return (<SnippetCard key={item._id} id={item._id} files={1} forks={0} stars={0} title={item.title} author={item.user_id.username} />)
            	})}
                </div>
                
                </main>
            </Layout>
        </>
    );
}
