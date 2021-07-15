import React from 'react';
import { Layout } from '../../components/Common/Layout';
import { Snippet } from '../../types';
import { createSnippet } from '../../api/user/editor';
import { CodeEditor } from '../../components/CodeEditor';

export default function CreateSnippet() {
    const handleSubmit = async (snippet: Snippet) => {
        const res = await createSnippet(snippet);
        console.log(res);
    };

    return (
        <Layout protectedRoute={true}>
            <CodeEditor handleCreateSnippet={handleSubmit} />
        </Layout>
    );
}
