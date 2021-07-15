import { Layout } from '../components/Common/Layout';
import React from 'react';
import { CommunityStats } from '../components/site/community-stats';
import { Hero } from '../components/site/hero'
import { LatestSnippets } from '../components/Snippets/latestSnippets';
import NewsLetter from '../components/Common/NewsLetter';

export default function Index() {
	
	const heroData = {
	    title: "Browse and create code snippets",
	    subtitle: "Snippets are small pieces of code you don't need to remember.",
	    buttonText: "Checkout our example"
	}

    return (
        <>
            <Layout>
                <main className="">
                    <Hero { ... heroData}/>
                    <CommunityStats/>
                    {<LatestSnippets/>}
                    <NewsLetter/>
                </main>
            </Layout>
        </>
    );
}
