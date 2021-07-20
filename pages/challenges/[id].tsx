import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { getChallenge } from '../../api/challenge';
const MarkdownPreview = dynamic(
    () => import('../../components/CodeEditor/MarkdownPreview')
);
import { Layout } from '../../components/Common/Layout';
import PageHeader from '../../components/Common/PageHeader';

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!context.query.id || Array.isArray(context.query.id)) {
        return {
            redirect: { permanent: false, destination: '/challenges' },
            props: {},
        };
    } else {
        const res = await getChallenge(context.query.id);
        if (!res)
            return {
                redirect: { permanent: false, destination: '/challenges' },
                props: {},
            };
        return { props: { res } };
    }
};

export default function Challenge({
    res,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Layout>
                <PageHeader title={res.name} />
                <MarkdownPreview content={res.content} />
            </Layout>
        </>
    );
}
