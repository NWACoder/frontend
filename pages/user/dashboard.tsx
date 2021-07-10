import Link from 'next/link';
import { Layout } from '../../components/Common/Layout';
import React, { useEffect, useState } from 'react';
import { SnippetCard } from '../../components/Dashboard/SnippetCard';

export default function Index() {
    useEffect(() => {
        // TODO fetch user snippets
    }, []);

    return (
        <Layout protectedRoute={true}>
            <main className="flex flex-col flex-grow items-center w-full text-center">
                <button className="flex bg-red-300 py-2 px-3 rounded text-black hover:bg-red-400">
                    Create Snippet
                </button>
                <div className="flex flex-row flex-wrap justify-center">
                    <SnippetCard
                        files={1}
                        forks={0}
                        stars={0}
                        title={'Title'}
                        author="author"
                    />
                    <SnippetCard
                        files={1}
                        forks={0}
                        stars={0}
                        title={'Title'}
                        author="author"
                    />
                    <SnippetCard
                        files={1}
                        forks={0}
                        stars={0}
                        title={'Title'}
                        author="author"
                    />
                    <SnippetCard
                        files={1}
                        forks={0}
                        stars={0}
                        title={'Title'}
                        author="author"
                    />
                </div>
            </main>
        </Layout>
    );
}
