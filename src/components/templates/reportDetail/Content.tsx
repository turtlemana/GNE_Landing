import Image from "next/image";
import boardContentImg from "assets/images/team_culture/board_content.png";

const ReportContent = ({article}:any) => {
  let content = article[0].content;

  // Define mapping between class names and font sizes
  const classToSizeMap:any = {
    'ql-size-small': '16px',
    'ql-size-large': '20px',
    'ql-size-huge': '22px',
  };

  // Apply sizes to the corresponding classes
  Object.keys(classToSizeMap).forEach((className) => {
    const size = classToSizeMap[className];
    content = content.replace(new RegExp(`class="${className}"`, 'g'), `style="font-size:${size};"`);
  });

  // Apply sizes to headers and p tags
  content = content
    .replace(/<h1>/g, '<h1 style="font-size:2em;">')
    .replace(/<h2>/g, '<h2 style="font-size:1.5em;">')
    .replace(/<h3>/g, '<h3 style="font-size:1.17em;">')
    .replace(/<h4>/g, '<h4 style="font-size:1em;">')
    .replace(/<h5>/g, '<h5 style="font-size:0.83em;">')
    .replace(/<h6>/g, '<h6 style="font-size:0.67em;">')
    .replace(/<p>/g, '<p style="font-size:15px;">');

  return (
    <section className=" max-w-[846px] mx-auto mt-[70px] mobile:mt-0">
      <div className="max-w-[570px] mx-auto text-center">
        <h2 className="text-[48px] leading-[140%] font-semibold text-dark-gray break-keep mobile:text-[24px]">
          {article[0].title} <span className="mobile:block" />
        </h2>
      </div>

      <div className="mt-[45px] mb-[100px] text-center mobile:mt-[21px] mobile:mb-[48px]">
        <p className="text-[24px] leading-[140%] font-semibold text-[#A2A5AA] mobile:text-[14px]">
        {article[0].create_dt.split("T")[0]}
        </p>
      </div>

      <div className={' flex items-center justify-center ' }>
      
      {/* <h2 className="text-xl font-semibold mb-4">게시물 내용</h2> */}
      <div className={'text-xl'} dangerouslySetInnerHTML={{ __html: content }} />
    </div>

  
    </section>
  );
};

export default ReportContent;
