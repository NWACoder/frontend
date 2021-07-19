import { Layout } from '../../components/Common/Layout';
import React, { useEffect, useState } from 'react';
import { getAllSnippets } from '../../api/snippet';
import { ViewSnippet } from '../../components/Snippets/ViewSnippet';
import Search from '../../components/Search/search';
import PageHeader from '../../components/Common/PageHeader';
import { searchtSnippet } from '../../api/snippet';

export default function Index() {
    const [state, setState] = useState<any>({ listItems: [] });
    const [search, setSearch] = useState<any>("");

    useEffect(() => {
        const allSnippets = async () => {
            const res = await getAllSnippets();
            if (!res) return;
            setState({ listItems: res });
        };

        const searchtSnippets = async (query: string) => {
        	if(!query) return allSnippets();
	        const res = await searchtSnippet(query);
	        if (!res) return;
	        setState({ listItems: res });
	    };

    	searchtSnippets(search);
    }, [search]);





    const { listItems } = state;

    return (
        <>
            <Layout>
                <main>
                    <PageHeader title="Snippets" />

                    <Search stateChanger={setSearch}/>

                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                        {listItems.map((item: any) => {
                            return <ViewSnippet key={item._id} snippet={item} />;
                        })}
                    </div>
                </main>
            </Layout>
        </>
    );
}
