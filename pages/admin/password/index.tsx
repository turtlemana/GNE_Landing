import { signIn, signOut, useSession } from 'next-auth/react';
import { useState,FormEvent,useEffect } from 'react';
import Dropdown from 'components/templates/admin/Dropdown';
import PostList from 'components/templates/admin/PostList';

import { useRouter } from 'next/router';
import EditorComponent from 'components/templates/admin/EditorComponent';
import FaqEditorComponent from 'components/templates/admin/FaqEditorComponent';
import RecruitEditorComponent from 'components/templates/admin/RecruitEditorComponent';
import NewsEditorComponent from 'components/templates/admin/NewsEditorComponent';

export default function AdminPassword() {
  const {data:session, status} = useSession();
    const router=useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [selectedBoard, setSelectedBoard] = useState("");
  const [addClick, setAddClick]=useState(false);
  const [edit, setEdit] = useState(false);
  const [detail, setDetail]=useState("");
//   useEffect(() => {
//     if (status === "loading") return; // Do nothing while loading
//     if (!session) router.push("/admin/password"); // If not authenticated, force login
//   }, [session, status, router]); // Add session, status, and router to dependency list
  const handleBoardSelect = (board:any) => {
    setSelectedBoard(board);
    setAddClick(false);
  };

  const handleRECRUITPostSubmit = async (newPost: {id?:any; title:string; tags: Array<string>;priority:number; content: string;deadline:string; position:string; type:string; company:string; exp: number; }) => {
    try {  if(newPost.id){
        const response = await fetch(`/api/recruitPost?postId=${newPost.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
          }); 
          const data = await response.json()


    }else {
      const response = await fetch('/api/recruitPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json()};
      setAddClick(false)
      setEdit(false)
      setDetail("")
    } catch (error) {
      console.error(error);
      alert(`${error}`)

    }
  };
  const handleFAQPostSubmit = async (newPost: {id?:any; title:string; type: string;priority:number; content: string }) => {
    try {
        if(newPost.id){
            const response = await fetch(`/api/faqPost?postId=${newPost.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
              }); 
              const data = await response.json()


        }else {
      const response = await fetch('/api/faqPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      }); 
      const data = await response.json()};
      // Optional: Handle response data
      setAddClick(false)
      setEdit(false)
      setDetail("")

    } catch (error) {
      console.error(error);
      alert(`${error}`)
    }
  };
  const handleNewsPostSubmit = async (newPost: {id?:any; title:string; thumbnail: string;priority:number; content: string }) => {
    try {
        if(newPost.id){
            const response = await fetch(`/api/newsPost?postId=${newPost.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
              }); 
              const data = await response.json()


        }else {
      const response = await fetch('/api/newsPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      }); 
      const data = await response.json()};
      // Optional: Handle response data
      setAddClick(false)
      setEdit(false)
      setDetail("")

    } catch (error) {
      console.error(error);
      alert(`${error}`)
    }
  };
  const handlePostSubmit = async (newPost: {title:string; postType: string;priority:number; content: string }) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
     ; // Optional: Handle response data
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn('credentials', { username, password });
  };

  if (status ==="loading") {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-2xl'>Loading...</div>
      </div>
    );
  }

  if (!session || status != "authenticated") {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-gray-100 '>
        <h1 className="text-3xl font-semibold mb-4">Admin Login</h1>
        <form onSubmit={handleFormSubmit} className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-white border border-black hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }
  


  return (
    <div className="mt-10 mb-10 p-10 bg-white shadow-md rounded-lg max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-10 py-5">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, {session?.user?.name}!</h1>
            <button onClick={() => signOut()} className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none">Sign Out</button>
        </div>
        <div className="mt-5 px-10">
            <div className="flex justify-between items-center">
                <Dropdown onSelect={handleBoardSelect} />
                {!detail && !addClick && selectedBoard && <button className='py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none mb-5' onClick={() => {setAddClick(true)}}>ADD</button>}
            </div>
            {selectedBoard && (
                <>
                {!addClick ? (
                    <div className='mt-5'>
                        <PostList onSubmit={
                            selectedBoard==="FAQ" ?
                            handleFAQPostSubmit :
                            selectedBoard==="RECRUIT" ?
                            handleRECRUITPostSubmit :
                            selectedBoard === "NEWS" &&
                            handleNewsPostSubmit} 
                            detail={detail} 
                            setDetail={setDetail} 
                            edit={edit}
                            setEdit={setEdit}
                            addClick={addClick}
                            setAddClick={setAddClick}
                            board={selectedBoard} />
                    </div>
                ) : (
                    <div>
                        <div className='flex justify-end mb-5'>
                            <button className='py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none' onClick={() => setAddClick(false)}>Back</button>
                        </div>
                        {selectedBoard === "FAQ" ? (
                            <div className="flex justify-center">
                                <FaqEditorComponent postType={selectedBoard} onSubmit={handleFAQPostSubmit} />
                            </div>
                        ) : selectedBoard === "RECRUIT" ? (
                            <div className="flex justify-center">
                                <RecruitEditorComponent postType={selectedBoard} onSubmit={handleRECRUITPostSubmit} />
                            </div>
                        ) :selectedBoard === "NEWS" && (
                            <div className="flex justify-center">
                                <NewsEditorComponent postType={selectedBoard} onSubmit={handleNewsPostSubmit} />
                            </div>
                        )}
                    </div>
                )}
                </>
            )}
        </div>
    </div>
)
  
}