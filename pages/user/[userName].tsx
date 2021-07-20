import { Layout } from '../../components/Common/Layout';
import { UserCard } from '../../components/Dashboard/UserCard';
import { getUserProfile } from '../../api/user/profile'; //editUserProfile
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
//import CodeEditor from '@monaco-editor/react';
import { useAuth } from '../../lib/context/useAuth';

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!context.query.userName || Array.isArray(context.query.userName)) {
        return { redirect: { permanent: false, destination: '/' }, props: {} };
    } else {
        const res = await getUserProfile(context.query.userName);
        if (!res)
            return {
                redirect: { permanent: false, destination: '/' },
                props: {},
            };
        return { props: { res } };
    }
};

export default function UserPage({
    res,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const data = {
        following: 0,
        followers: 0,
        stars: 0,
        ...res,
    };

    const auth = useAuth();
    const { user } = auth;

    return (
        <Layout>
            <UserCard {...data} />
            {user != null && user.username == res.username ? (
                <button
                    //onClick={editUserProfile()}
                    className="bg-red-200 border-2 border-red-300 rounded-sm w-24"
                >
                    Edit Profile
                </button>
            ) : (
                <div></div>
            )}
        </Layout>
    );
}
