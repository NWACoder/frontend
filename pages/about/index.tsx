import { Layout } from '../../components/Common/Layout';

const team = [
	{
		name: 'Miguel Hernandez',
		role: 'Full Stack - Lead',
		imageUrl:
		  'https://pbs.twimg.com/profile_images/1313711347977392130/BlrRWOpU_400x400.jpg',
		twitterUrl: 'https://twitter.com/xamthorz',
	},
	{
		name: 'Zac Wilson',
		role: 'Full Stack',
		imageUrl:
		  'https://pbs.twimg.com/profile_images/1363214686091575296/nuqsQXrI_400x400.jpg',
		twitterUrl: 'https://twitter.com/zac_wilson87',
	},
	{
		name: 'Jesse Moore',
		role: 'Full Stack',
		imageUrl:
		  'https://pbs.twimg.com/profile_images/1378399908395319300/Ed9KH9yz_400x400.jpg',
		twitterUrl: 'https://twitter.com/jamoore',
	},
]


export default function Team() {
  return (
  	 <Layout> 
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Meet our team</h2>
          </div>
          <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
            {team.map((person) => (
              <li key={person.name}>
                <div className="space-y-6">
                  <img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src={person.imageUrl} alt="" />
                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3>{person.name}</h3>
                      <p className="text-indigo-600">{person.role}</p>
                    </div>
                    <ul className="flex justify-center space-x-5">
                      <li>
                        <a href={person.twitterUrl} className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Twitter</span>
                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </li>
                    
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </Layout>
  )
}
