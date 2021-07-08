import Link from 'next/link';
import { Layout } from '../../components/Common/Layout';
import React, { useEffect, useState } from 'react';
import { SnippetCard } from '../../components/Dashboard/SnippetCard';

export default function Index() {
    useEffect(() => {
        // TODO fetch user snippets
    }, []);

    return (
        <Layout>
            <main className="flex flex-col flex-grow items-center w-full text-center">
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
            </main>
        </Layout>
    );
}
