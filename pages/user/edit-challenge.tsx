import React, { useState } from 'react';
import { Layout } from '../../components/Common/Layout';
import { deleteChallenge, getChallenge, updateChallenge } from '../../api/challenge';
import PageHeader from '../../components/Common/PageHeader';
import MarkdownPreview from '../../components/CodeEditor/MarkdownPreview';
import CodeEditor from '@monaco-editor/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import router from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {

	if (!context.query.id || Array.isArray(context.query.id)) {
	    return { redirect: {permanent: false, destination: '/challenges',}, props: {},}
	} else {
	    const data = await getChallenge(context.query.id);
	    if(!data) return { redirect: {permanent: false, destination: '/challenges',}, props: {},}
	    return { props: { data } }
	}
}

export default function challenge({data} : InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [challenge, setChallenge] = useState({ });
    const [mode, setMode] = useState<any>(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleUpdate = async () => {

    	const newData = {
    		_id: data._id,
    		// @ts-ignore
    		name: challenge.name,
    		// @ts-ignore
    		content: challenge.content
    	}
    	const res = await updateChallenge(newData);
        if (!res) return;
    }

    const handleDelete = async () => {
        if (!data) return;
        await deleteChallenge(data._id);
        router.push('/user/dashboard');
    };

    return (
        <Layout>
        	<PageHeader title="Update Challenge" />

            <input
                placeholder="Challenge Title"
                className="outline-none"
                value={data.name}
                onChange={(e) => {
                	data.name = e.target.value
                    setChallenge({name: e.target.value})
                }}
            />
            <button
                onClick={() => {
                    setMode(!mode);
                }}
            >
                Preview Markdown
            </button>
            <div className="h-96 py-2 bg-white border-8 border-gray-300">
                <div className={`h-full ${mode === false ? '' : 'hidden'}`}>
                    <CodeEditor
                        value={data.content}
                        language="Markdown"
                        options={{ minimap: { enabled: false } }}
                        onChange={(value) => {
                        	data.content = value;
                            setChallenge({content: value})
                        }}
                        saveViewState={false}
                    />
                </div>
                {mode === true && <MarkdownPreview content={data.content} />}
            </div>
            <button
                onClick={handleUpdate}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
                Update
            </button>

            <button
                onClick={() => setDeleteModal(true)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
            >
                Delete

            </button>

           
                {deleteModal && (
                <DeleteModal
                    title="Delete Snippet?"
                    closeHandler={() => setDeleteModal(false)}
                    handleDelete={() => handleDelete()}
                />
            )}


        </Layout>
    );
}


interface DeleteModal {
    title: string;
    closeHandler: React.MouseEventHandler;
    handleDelete: React.MouseEventHandler;
}

const DeleteModal = ({ handleDelete, closeHandler, title }: DeleteModal) => {
    return (
        <div className="absolute top-0 h-full w-full z-10">
            <div className="min-h-full w-full" onClick={closeHandler} />
            <div className="fixed top-1/4 w-full mx-auto">
                <div className="relative bg-gray-50 bg-opacity-90 rounded-md max-w-md mx-auto shadow-md overflow-hidden pb-4">
                    <div className="relative py-3 mx-6 grid grid-cols-3 grid-rows-1 h-20 justify-items-center">
                        <div className="text-center text-3xl col-start-2 whitespace-nowrap">
                            {title}
                        </div>
                        <div className="ml-auto">
                            <div
                                className="w-9 h-9 hover:bg-gray-400 hover:shadow-md active:shadow-inner-md p-2 rounded cursor-pointer"
                                onClick={closeHandler}
                            >
                                <svg
                                    viewBox="0 0 329.26933 329"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 flex flex-row justify-between">
                        <button
                            className="focus:outline-none bg-red-300 hover:bg-red-400 rounded-md py-2 px-3 w-48 font-semibold"
                            type="button"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button
                            className="focus:outline-none bg-blue-300 hover:bg-blue-400 rounded-md py-2 px-3 w-48 font-semibold"
                            type="button"
                            onClick={closeHandler}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
