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
    mutate?:any;
    postId?:any;
    initialContent?:string;
    postType: string;
    editTitle?:string;
    editTags?:string; 
    editPriority?:number;
    editDeadline?:string;
    editCompany?:string; 
    editPosition?:string; 
    editType?:string;
    editExp?:any;
    onSubmit: (newPost: {id?:any; exp:number; position:string; company:string; type:string; title:string; tags:Array<string>;priority:number; content: string;deadline:string;}) => void;
  }

  const BUCKET_URL = "https://riskweather.s3.ap-northeast-2.amazonaws.com/";


  const RecruitEditorComponent: React.FC<EditorComponentProps> = ({editExp,editCompany, editPosition, editType,postId,mutate,editTitle, editTags, editPriority, editDeadline, initialContent, postType, onSubmit }) => {
    const [content, setContent] = useState(initialContent || "");
    const [title, setTitle]=useState(editTitle || "")
    const [tags, setTags]=useState(editTags?.substring(1,editTags.length-1) || "")
    const [priority, setPriority]=useState(editPriority || "")
    const [deadline, setDeadline]=useState(editDeadline?.split("T")[0] || "")
    const [company, setCompany]=useState(editCompany || "")
    const [position, setPosition]=useState(editPosition || "")
    const [type, setType]=useState(editType || "")
    const [exp, setExp] = useState(editExp || "");
    const quillRef = useRef<any>(null);
    const [uploadingStatus, setUploadingStatus] = useState<string>('');
    console.log(onSubmit)
    console.log(deadline)

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

            
            exp:exp,
            company:company, 
            position:position, 
            type:type,
            title:title,
        
          tags: [tags],
          priority:typeof priority ==="number" ? priority :  parseInt(priority),
          content:content,
          deadline:deadline
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
      <input required type="text" placeholder="제목을 입력하세요." className="pl-2 border rounded shadow w-full h-[30px]" value={title} onChange={(e)=>setTitle(e.target.value)} />
    <div className={'flex gap-5'}>
          <input required type="text" placeholder="직군을 입력하세요." className="pl-2 border rounded shadow  h-[30px]" value={type} onChange={(e)=>setType(e.target.value)} />
          <input required type="text" placeholder="계열사 입력하세요." className="pl-2 border rounded shadow  h-[30px]" value={company} onChange={(e)=>setCompany(e.target.value)} />
          <input required type="text" placeholder="업무형태 입력하세요." className="pl-2 border rounded shadow  h-[30px]" value={position} onChange={(e)=>setPosition(e.target.value)} />
          <input required type="number" placeholder="요구 경력을 입력하세요" className="pl-2 border rounded shadow  h-[30px]" value={exp} onChange={(e)=>setExp(e.target.value)} />
    </div>      
          <div className={'flex gap-5'}>
          <input required type="text" placeholder="태그를 입력하세요. (쉼표 구분)" className="pl-2 border rounded shadow  h-[30px] w-[200px]" value={tags} onChange={(e)=>setTags(e.target.value)} />

    
              <input required type="number" placeholder="우선순위를 입력하세요." className="pl-2 border rounded shadow  h-[30px]" value={priority} onChange={(e)=>setPriority(e.target.value)} />
              <input required type="date" placeholder="데드라인을 입력하세요." className="pl-2 border rounded shadow  h-[30px]" value={deadline} onChange={(e)=>setDeadline(e.target.value)} />
              </div>
        <ReactQuill         forwardedRef={quillRef}
 theme="snow" placeholder='내용을 입력하세요.' className=" border rounded shadow" value={content} onChange={setContent} formats={formats}  modules={modules} />
        <button className="cursor-pointer mt-5 py-2 px-4 bg-blue-500 border text-black font-bold rounded hover:bg-blue-600" type="submit">Submit</button>

      </form>
      
      </div>
      
  )
}

export default RecruitEditorComponent;