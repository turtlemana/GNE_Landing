import Image from "next/image";

import guide1 from "assets/images/risk_weather/guide1.png";
import guide1Mobile from "assets/images/risk_weather/guide1Mobile.png";
import guide2 from "assets/images/risk_weather/guide2.png";
import guide2Mobile from "assets/images/risk_weather/guide2Mobile.png";
import guide3 from "assets/images/risk_weather/guide3.png";
import guide3Mobile from "assets/images/risk_weather/guide3Mobile.png";
import blueArrow from "assets/images/risk_weather/blueArrow.svg";
import Link from 'next/link'

const Guide = () => {
  return (
    <section className="bg-[#F7F9FF] pt-[200px] pb-[360px] mobile:pt-[63px] mobile:pb-[80px]">
      <div className="flex items-center gap-[58px] px-[24px] laptop:flex-col-reverse mobile:gap-[30px] mobile:mb-[63px]">
        <div className="flex-1 flex flex-col items-end">
          <Image src={guide1} alt="" className="laptop:hidden" />
          <Image src={guide1Mobile} alt="" className="hidden laptop:block" />
        </div>
        <div className="flex-1 mobile:w-full">
          <h2 className="mb-[32px] text-[48px] leading-[140%] font-semibold text-black mobile:text-[24px] mobile:mb-[10px]">
            누구든 한눈에
            <span className="block text-[48px] leading-[140%] font-extrabold text-blue mobile:text-[24px]">
              이해하기 쉬운 직관적인 UI
            </span>
          </h2>
          <p className="block text-[20px] leading-[160%] text-light-gray mobile:text-[12px]">
            금융 상품의 리스크 수준 4단계로 분류 제공
            <br />
            자산의 미래 위험도 날씨예보 형식으로 시각화 제공
          </p>
        </div>
      </div>

      <div className="flex items-center gap-[58px] pl-[24px] laptop:flex-col mobile:gap-[45px]">
        <div className="flex-1 flex flex-col items-end mobile:w-full mobile:items-start">
          <div>
            <h2 className="mb-[32px] text-[48px] leading-[140%] font-semibold mobile:text-[24px] mobile:mb-[10px]">
              자산의 최대 RISK
              <span className="block text-[48px] leading-[140%] font-extrabold text-blue mobile:text-[24px]">
                포트폴리오로 <span className="mobile:block" />
                효과적으로 관리해요
              </span>
            </h2>
            <p className="block text-[20px] leading-[160%] text-light-gray mobile:text-[12px]">
              Crypto, Stock, Index가 포함된 포트폴리오의 리스크 정보 제공
              <br />
              클릭 한 번에 최신 통화환율 기준으로 업데이트 된 리스크 어디서든
              확인 가능
            </p>
            <div className="bg-[#d2dfff] w-fit px-[11px] py-[4px] rounded-[13px] text-blue font-semibold mt-[16px] mobile:mt-[7px]">
              포트폴리오 리밸런싱 서비스가 준비중입니다.
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center laptop:items-center laptop:pr-[20px]">
          <Image src={guide2} alt="" className="laptop:hidden" />
          <Image src={guide2Mobile} alt="" className="hidden laptop:block" />
        </div>
      </div>

      <div className="flex items-center gap-[58px] px-[24px] laptop:flex-col-reverse mobile:mt-[124px] mobile:gap-[40px]">
        <div className="flex-1 flex flex-col items-end">
          <Image src={guide3} alt="" className="laptop:hidden" />
          <Image src={guide3Mobile} alt="" className="hidden laptop:block" />
        </div>
        <div className="flex-1 mobile:w-full">
          <h2 className="mb-[32px] text-[48px] leading-[140%] font-semibold mobile:text-[24px] mobile:mb-[10px]">
            예측하기 어려운 자산 RISK
            <span className="block text-[48px] leading-[140%] font-extrabold text-blue mobile:text-[24px]">
              조기경보로 사전에 대비하세요
            </span>
          </h2>
          <p className="block text-[20px] leading-[160%] text-light-gray mobile:text-[12px]">
            GNE 금융 전문가들의 연구를 통해
            <br />
            RWI가 커질수록 자산의 리스크가 커지는 특성 도출
            <br />
            RWI와 EWI를 실시간으로 비교해
            <span className="block laptop:inline laptop:ml-[5px]" />
            사용자에게 리스크 특보 제공
          </p>
          <Link href="https://riskweather.io" target="_blank" className={'mt-10 flex justify-center items-center  w-[350px]   py-5 px-10 mr-2  text-xl font-extrabold text-[#0198FF] shadow-md focus:outline-none bg-white rounded-full border-2  border-gray-300  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'}>{"투자 리스크 확인하기"}
        <Image
                src={blueArrow}
                alt=""
                className=" w-5 cursor-pointer ml-3 -rotate-90"
              />
    </Link>
        </div>

      </div>
      
    </section>
  );
};

export default Guide;
