import { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from 'datas/mysql';

interface CreatePostRequestBody {
  postType: string;
  content: Text;
  title:string; 
  thumbnail:string;
  priority:number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    const { title,thumbnail,priority, content }: CreatePostRequestBody = req.body;
    console.log(title, thumbnail, priority, content)

    try {
      const query = `INSERT INTO GNEWEB.NEWS(thumbnail, title,content,priority,create_dt) VALUES ('${thumbnail}', '${title}','${content}',${priority},NOW());`
    //   const values = [postType, content];
      await executeQuery({ query });

      res.status(200).json({ message: 'Post created successfully' });
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Failed to create post' });
    }

  } else if (req.method==='PUT'){
    const {postId} =req.query; 
    const { title,thumbnail,priority, content }: CreatePostRequestBody = req.body;
    try {
        const query = `UPDATE GNEWEB.NEWS SET thumbnail='${thumbnail}', title='${title}', content='${content}', priority=${priority} WHERE id=${postId}`;
        //   const values = [postType, content];
        await executeQuery({ query });
  
        res.status(200).json({ message: 'Modified successfully' });
      } catch (error) {
          console.log(error)
        res.status(500).json({ error: 'Failed to create post' });
      }

  }
  
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}