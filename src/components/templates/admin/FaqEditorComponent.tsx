import 'react-quill/dist/quill.snow.css'; 
import dynamic from 'next/dynamic';
import { useState,FormEvent,useRef,useMemo } from 'react';
import axios from 'axios';


const ReactQuill = dynamic(
    async () => {
    const { default: RQ } = await import('react-quill');
    return function comp({ forwardedRef, ...props }:any) {
    return <RQ ref={forwardedRef} {...props} />;
    };
    },
    { ssr: false }
    );
  
interface EditorComponentProps {
    postId?:any;
    mutate?:any;
    editTitle?:string;
    editPriority?:number; 
    editType?:string;
    initialContent?:string;
    postType: string;
    onSubmit: (newPost: {id?:number;title:string; type: string; priority:number;content: string }) => void;
  }

  const BUCKET_URL = "https://riskweather.s3.ap-northeast-2.amazonaws.com/";


  const FaqEditorComponent: React.FC<EditorComponentProps> = ({postId,mutate,editTitle, editType, editPriority, initialContent, postType, onSubmit }) => {
    const [content, setContent] = useState(initialContent || "");
    const [title, setTitle]=useState(editTitle || "")
    const [type, setType]=useState(editType || "")
    const quillRef = useRef<any>(null);
    const [uploadingStatus, setUploadingStatus] = useState<string>('');

    const [priority, setPriority]=useState(editPriority || "")
    const imageHandler = () => {
        const input = document.createElement('input');
    
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
    
        input.onchange = async () => {
            const file = input.files ? input.files[0] : null;
            const formData = new FormData();
            if (file){
            formData.append('image', file);
    
            // Save current cursor state
    
            setUploadingStatus("Uploading the image to AWS S3");
    
            let { data } = await axios.post(`/api/uploadImage`, {
                name: file.name,
                type: file.type,
                imageUrl: BUCKET_URL + file.name
            });
    
            const url = data.url;
            await axios.put(url, file, {
                headers: {
                    "Content-type": file.type,
                    "Access-Control-Allow-Origin": "*",
                },
            });
            const range = quillRef.current?.getEditor().getSelection(true);

            if (range) {
                const imageUrl = BUCKET_URL + file.name;  // This should be the URL returned after the image has been successfully uploaded to S3
                quillRef.current?.getEditor().insertEmbed(range.index, 'image', imageUrl);
            }
            setUploadingStatus("");
        }};
    };
   
   
   
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!content.trim()) {
            alert("Content cannot be empty");
            return;
        }
    
    
        // You might want to sanitize 'content' here before sending to the server
        onSubmit({
            id:postId,
            title:title,
          type: type,
          priority:typeof priority ==="number" ? priority : parseInt(priority),
          content:content,
        });
      };

      const modules = useMemo(()=>({
        toolbar: {container:[
            ['bold', 'italic', 'underline', 'strike'], 
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }], 
            [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
            ['link', 'image', 'video'],
            [{ 'script': 'sub'}, { 'script': 'super' }], 
            [{ 'indent': '-1'}, { 'indent': '+1' }], 
            [{ 'direction': 'rtl' }], 
            [{ 'size': ['small', false, 'large', 'huge'] }], 
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': ['sans-serif', 'serif', 'monospace'] }],
            [{ 'align': [] }],
            ['clean']
        ], handlers:{image:imageHandler}},
      }),[]);
      const formats=['bold', 'italic', 'underline', 'indent','strike', 'blockquote', 'size','code-block', 'header', 'list', 'color', 'background', 'link', 'image', 'video', 'script','direction','font', 'align']

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-4">
      <input required type="text" placeholder="제목을 입력하세요." className="pl-2 border rounded shadow w-full h-[30px]"  value={title} onChange={(e)=>setTitle(e.target.value)} />
    {postType === "FAQ" && 
          <input required type="text" placeholder="질문 분류를 입력하세요." className="pl-2 mr-3 border rounded shadow  h-[30px]" value={type} onChange={(e)=>setType(e.target.value)} />

    }
              <input required type="number" placeholder="우선순위를 입력하세요." className="pl-2 border rounded shadow  h-[30px]" value={priority} onChange={(e)=>setPriority(e.target.value)} />

        <ReactQuill         forwardedRef={quillRef}
 theme="snow" placeholder='내용을 입력하세요.' className=" border rounded shadow" value={content} onChange={setContent} formats={formats}  modules={modules} />
        <button className="cursor-pointer mt-5 py-2 px-4 bg-blue-500 border text-black font-bold rounded hover:bg-blue-600" type="submit">Submit</button>

      </form>
      
      </div>
      
  )
}

export default FaqEditorComponent;