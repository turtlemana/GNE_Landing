import Image from "next/image";
import { useRouter } from "next/router";
import ReportContent from "components/templates/reportDetail/Content";
import back from "assets/icons/team_culture/back.svg";
import { GetServerSidePropsContext } from "next";


const ReportDetail = ({article}:any) => {
  const router = useRouter();

  return (
    <div className="bg-[#FCFCFF] pt-[170px] pb-[320px] px-[24px] mobile:pt-[62px] mobile:pb-[115px]">
      <div className="max-w-[1280px] mx-auto mobile:hidden">
        <button onClick={router.back} className="flex gap-[15px] items-center">
          <Image src={back} alt="" />
          <span className="text-[16px] leading-[140%] font-semibold text-[#A2A5AA]">
            뒤로가기
          </span>
        </button>
      </div>
      <ReportContent article={article} />
    </div>
  );
};

export default ReportDetail;


export async function getServerSideProps(context:GetServerSidePropsContext) {

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getPost?postType=NEWS&id=${context.query.reportId}`)
  const article =await res.json()
  
  return {props :{article}}
}


