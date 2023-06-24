import Image from 'next/image';

interface PostContentProps {
  content: string;
}

const PostContent = ({ content }: PostContentProps) => {
  return (
    <div>
      
      {/* <h2 className="text-xl font-semibold mb-4">게시물 내용</h2> */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PostContent;