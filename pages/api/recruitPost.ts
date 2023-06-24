import { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from 'datas/mysql';

interface CreatePostRequestBody {
  postType: string;
  content: Text;
  title:string; 
  tags:string;
  priority:number;
  deadline:string;
  company:string; 
  position:string;
  type:string;
  exp:number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    const { title,tags,content, deadline,priority,company, position, type,exp }: CreatePostRequestBody = req.body;
    console.log(title, tags, priority, content,deadline)

    try {
      const query = `INSERT INTO GNEWEB.RECRUIT(title,tags,content,company,deadline,priority,create_at,position,type,exp) VALUES ('${title}', '[${tags}]','${content}','${company}','${deadline}',${priority},NOW(),'${position}','${type}','${exp}');`
    //   const values = [postType, content];
      await executeQuery({ query });

      res.status(200).json({ message: 'Post created successfully' });
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else if (req.method==="PUT"){
    const {postId} =req.query; 
    const { title,tags,content, deadline,priority,company,position,type,exp }: CreatePostRequestBody = req.body;
    console.log(title, tags, priority, content,deadline)

    try {
        const query = `UPDATE GNEWEB.RECRUIT SET title='${title}', tags='[${tags}]', content='${content}', deadline='${deadline}', priority=${priority}, type='${type}', company='${company}', position='${position}', exp='${exp}' WHERE id=${postId}`;
        //   const values = [postType, content];
        await executeQuery({ query });
  
        res.status(200).json({ message: 'Post created successfully' });
      } catch (error) {
          console.log(error)
        res.status(500).json({ error: 'Failed to create post' });
      }
  } 
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}