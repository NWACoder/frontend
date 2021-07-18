
import Link from 'next/link';
// @ts-ignore
export const ListChallenge = ({challenge}) => {

	const { _id, name, user_id} = challenge;

	return (
		<Link href={`/challenges/${_id}`}> 
		<div className="py-4 cursor-pointer">
			<div className="flex space-x-3">
				<div className="flex-1 space-y-1">
					<div className="flex items-center justify-between">
					<h3 className="text-sm font-medium">{name}</h3>
					</div>
					<p className="text-sm text-gray-500">{user_id.username}</p>
				</div>
			</div>
		</div>
		</Link>
      
  )
}
