import { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from 'datas/mysql';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    const { postType,id } = req.query;

    try {
      const query = `SELECT * FROM GNEWEB.${postType}
      WHERE 1=1
      ${id ? `AND ID =${id}` : ""}
      `;
    //   const values = Array.isArray(postType) ? postType : postType ? [postType] : [];
      const posts = await executeQuery({ query });

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}