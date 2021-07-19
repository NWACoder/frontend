import React, { useEffect, useState } from 'react';
import { getAllChallenges, searchtChallenge } from '../../api/challenge';
import { ListChallenge } from '../../components/Challenges/listChallenge';
import { Layout } from '../../components/Common/Layout';
import PageHeader from '../../components/Common/PageHeader';
import Search from '../../components/Search/search';

export default function Index() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const allChallenges = async () => {
            const res = await getAllChallenges();
            if (!res) return;
            setItems(res);
        };
        allChallenges();
    }, []);

    const handleSearch = async (query: string) => {
        const res = await searchtChallenge(query);
        if (!res) return;
        setItems(res);
    };

    return (
        <>
            <Layout>
                <main className="">
                    <PageHeader title="Challenges" />
                    <Search onSubmit={handleSearch} />

                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 ">
                        {items.map((item: any) => {
                            return (
                                <ListChallenge
                                    key={item._id}
                                    challenge={item}
                                />
                            );
                        })}
                    </div>
                </main>
            </Layout>
        </>
    );
}
