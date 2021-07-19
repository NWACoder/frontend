import Link from 'next/link';
import { Layout } from '../../components/Common/Layout';
import React, { useEffect, useState } from 'react';
import { SnippetCard } from '../../components/Dashboard/SnippetCard';
import { fetchUserSnippets } from '../../api/user/dashboard';
import { Snippet } from '../../types';
import { getUserChallenges } from '../../api/challenge';
import { ListChallenge } from '../../components/Challenges/listChallenge';

export default function Dashboard() {
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [challenges, setChallenges] = useState<Snippet[]>([]);


    useEffect(() => {
        const fetchSnippets = async () => {
            const data = await fetchUserSnippets();
            if (!data) return;
            setSnippets(data);
        };
        const fetchChallenges = async () => {
            const data = await getUserChallenges();
            if (!data) return;
            setChallenges(data);
        };
        fetchSnippets();
        fetchChallenges();
    }, []);

    return (
        <Layout protectedRoute={true}>
            <main className="w-full text-center mt-4">

            	<div className="grid grid-cols-2 gap-4">

            		<div className="">
	            		<Link href="/user/create-snippet" >
	                    <button className="bg-red-300 py-2 px-3 rounded text-black hover:bg-red-400">
	                        Create Snippet
	                    </button>
	                	</Link>
	                    {snippets.map((snippet) => (
	                        <SnippetCard snippet={snippet} key={snippet._id} />
	                    ))}
	                </div>
	                <div className="">
	                	<Link href="/user/create-challenge">
		                    <button className=" bg-blue-300 py-2 px-3 rounded text-black hover:bg-blue-400">
		                        Create Challenge
		                    </button>
		                </Link>
	                    {challenges.map((item) => (
	                        <ListChallenge key={item._id} challenge={item} />
	                    ))}
	                </div>
            	</div>
                
            </main>
        </Layout>
    );
}
