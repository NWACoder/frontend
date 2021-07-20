
import Link from 'next/link';
// @ts-ignore
export const ListChallenge = ({challenge, link}) => {

	const {  name, user_id} = challenge;

	return (
		
		<div className="py-4  bg-blue-50 p-4 mb-4">
			<div className="flex space-x-3">
				<div className="flex-1 space-y-1">
					<div className="flex items-center justify-between">
					<Link href={link}><h3 className="text-sm font-medium cursor-pointer">{name}</h3></Link>
					</div>
					<Link href={`/user/profile/${user_id.username}`}><p className="text-sm text-gray-500 cursor-pointer">by: {user_id.username}</p></Link>
				</div>
			</div>
		</div>
		
      
  )
}
