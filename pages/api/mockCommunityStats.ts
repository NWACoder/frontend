import { NextApiRequest, NextApiResponse } from 'next';

export default function mockAPI(_req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ users: 56800, snippets: 86671, qa: 89222 });
}
