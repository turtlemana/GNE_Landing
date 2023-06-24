import Image from "next/image";
import money from "assets/images/risk_weather/money.png";
import arrow from "assets/images/risk_weather/arrow.png";
import blueArrow from "assets/images/risk_weather/blueArrow.svg";
import Link from 'next/link'

const Introduce = () => {
  return (
    <section className="w-full h-[960px] mobile:h-[720px] bg-backgroundRiskWeather1 bg-cover bg-no-repeat bg-center">
      <div className="h-full flex flex-col justify-center items-center relative">
        <p className="text-[64px] text-white font-extrabold w-full text-center mobile:leading-none mobile:text-[32px]">
          내 투자자산은 <span className="mobile:block mobile:my-[10px]" />
          안전할까요?
          <span className="mt-[42px] mb-[60px] flex justify-center mobile:my-[5px]">
            <Image
              src={money}
              alt=""
              className="mobile:w-[208px] mobile:h-[177px]"
            />
          </span>
        </p>
        <p className="text-center text-white text-[20px] leading-[160%] mobile:text-[14px]">
          가상화폐 가격은 변동성이 극단적으로 높고 금융, 규제 등
          <span className="mobile:block" />
          외부 요인의
          <span className="block mobile:inline" />
          영향을 많이 받을 수 있어{" "}
          <span className="mobile:block" />
          일반사람들이 리스크를 예측하기 어렵습니다.
          <span className="block" />또 한 리스크 정보는 이해하기 어려워
          <span className="mobile:block" />
          전문가 집단만이 제한적으로 활용하고 있습니다.
        </p>
        <Link href="https://riskweather.io" target="_blank" className={'mt-16 flex justify-center items-center  w-[350px] mobile:w-[308px] ml-2  py-5 px-10 mr-2  text-xl font-extrabold text-[#0198FF] shadow-md focus:outline-none bg-white rounded-full border-2  border-gray-300  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'}>{"투자 리스크 확인하기"}
        <Image
                src={blueArrow}
                alt=""
                className=" w-5 cursor-pointer ml-3 -rotate-90"
              />
    </Link>
        <span className="absolute bottom-[11px]">
          <Image src={arrow} alt="" className="mobile:w-[91px]" />
        </span>
      </div>
    </section>
  );
};

export default Introduce;
