import Culture from "components/templates/teamCulture/Culture";
import Report from "components/templates/teamCulture/Report";
import { GetServerSidePropsContext } from "next";

const TeamCulture = ({news}:any) => {
  return (
    <div className="bg-background mobile:bg-none bg-[#FCFCFF] bg-cover bg-no-repeat bg-right-top pt-[170px] pb-[320px] px-[24px] mobile:pt-[62px] mobile:pb-[115px]">
      <Culture />
      <Report news={news}  />
    </div>
  );
};

export default TeamCulture;


export async function getServerSideProps(context:GetServerSidePropsContext) {

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getPost?postType=NEWS`)
  const news =await res.json()

  return {props :{news}}
}



