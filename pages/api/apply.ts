import { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from 'datas/mysql';
import formidable, { Fields, Files, IncomingForm} from 'formidable';
import {File as FormidableFile } from 'formidable'
import { v4 as uuidv4 } from 'uuid';
import S3 from "aws-sdk/clients/s3";
import { promises as fs } from 'fs';



interface Experience {
  companyName: string;
  role: string;
  periodStart: string;
  periodEnd: string;
}

const s3 = new S3({
    region: "ap-northeast-2",
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
    signatureVersion: "v4",
  });

export const config = {
    api: {
      bodyParser: false,
    },
  };
  const timestamp = new Date().getTime();
  function getFileExtension(filename: string) {
    const dotIndex = filename.lastIndexOf('.');
    return filename.substring(dotIndex + 1);
  }

  const uploadToS3 = (params:any) => {
    return new Promise((resolve, reject) => {
        s3.upload(params, function(err:any, data:any) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};
  

  const parseForm = (req: NextApiRequest,res:NextApiResponse): Promise<{ fields: Fields, files: Files }> => {
    return new Promise<{ fields: Fields, files: Files }>((resolve, reject) => {
      const form = new formidable.IncomingForm();
      form.on('fileBegin', function (name, file) {
        if (file.size > 50 * 1024 * 1024) { // 50MB
          res.status(400).json({ error: 'File size exceed the limit.' });
        }
      });
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });
  };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    let resumeUrl;
    let portfolioUrl;

    try {
      const {fields,files} = await parseForm(req,res);
      if (files.resume) {
        let resume: any = null; 
        if (Array.isArray(files.resume)) {
          resume = files.resume[0];
        } else {
          resume = files.resume;
        }

        const fileContent = await fs.readFile(resume.filepath);
        const uniqueFilename = `${timestamp}-${uuidv4()}.${getFileExtension(resume.originalFilename)}`;

        const params = {
          Bucket: process.env.BUCKET_NAME as string,
          Key:uniqueFilename,
          Body: fileContent,
        };
        const uploadResumeResult = await uploadToS3(params);
        resumeUrl = (uploadResumeResult as any).Location;
      }
      
      if (files.portfolio) {
        let portfolio: any = null; 
        if (Array.isArray(files.portfolio)) {
          portfolio = files.portfolio[0];
        } else {
          portfolio = files.portfolio;
        }
        const fileContent = await fs.readFile(portfolio.filepath);
        
const uniqueFilename = `${timestamp}-${uuidv4()}.${getFileExtension(portfolio.originalFilename)}`;

        const params = {
          Bucket: process.env.BUCKET_NAME as string,
          Key: uniqueFilename,
          Body: fileContent,
        };
      
        const uploadPortfolioResult = await uploadToS3(params);
        portfolioUrl = (uploadPortfolioResult as any).Location;
      }

      

      const {
        name,
        phone,
        position,
        email,
        link,
        total_experience,
        experience,
      } = fields;

      const experiences: Experience[] = Array.isArray(experience)
      ? JSON.parse(experience[0] || '[]')
      : JSON.parse(experience || '[]');

        const processDate = (date: string) => {
            if (date === '') {
              return 'NULL';
            } else {
              return `'${date}'`;
            }
          };
          
          let query = `
            INSERT INTO GNEWEB.APPLICATION(
              name, phone, email,position,cv,portfolio, link,exp,
              company1, job1, startdate1, enddate1,
              company2, job2, startdate2, enddate2,
              company3, job3, startdate3, enddate3
            ) 
            VALUES (
              '${name}', '${phone}', '${email}', '${position}','${resumeUrl}','${portfolioUrl}', '${link}', '${total_experience}',
              '${experiences[0]?.companyName || ''}', '${experiences[0]?.role || ''}', ${processDate(experiences[0]?.periodStart || '')}, ${processDate(experiences[0]?.periodEnd || '')},
              '${experiences[1]?.companyName || ''}', '${experiences[1]?.role || ''}', ${processDate(experiences[1]?.periodStart || '')}, ${processDate(experiences[1]?.periodEnd || '')},
              '${experiences[2]?.companyName || ''}', '${experiences[2]?.role || ''}', ${processDate(experiences[2]?.periodStart || '')}, ${processDate(experiences[2]?.periodEnd || '')}
            )
          `;

      await executeQuery({ query });

      res.status(200).json({ message: 'Post successfully' });
    } catch (error) {
      console.error('Error parsing form data:', error);
      res.status(400).json({ message: 'Error parsing form data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
