
import Link from 'next/link';
// @ts-ignore
export const ListChallenge = ({challenge}) => {

	const { _id, name, user_id} = challenge;

	return (
		
		<div className="py-4  bg-blue-50 p-4">
			<div className="flex space-x-3">
				<div className="flex-1 space-y-1">
					<div className="flex items-center justify-between">
					<Link href={`/challenges/${_id}`}><h3 className="text-sm font-medium cursor-pointer">{name}</h3></Link>
					</div>
					<p className="text-sm text-gray-500">by: {user_id.username}</p>
				</div>
			</div>
		</div>
		
      
  )
}
