import React, { useEffect, useState } from "react";
import { getAllChallenges, searchtChallenge } from "../../api/challenge";
import { ListChallenge } from "../../components/Challenges/listChallenge";
import { Layout } from "../../components/Common/Layout";
import PageHeader from "../../components/Common/PageHeader";
import Search from "../../components/Search/search";

export default function Index() {
	const [state, setState] = useState<any>({ listItems: [] });
    const [search, setSearch] = useState<any>("");

    useEffect(() => {
        const AllChallenge = async () => {
            const res = await getAllChallenges();
            if (!res) return;
            setState({ listItems: res });
        };

        const searchtChallenges = async (query: string) => {
        	if(!query) return AllChallenge();
	        const res = await searchtChallenge(query);
	        if (!res) return;
	        setState({ listItems: res });
	    };

        searchtChallenges(search);
    }, [search]);

    const { listItems } = state;

    return (
        <>
            <Layout>
                <main className="">
                <PageHeader title="Challenges"/>
                <Search stateChanger={setSearch}/>

                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 ">
                        {listItems.map((item: any) => {
                            return <ListChallenge key={item._id} challenge={item} />;
                        })}
                    </div>

                </main>
            </Layout>
        </>
    );
}
