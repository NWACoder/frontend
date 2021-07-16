import React from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Common/Layout';
import { Snippet } from '../../types';
import { createSnippet } from '../../api/user/editor';
import { CodeEditor } from '../../components/CodeEditor';

export default function CreateSnippet() {
    const router = useRouter();

    const handleSubmit = async (snippet: Snippet) => {
        try {
            await createSnippet(snippet);
            router.push('/user/dashboard');
        } catch (error) {
            throw new Error('Unable to save snippet');
        }
    };

    return (
        <Layout protectedRoute={true}>
            <CodeEditor handleCreateSnippet={handleSubmit} />
        </Layout>
    );
}
