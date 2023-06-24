import Link from "next/link";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";

import back from "assets/icons/job/back.svg";



const JobDetail = ({jobDetail}:any) => {
  const detail = jobDetail && jobDetail[0] && jobDetail[0].content ? jobDetail[0] : { title: '', deadline: '', company: '', position: '', content: ''};

  return (
    <div className="pt-[80px] pb-[133px] bg-background mobile:bg-none bg-[#FCFCFF] bg-cover bg-no-repeat bg-right-top px-[24px] mobile:pt-[62px] mobile:pb-[56px]">
      <div className="relative max-w-[1024px] mx-auto">
        <Link
          href="/job"
          className="flex items-center mb-[67px] font-semibold text-[#a2a5aa] ml-[-30px] text-[16px] laptop:ml-0 mobile:hidden"
        >
          <Image src={back} alt="" className="mr-[6px] w-6" />
          뒤로가기
        </Link>
        <div className="mx-auto flex gap-[112px] laptop:flex-col laptop:items-center mobile:gap-0">
          <section className="mb-[140px] w-[589px] mobile:w-full">
            <h1 className="font-extrabold text-[40px] leading-none mb-[40px] h-[56px] text-dark-gray mobile:text-[28px] mobile:mb-[16px] mobile:h-fit">
              {detail.title}{" "}
              <span className="mobile:block mobile:mt-[10px]" />
              {`(~${detail.deadline.split("T")[0]})`}
            </h1>
            <div className="flex gap-[8px] mb-[40px]">
              <div className="text-[16px] rounded-[36px] border border-[#e5e6e7] py-[8px] px-[12px] text-lighter-gray font-bold ">
                {detail.company}
              </div>
              <div className="text-[16px] rounded-[36px] border border-[#e5e6e7] py-[8px] px-[12px] text-lighter-gray font-bold">
              {detail.position}
              </div>
            </div>
           {detail.content ? <div dangerouslySetInnerHTML={{ __html: detail.content }} className="font-medium text-light-gray text-[16px] leading-7">
           
            </div> : ""}
          </section>
          <div className="mobile:flex mobile:justify-center mobile:fixed mobile:w-full mobile:bottom-0 mobile:px-[24px] mobile:pb-[56px] mobile:pt-[20px] mobile:bg-backgroundButton">
            <Link
              href={`apply/${detail.id}`}
              className="block text-center mt-[96px] leading-10 h-[64px] font-extrabold text-[20px] bg-purple rounded-60 py-[18px] px-[10px] w-[322px] text-white shadow-[0_0_12px_0_rgba(121,120,132,0.15)] mobile:h-[54px] mobile:pt-[15px] mobile:text-[16px] whitespace-nowrap"
            >
              지원하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;


export async function getServerSideProps(context:GetServerSidePropsContext) {

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getPost?postType=RECRUIT&id=${context.query.id}`)
  const jobDetail =await res.json()
  
  return {props :{jobDetail}}
}


