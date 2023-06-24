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
  if (req.method === 'DELETE') {
    const { postId, postType } = req.query;

    try {
      const query = `DELETE FROM GNEWEB.${postType} WHERE id=${postId}`;
      await executeQuery({ query });

      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}