import Image from "next/image";

import culture1 from "assets/images/team_culture/culture1.png";
import culture2 from "assets/images/team_culture/culture2.png";
import culture3 from "assets/images/team_culture/culture3.png";
import culture4 from "assets/images/team_culture/culture4.png";
import quotationMark from "assets/images/team_culture/quotation_mark.png";

const CULTURES = [
  {
    title: "수평적 기업문화",
    content: "젊은 조직으로 수평적 문화를 지향합니다.",
    image: culture1,
  },
  {
    title: "업무효율을 위한 충분한 휴게시간 보장",
    content:
      "탄력 및 원격 근무\n주 5일 근무\n점심시간 1시간 30분\n자유로운 커피 브레이크",
    image: culture2,
  },
  {
    title: "자유로운 휴가사용",
    content:
      "연차휴가 외 5일의 특별휴가 제공\n(20일 이상 / 년)\n연차, 반차 당일 사용도 OK",
    image: culture3,
  },
  {
    title: "직원과 함께 성장하는 기업",
    content:
      "워크샵 / 외부 전문가 특강\n대표 면담을 통한 개인별 커리어패스 지원\n학위 취득 및 자격증 취득 지원\n업무에 필요한 도서 구매 제공",
    image: culture4,
  },
];

const Culture = () => {
  return (
    <section className="max-w-[1280px] mx-auto smLaptop:max-w-[558px]">
      <h2 className="mb-[82px] text-[40px] leading-[140%] font-extrabold text-dark-gray mobile:text-[28px] mobile:mb-[40px]">
        GNE 팀 문화를 <span className="mobile:block" />
        소개합니다
      </h2>
      {CULTURES.map(({ title, content, image }, index) => {
        const isEven = index === 1 || index === 3;
        return (
          <div
            key={index}
            className="flex gap-[48px] mb-[44px] smLaptop:flex-col smLaptop:gap-0 smLaptop:mb-[54px]"
          >
            <div
              className={`flex-1 max-w-[558px] ${
                isEven && "order-2 smLaptop:order-1"
              }`}
            >
              <Image src={image} alt="" className="laptop:w-full" />
            </div>
            <div
              className={`mt-[25px] flex-1 ${
                isEven && "order-1 ml-[70px] laptop:ml-0 smLaptop:order-2"
              }`}
            >
              <div className="laptop:flex items-center gap-[10px]">
                <div className="flex flex-col items-center justify-center w-[32px] h-[32px] rounded-[32px] bg-[#F1E5FA]">
                  <span className="text-[14px] leading-[140%] font-extrabold text-purple">
                    {index + 1}
                  </span>
                </div>
                <h2 className={`mt-[24px] text-[28px] leading-[140%] font-extrabold text-gray break-keep laptop:mt-[7px] mobile:text-[20px] ${index != 1 ? "mobile:h-[32px] " :"mobile:h-[52px] " }`}>
                  {title}
                </h2>
              </div>
              <div className="laptop:flex gap-[9px]">
                <span className="block mt-[27px] laptop:mt-[18px]">
                  <Image src={quotationMark} alt="" />
                </span>
                <p className="mt-[18px] text-[16px] leading-[140%] font-medium text-[#4B5563] whitespace-pre">
                  {content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Culture;
