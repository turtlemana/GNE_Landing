import { useState,FormEvent } from 'react';

interface Props {
    onSubmit : (content : string) => void;
}

export default function AddPostForm({ onSubmit }:any) {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(postContent);
    setPostContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10">
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        required
        className="border w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="border text-white w-full py-2 px-4 bg-blue-500 mt-4 font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Add Post
      </button>
    </form>
  );
}