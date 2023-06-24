import Image from "next/image";
import { DATAS } from "datas/people";
import { useRouter } from "next/router";

const People = () => {
  const router=useRouter();
  return (
    <div className="bg-background mobile:bg-none bg-[#FCFCFF] bg-cover bg-no-repeat bg-right-top pt-[177px] pb-[204px] mobile:px-[25px] mobile:pb-[56px] mobile:pt-[62px]">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center laptop:max-w-[640px]">
        <h1 className="text-[40px] leading-none mb-[40px] text-dark-gray font-extrabold w-full text-left mobile:text-[28px] mobile:mb-[16px]">
          GNE 인재상
        </h1>
        <p className="text-light-gray font-medium text-[24px] mb-[100px] w-full leading-10 mobile:text-[14px] mobile:leading-7 mobile:h-[102px] mobile:mb-px">
          GNE는 금융, IT 전문가로 구성된 스타트업으로
          <br /> 목표 달성을 위한 열정과 성장에 대한 열망을 가진{" "}
          <span className="laptop:block" />
          동료들과 함께 금융혁신을 이루고자 합니다.
        </p>
        <section className="flex flex-wrap gap-x-[20px] gap-y-[28px] mb-[146px] mobile:gap-y-[16px] mobile:mb-[90px]">
          {DATAS.map(({ id, title, content, image, mobileContent }) => (
            <article
              key={id}
              className="bg-white items-end w-[630px] flex shadow-[0_0_12px_0_rgba(121,120,132,0.15)] rounded-20 p-10 mobile:w-full mobile:min-h-[166px] mobile:gap-[7px] mobile:p-[20px]"
            >
              <div className="flex-1 h-full min-w-fit">
                <h1 className="font-extrabold text-[32px] leading-8 mb-[12px] text-gray leading-[45px] mobile:text-[24px] mobile:mb-[6px]">
                  {title}
                </h1>
                <p className="mobile:hidden font-medium text-light-gray text-[16px] whitespace-pre-line leading-8">
                  {content}
                </p>
                <p className="hidden mobile:block font-medium text-light-gray whitespace-pre-line text-[14px] leading-7">
                  {mobileContent}
                </p>
              </div>
              <div className="mobile:max-w-[95px] mobile:flex-none">
                <Image src={image} alt="" />
              </div>
            </article>
          ))}
        </section>
        <div className="mobile:flex mobile:justify-center mobile:fixed mobile:w-full mobile:bottom-0 mobile:pb-[56px] mobile:pt-[90px] mobile:bg-backgroundButton">
          <button onClick={()=>router.push("/job")} className="font-extrabold leading-none text-[24px] bg-purple rounded-60 py-[18px] px-[95px] text-white shadow-[0_0_12px_0_rgba(121,120,132,0.15)] mobile:py-[16px] mobile:px-[108px] mobile:text-[16px] ">
            GNE와 함께하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default People;
