import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getChallenge, updateSolutions } from '../../api/challenge';
import { fetchUserSnippets } from '../../api/user/dashboard';
const MarkdownPreview = dynamic(
    () => import('../../components/CodeEditor/MarkdownPreview')
);
import { Layout } from '../../components/Common/Layout';
import PageHeader from '../../components/Common/PageHeader';
import { ViewSnippet } from '../../components/Snippets/ViewSnippet';
import { useAuth } from '../../lib/context/useAuth';

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
	const router = useRouter();
    const [solutionModal, setSolutionModal] = useState(false);

    const handleAttach = async (id:string) => {

    	if(res.solutions.filter(e => e._id === id).length > 0) return

    	res.solutions = [...res.solutions, id]
    	const newData = res
    	const data = await updateSolutions(newData);
       	if (!data) return;
       	router.reload()
    }

    const auth = useAuth();

    const { user } = auth;

    const [state, setState] = useState([]);

	useEffect(() => {
		const fetch = async () => {
            const data = await fetchUserSnippets();
            if (!data) return;
            setState(data);
        };
        fetch();
	}, [solutionModal]);

    return (
        <>
            <Layout>
                <PageHeader title={res.name} />
                <MarkdownPreview content={res.content} />

                { user && (

            	<div className="my-8">
            		<button onClick={() => setSolutionModal(!solutionModal)}
					className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none">
					Attach Snippet Solution
					</button>
					<div className={`overflow-scroll grid grid-cols-2 gap-4 ${solutionModal === false ? 'h-0' : 'h-40'}`}>
					{solutionModal && (
						<>
	           	 		{state.map((item: any) => {
	                       return ( <div className="my-4" key={item._id}>
	                        <ViewSnippet  snippet={item} />
	                        <button onClick={ () => handleAttach(item._id) }
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none">
							Attach Snippet
							</button>
	                        </div> );
	                    })}
	           			</>
	        		)}
	        		</div>

            	</div>

            	)}

            	<div className="text-2xl p-4 bg-blue-300 w-max my-2 mt-8">
					Snippet Solutions
            	</div>
            	<div className="grid grid-cols-3 gap-4">
                	{res.solutions.map((item: any) => {
                       	return ( <ViewSnippet key={item._id} snippet={item} /> );
                    })}
                </div>

                
            </Layout>
        </>
    );
}
