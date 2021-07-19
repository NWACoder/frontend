import Link from 'next/link';
import { Layout } from '../../components/Common/Layout';
import React, { useEffect, useState } from 'react';
import { SnippetCard } from '../../components/Dashboard/SnippetCard';
import { fetchUserSnippets } from '../../api/user/dashboard';
import { Snippet } from '../../types';

export default function Dashboard() {
    const [snippets, setSnippets] = useState<Snippet[]>([]);

    useEffect(() => {
        // TODO fetch user snippets
        const fetchSnippets = async () => {
            const data = await fetchUserSnippets();
            if (!data) return;
            setSnippets(data);
        };
        fetchSnippets();
    }, []);

    return (
        <Layout protectedRoute={true}>
            <main className="flex flex-col flex-grow items-center w-full text-center">

            	<div className="space-x-2">
            		<Link href="/user/create-snippet" >
                    <button className="bg-red-300 py-2 px-3 rounded text-black hover:bg-red-400">
                        Create Snippet
                    </button>
                </Link>
                <Link href="/user/create-challenge">
                    <button className=" bg-blue-300 py-2 px-3 rounded text-black hover:bg-blue-400">
                        Create Challenge
                    </button>
                </Link>
            	</div>
                

                <div className="flex flex-row flex-wrap justify-center">
                    {snippets.map((snippet) => (
                        <SnippetCard snippet={snippet} key={snippet._id} />
                    ))}
                </div>
            </main>
        </Layout>
    );
}
