import { NextApiRequest, NextApiResponse } from 'next';

export default function mockAPI(_req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({	
    		value: { Users: 56800, Snippets: 86671, Challenges: 89222 } 
    	});
}
