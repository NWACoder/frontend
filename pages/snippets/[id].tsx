import { getSnippet } from '../../api/snippet';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Common/Layout';
import { Snippet as SnippetType } from '../../types';
import { CodeViewer } from '../../components/CodeEditor/CodeViewer';

export default function Snippet() {
    const router = useRouter();
    const [snippet, setSnippet] = useState<SnippetType | undefined>();
    const { id } = router.query;

    useEffect(() => {
        const fetch = async () => {
            if (!router.isReady) return;
            if (!id || Array.isArray(id)) {
                router.replace('/');
            } else {
                const data = await getSnippet(id);
                if (!data) router.replace('/');
                setSnippet(data);
            }
        };
        fetch();
    }, [id]);

    return (
        <Layout>
            <CodeViewer snippet={snippet} />
        </Layout>
    );
}
