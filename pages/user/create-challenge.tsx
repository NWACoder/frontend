import React, { useState } from 'react';
import { Layout } from '../../components/Common/Layout';
import CodeEditor from '@monaco-editor/react';
const MarkdownPreview = dynamic(
    () => import('../../components/CodeEditor/MarkdownPreview')
);
import PageHeader from '../../components/Common/PageHeader';
import { createChallenge } from '../../api/challenge';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

export default function CreateSnippet() {
    const [mode, setMode] = useState<any>(false);
    const [content, setContent] = useState<any>('');
    const [title, setTitle] = useState<any>('');
    const router = useRouter();

    const createaChallenge = async () => {
        let data = {
            name: title,
            content: content,
            solutions: [],
        };

        const res = await createChallenge(data);
        if (!res) return;
        router.push('/user/dashboard');
    };

    return (
        <Layout protectedRoute={true}>
            <PageHeader title="Create Challenge" />
            <input
                placeholder="Challenge Title"
                className="outline-none"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
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
                        value={content}
                        language="Markdown"
                        options={{ minimap: { enabled: false } }}
                        onChange={(value) => {
                            setContent(value);
                        }}
                        saveViewState={false}
                    />
                </div>
                {mode === true && <MarkdownPreview content={content} />}
            </div>
            <button
                onClick={createaChallenge}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
                Create
            </button>
        </Layout>
    );
}
