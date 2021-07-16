import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Common/Layout';
import { Snippet } from '../../types';
import { fetchSnippet, updateSnippet } from '../../api/user/editor';
import { CodeEditor } from '../../components/CodeEditor';
import { useRouter } from 'next/router';

export default function EditSnippet() {
    const [snippet, setSnippet] = useState<Snippet | undefined>(undefined);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetch = async () => {
            if (!router.isReady) return;
            if (!id || Array.isArray(id)) {
                router.replace('/');
            } else {
                const data = await fetchSnippet(id);
                if (!data) router.replace('/');
                setSnippet(data);
            }
        };
        fetch();
    }, [id]);

    const handleSubmit = async (snippet: Snippet) => {
        try {
            await updateSnippet(snippet);
            router.push('/user/dashboard');
        } catch (error) {
            throw new Error('Unable to save snippet');
        }
    };

    return (
        <Layout protectedRoute={true}>
            <CodeEditor handleCreateSnippet={handleSubmit} snippet={snippet} />
        </Layout>
    );
}
