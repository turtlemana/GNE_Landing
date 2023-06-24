import Image from "next/image";
import wideEyesText from "assets/images/wide_eyes/wide_eyes.png";
import arrow from "assets/images/risk_weather/arrow.png";

const Visual = () => {
  return (
    <section className="relative w-full bg-backgroundWideEyes mobile:bg-backgroundWideEyesMobile bg-cover bg-no-repeat bg-center pt-[177px] pb-[111px] px-[24px] mobile:pt-[163px] mobile:pb-[13px] mobile:h-[670px]">
      <div className="max-w-[1280px] mx-auto mobile:flex-1">
        <h2 className="text-[24px] leading-[140%] font-extrabold text-white mobile:text-[20px]">
          금융 제재 리스트의 새로운 패러다임
        </h2>
        <h3 className="my-[30px] mobile:w-[214px] mobile:mt-[20px] mobile:mb-[40px]">
          <Image src={wideEyesText} alt="wide eyes" />
        </h3>
        <p className="text-[18px] leading-[180%] text-white break-keep mobile:text-[16px]">
          가상자산 거래소부터 모든 금융 기관에게{" "}
          <br className="hidden mobile:block" />
          AML이 더 이상 장애가 되지 않도록 돕습니다.
          <br />
          신속함과 정확함이 만나는 곳, <br className="hidden mobile:block" />
          Wide Eyes와 함께 규제 준수를 <br className="hidden mobile:block" />
          더욱 효율적이고 안전하게 만들어보세요
        </p>
      </div>
      <div className="absolute bottom-[13px] left-0 w-full flex justify-center">
        <Image src={arrow} alt="" className="w-[92px] hidden mobile:block" />
      </div>
    </section>
  );
};

export default Visual;
