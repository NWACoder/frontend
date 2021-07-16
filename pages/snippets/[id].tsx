import { getSnippet } from '../../api/snippet';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Common/Layout';

export default function Snippet() {
    const router = useRouter();
    const [state, setState] = useState<any>({});

    useEffect(() => {
        const Snippet = async () => {
            const { id } = router.query;
            if (!id || Array.isArray(id)) {
                router.push('/snippets');
            } else {
                const res = await getSnippet(id);
                setState({ ...res });
            }
        };
        Snippet();
    }, []);

    const snippet = state;

    return (
        <>
            <Layout>{snippet.title}</Layout>
        </>
    );
}
