import { Layout } from '../../components/Common/Layout';
import React, { useEffect, useState } from 'react';
import { getAllSnippets } from '../../api/snippet';
import { ViewSnippet } from '../../components/Snippets/ViewSnippet';
import Search from '../../components/Search/search';
import PageHeader from '../../components/Common/PageHeader';
import { searchtSnippet } from '../../api/snippet';

export default function Index() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const allChallenges = async () => {
            const res = await getAllSnippets();
            if (!res) return;
            setItems(res);
        };
        allChallenges();
    }, []);

    const handleSearch = async (query: string) => {
        const res = await searchtSnippet(query);
        if (!res) return;
        setItems(res);
    };

    return (
        <>
            <Layout>
                <main>
                    <PageHeader title="Snippets" />

                    <Search onSubmit={handleSearch} />

                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.map((item: any) => {
                            return (
                                <ViewSnippet key={item._id} snippet={item} />
                            );
                        })}
                    </div>
                </main>
            </Layout>
        </>
    );
}
