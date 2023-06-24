import 'react-quill/dist/quill.snow.css'; 
import dynamic from 'next/dynamic';
import { useState,FormEvent } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
  });

interface EditorComponentProps {
    initialContent?:string;
    postType: string;
    onSubmit: (newPost: {title:string; postType: string; priority:number;content: string }) => void;
  }

  const EditorComponent: React.FC<EditorComponentProps> = ({initialContent, postType, onSubmit }) => {
    const [content, setContent] = useState(initialContent || "");
    const [title, setTitle]=useState("")
    const [type, setType]=useState("")
    const [priority, setPriority]=useState("")
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    
        // You might want to sanitize 'content' here before sending to the server
    
        onSubmit({
            title:title,
          postType: postType,
          priority:parseInt(priority),
          content:content,
        });
      };

    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // 텍스트 스타일 기능
          ['blockquote', 'code-block'], // 블록 크기 조정 기능
          [{ 'header': 1 }, { 'header': 2 }], // 제목 크기 조정 기능
          [{ 'list': 'ordered'}, { 'list': 'bullet' }], // 리스트 기능
          [{ 'color': [] }, { 'background': [] }], // 텍스트 색상, 배경색 조정 기능
          ['link', 'image', 'video'], // 링크, 이미지, 비디오 삽입 기능
          ['clean'], // 스타일 제거 기능
        ],
      };
      const formats = [
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'header', 'list', 'color', 'background', 'link', 'image', 'video',
      ];
  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="제목을 입력하세요." className="border rounded shadow w-full h-[30px]" value={title} onChange={(e)=>setTitle(e.target.value)} />
    {postType === "FAQ" && 
          <input type="text" placeholder="직업 분류를 입력하세요." className="border rounded shadow  h-[30px]" value={type} onChange={(e)=>setType(e.target.value)} />

    }
              <input type="number" placeholder="우선순위를 입력하세요." className="border rounded shadow  h-[30px]" value={priority} onChange={(e)=>setPriority(e.target.value)} />

        <ReactQuill theme="snow" placeholder='내용을 입력하세요.' className=" border rounded shadow" value={content} onChange={setContent} formats={formats}  modules={modules} />
        <button className="cursor-pointer mt-5 py-2 px-4 bg-blue-500 border text-black font-bold rounded hover:bg-blue-600" type="submit">Submit</button>

      </form>
      
      </div>
      
  )
}

export default EditorComponent;