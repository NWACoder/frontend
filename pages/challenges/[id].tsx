import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getChallenge } from '../../api/challenge';
const MarkdownPreview = dynamic(
    () => import('../../components/CodeEditor/MarkdownPreview')
);
import { Layout } from '../../components/Common/Layout';
import PageHeader from '../../components/Common/PageHeader';

export default function Snippet() {
    const router = useRouter();
    const [state, setState] = useState<any>({});

    useEffect(() => {
        const Challenge = async () => {
            const { id } = router.query;
            if (!id || Array.isArray(id)) {
                router.push('/challenges');
            } else {
                const res = await getChallenge(id);
                setState({ ...res });
            }
        };
        Challenge();
    }, []);

    const challenge = state;

    return (
        <>
            <Layout>
                <PageHeader title={challenge.name} />
                <MarkdownPreview content={challenge.content} />
            </Layout>
        </>
    );
}
