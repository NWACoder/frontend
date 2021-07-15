import React from "react";
import { Layout } from "../../components/Common/Layout";
import PageHeader from "../../components/Common/PageHeader";
import Search from "../../components/Search/search";

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
                <PageHeader title="Challenges"/>
                <Search/>
                
                </main>
            </Layout>
        </>
    );
}
