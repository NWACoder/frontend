import React from "react";
import { Layout } from "../../components/Common/Layout";
import PageHeader from "../../components/Common/PageHeader";
import Search from "../../components/Search/search";

export default function Index() {
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
