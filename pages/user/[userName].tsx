import { Layout } from '../../components/Common/Layout';
import { UserCard } from '../../components/Dashboard/UserCard';

export default function UserPage() {

	const data = {
		following: 0, followers: 0, stars: 0
	}
    return (
        <Layout>
            <UserCard { ... data }  />
        </Layout>
    );
}
