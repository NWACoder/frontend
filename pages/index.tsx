import { Layout } from '../components/Common/Layout';
import React from 'react';
import { CommunityStats } from '../components/site/community-stats';
import { Hero } from '../components/site/hero'

export default function Index() {

    return (
        <>
            <Layout>
                <main className="flex flex-col flex-grow items-center w-full text-center">
                    <Hero 
                    title="Browse and create code snippets" 
                    subtitle="Snippets are small pieces of code you don't need
                    to remember."
                    buttonText="Checkout our example"/>
                    <CommunityStats/>
                </main>
            </Layout>
        </>
    );
}
