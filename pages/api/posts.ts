import { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from 'datas/mysql';

interface CreatePostRequestBody {
  postType: string;
  content: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    const { postType, content }: CreatePostRequestBody = req.body;

    try {
      const query = 'INSERT INTO posts (postType, content) VALUES (?, ?)';
      const values = [postType, content];
      await executeQuery({ query, values });

      res.status(200).json({ message: 'Post created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}