import { useEffect, useState,FormEvent,Dispatch,SetStateAction } from 'react';
import { DATAS as JOB} from 'datas/job';
import { REPORTS } from 'datas/report';
import {DATAS as FAQ} from 'datas/faq'
import ReportContent from 'components/templates/reportDetail/Content';
import JobDetail from '../../../../pages/job/[id]';
import axios from 'axios';
import useSWR from 'swr';
import PostContent from 'components/posts/PostContent';
import EditorComponent from 'components/templates/admin/EditorComponent';
import RecruitEditorComponent from './RecruitEditorComponent';
import FaqEditorComponent from './FaqEditorComponent';
import NewsEditorComponent from './NewsEditorComponent';

interface Post {
    id: number;
    title?: string;
    content: string;
  }
  
  interface PostListProps {

    edit:boolean; 
    setEdit:Dispatch<SetStateAction<boolean>>
    detail: string;
    setDetail: (detail: string) => void;
    board: string;
    addClick:boolean; 
    setAddClick:Dispatch<SetStateAction<boolean>>
    onSubmit:any;
    // onSubmit: (newPost: {title:string; postType: string; content: string; }) => void;

  }




const PostList = ({edit,setEdit, detail, setDetail, board,onSubmit }: PostListProps) => {
    const fetcher = (url:string) => axios.get(url).then((res) => res.data)
    const { data: posts, error,mutate } = useSWR(`/api/getPost?postType=${board}`, fetcher);
    const [title, setTitle] =useState("")
    const [postId, setPostId]=useState("")
    const [type, setType] = useState("")
    const [tags, setTags] =useState("")
    const [deadline, setDeadline]=useState("")
    const [priority, setPriority] =useState("")
    const [thumbnail,setThumbnail]=useState("")
    const [company, setCompany]=useState("")
    const [position, setPosition]=useState("")
    const [exp, setExp] = useState()
    useEffect(()=>{
        setDetail("");
        setEdit(false);

    },[board])
  
    if (error) {
      return <div>Failed to load posts.</div>;
    }
  
    if (!posts) {
      return <div>Loading...</div>;
    }

    const deleteHandler=async()=>{
        const data = await fetch(`/api/deletePost?&postId=${postId}&postType=${board}`,{
            method:"DELETE",
            headers:{"content-type":"application/json"}
        }).then((res)=>{if(res.ok){setDetail("");setEdit(false);mutate();}})
    }


    const handlePostClick = (postId: number) => {
      const selectedPost = posts.find((post: Post) => post.id === postId);
      if (selectedPost) {
        setDetail(selectedPost.content);
        setPriority(selectedPost.priority);
        setTitle(selectedPost.title)
        setPostId(selectedPost.id)
      }

      if (board ==="FAQ" && selectedPost) {
        setType(selectedPost.type)
      }

      if (board === "RECRUIT" && selectedPost){
        setType(selectedPost.type)
        setTags(selectedPost.tags)
        setDeadline(selectedPost.deadline)
        setCompany(selectedPost.company)
        setPosition(selectedPost.position)
        setExp(selectedPost.exp)
      }

      if (board === "NEWS" && selectedPost){
        setThumbnail(selectedPost.thumbnail)
      }
    };
    return (
        <div className='mt-10 bg-white shadow-md rounded-lg max-w-7xl mx-auto p-10'>
            {(!detail && !edit) ? (
                <ul className='space-y-4'>
    {posts.map((post: any) => (
        <li
            key={post.id}
            className='flex items-center p-4 bg-white rounded shadow cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in'
            onClick={() => handlePostClick(post.id)}
        >
            <div className='bg-indigo-200 text-indigo-700 rounded-full w-10 h-10 flex items-center justify-center mr-4'>{post.id}</div>
            <h2 className='text-lg font-semibold hover:text-indigo-600'>{post?.title}</h2>
        </li>
    ))}
</ul>
            ) : (
                <>
                    {detail && !edit && (
                        <div>
                            <div className='flex justify-end mb-5'>
                                <button className='py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none' onClick={() => setDetail("")}>Back</button>
                            </div>
                            <div className='p-5 bg-white rounded-lg shadow-lg'>
                                <PostContent content={detail} />
                                <div className='flex justify-end mt-5 space-x-5'>
                                    <button className='py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none' onClick={() => { setEdit(true); }}>Edit</button>
                                    <button className='py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none' onClick={() => { deleteHandler() }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {edit && (
                        <div>
                            <div className='flex justify-end mb-5'>
                                <button className='py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none' onClick={() => { setEdit(false); }}>Cancel</button>
                            </div>
                            {board ==="FAQ" ?
                            <FaqEditorComponent postId={postId} mutate={mutate} editType={type} editPriority={parseInt(priority)} editTitle={title} initialContent={detail} postType={board} onSubmit={onSubmit}/> :
                            board==="RECRUIT" ? 
                            <RecruitEditorComponent postId={postId} mutate={mutate} editTitle={title} editExp={exp} editCompany={company} editPosition={position} editType={type} editPriority={parseInt(priority)} editTags={tags} editDeadline={deadline}  initialContent={detail} postType={board} onSubmit={onSubmit}/>:
                            board ==="NEWS" &&
                            <NewsEditorComponent postId={postId} mutate={mutate} editThumbnail={thumbnail} editPriority={parseInt(priority)} editTitle={title}   initialContent={detail} postType={board} onSubmit={onSubmit} />
                            }
                        </div>
                    )}
                </>
            )}
        </div>
    );
  };
  
  export default PostList;