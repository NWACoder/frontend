import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { getChallenge } from '../../api/challenge';
import { fetchUserSnippets } from '../../api/user/dashboard';
const MarkdownPreview = dynamic(
    () => import('../../components/CodeEditor/MarkdownPreview')
);
import { Layout } from '../../components/Common/Layout';
import PageHeader from '../../components/Common/PageHeader';
import { ViewSnippet } from '../../components/Snippets/ViewSnippet';

export const getServerSideProps: GetServerSideProps = async (context) => {

	if (!context.query.id || Array.isArray(context.query.id)) {
	    return { redirect: {permanent: false, destination: '/challenges',}, props: {},}
	} else {
	    const res = await getChallenge(context.query.id);
	    if(!res) return { redirect: {permanent: false, destination: '/challenges',}, props: {},}
	    return { props: { res } }
	}
}

export default function Challenge({res} : InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [solutionModal, setSolutionModal] = useState(false);

    const handleAttach = () => {

    }


    const [state, setState] = useState([]);

	useEffect(() => {}, []);


        const fetch = async () => {
            const res = await fetchUserSnippets();
            if (!res) return;
            setState(res);
        };
        fetch();
    

        console.log(res)
    return (
        <>
            <Layout>
                <PageHeader title={res.name} />
                <MarkdownPreview content={res.content} />


                {res.solutions.map((item: any) => {
                           return (
                                <ViewSnippet key={item._id} snippet={item} />
                            );
                            
                        })}


                 <button
                	onClick={() => setSolutionModal(true)}
					className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
					>
					Attach Snippet Solution
					</button>

					{solutionModal && (
						<>
               	 		{state.map((item: any) => {
                           return (
                                <ViewSnippet key={item._id} snippet={item} />
                            );
                            
                        })}
               	 </>

            )}
            </Layout>
        </>
    );
}
