import Image from "next/image";

import solutionImg1 from "assets/images/wide_eyes/solution_img1.png";
import solutionImg2 from "assets/images/wide_eyes/solution_img2.png";
import solutionImg3 from "assets/images/wide_eyes/solution_img3.png";
import wideEyesText from "assets/images/wide_eyes/wide_eyes.png";

const PROHIBIT_LIST = [
  "OFAC",
  "UN",
  "EU",
  "KOFIU",
  "MAS",
  "HKMA",
  "글로벌 PEPs",
];

const SOLUTION_LIST = [
  {
    title: "사용자 편의성",
    content:
      "강력한 기능과 사용자 친화적인 인터페이스를 제공합니다. 직관적인 UI를 통해 복잡한 단계 없이 워치리스트에 쉽게 접근할 수 있도록 합니다.",
    image: solutionImg1,
  },
  {
    title: "빠른 지원",
    content:
      "최신 KOFIU 제재가 업무에 어떻게 영향을 미치는지에 대한 명확한 가이드라인을 제시하며, 고객사의 환경에  맞는 주한공관 리스트, MOFA 리스트 등을 제공합니다",
    image: solutionImg2,
  },
  {
    title: "AML교육",
    content:
      "WIDE EYES는 AML교육의 중요성에 주목하며, 전문가들이 참여하는 고품질 AML 교육 프로그램을 제공합니다.",
    image: solutionImg3,
  },
];

const Solution = () => {
  return (
    <section className="w-full bg-[#0F0F0F] pt-[140px] pb-[264px] px-[24px] mobile:pt-[70px] mobile:pb-[90px]">
      <div className="flex justify-between max-w-[900px] mx-auto smLaptop:flex-col smLaptop:items-center">
        <div className="">
          <h2 className="text-[32px] leading-[140%] font-extrabold text-white smLaptop:text-center mobile:text-[24px]">
            효율성과 정확성이 중요한
            <br />
            금융 업계를 위한 <br className="hidden mobile:block" />
            완벽한 AML 솔루션
          </h2>
          <p className="mt-[26px] text-[16px] leading-[140%] text-white break-keep smLaptop:text-center mobile:text-[14px]">
            특정 금융 거래 정보의 보고 및 <br className="hidden mobile:block" />
            이용 등에 관한 법률 / 자금 세탁 방지 및 <br />
            공중 협박 자금에 관한 업무 규정에 관한
            <br />
            업무 규정 제 43조에 의거하여 <br className="hidden mobile:block" />
            통합된 제재리스트를 제공합니다.
          </p>
        </div>
        <div className="smLaptop:mt-[48px]">
          <div className="w-[250px] mobile:w-[214px]">
            <div className="relative h-[56px] rounded-tr-[8px] rounded-tl-[8px]  bg-gradient-to-r from-[#FFFFFF] to-white-400">
              <div className="absolute bg-[#6f6f6f] w-[calc(100%-2px)] h-[calc(100%-2px)] top-px left-px rounded-tr-[8px] rounded-tl-[8px] flex flex-col items-center justify-center">
                <h2 className="text-[16px] leading-[140%] font-extrabold text-white mobile:text-[13px]">
                  Wide Eyes 제재 리스트 목록
                </h2>
              </div>
            </div>
            <div className="bg-white-500 px-[36px] py-[25px] rounded-br-[8px] rounded-bl-[8px]">
              {PROHIBIT_LIST.map((prohibit) => (
                <p
                  key={prohibit}
                  className="text-[16px] leading-[140%] text-white font-medium mobile:text-[13px]"
                >
                  {prohibit}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto flex gap-[20px] mt-[173px] laptop:flex-col laptop:items-center mobile:mt-[80px]">
        {SOLUTION_LIST.map(({ title, content, image }, index) => (
          <div
            key={title}
            className="flex-1 max-w-[413px] bg-white border border-[#D1D5DB] rounded-[20px] px-[36px] py-[40px] mobile:py-[30px] mobile:px-[28px]"
          >
            <h2 className="mb-[18px] text-[24px] leading-[140%] font-extrabold mobile:text-[22px] mobile:mb-[14px]">
              {title}
            </h2>
            <p className="mb-[18px] text-[16px] leading-[140%] font-medium mobile:text-[12px] mobile:mb-[14px]">
              {content}
            </p>
            <div className={`${index === 2 && "mt-[58px] mobile:mt-[40px]"}`}>
              <Image src={image} alt="" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[147px] flex flex-col text-center items-center mobile:mt-[90px]">
        <h2 className="mb-[87px] mobile:mb-[60px]">
          <Image src={wideEyesText} alt="wide eyes" width={218} height={64} />
        </h2>
        <p className="mb-[60px] text-[16px] leading-[180%] font-semibold text-white break-keep">
          풍부한 정보에서 오는 통찰력을 의미합니다. <br />
          광범위한 제재 목록을 지속적으로 모니터링하고 <br />
          금융 제재 정보를 쉽게 이해하고 <br className="hidden mobile:block" />
          활용할 수 있도록 노력합니다.
        </p>
        <p className="mt-[42px] text-[16px] leading-[180%] font-semibold text-white">
          -
        </p>
        <p className="mt-[12px] text-[16px] leading-[140%] text-white">
          자금세탁방지 담당자 : 이창우
        </p>
        <p className="text-[16px] leading-[140%] text-white">
          Email : daniel.lee@gne.ai
        </p>
      </div>
    </section>
  );
};

export default Solution;
