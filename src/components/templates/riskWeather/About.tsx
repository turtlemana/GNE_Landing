import Image from "next/image";
import logoWhite from "assets/images/risk_weather/logo_white.png";

const About = () => {
  return (
    <section className="bg-[#0036C1] bg-backgroundGradient px-[24px] py-[184px] mobile:pt-[56px] mobile:pb-[51px] relative">
      <div className="max-w-[842px] mx-auto">
        <div className="mb-[82px] mobile:mb-[41px]">
          <Image
            src={logoWhite}
            alt="risk weather"
            className="mobile:max-w-[159px]"
          />
        </div>
        <p className="mb-[25px] text-[20px] leading-[160%] font-medium text-white mobile:text-[14px] mobile:mb-[20px]">
          리스크웨더는
          <span className="text-[20px] leading-[160%] font-extrabold text-white mobile:text-[14px] ml-[5px]">
            전 세계 투자 자산의 리스크를 한눈에 <br />
            확인할 수 있는 리스크 관리 플랫폼입니다.
          </span>
        </p>
        <p className="mb-[25px] text-[20px] leading-[160%] font-medium text-white mobile:text-[14px] mobile:mb-[20px]">
          비전문가를 타겟 고객으로 하는 B2C 서비스이기에 <br />
          일반적인 사용자에게 높은 사용성을 제공합니다.
        </p>
        <p className="text-[20px] leading-[160%] font-medium text-white mobile:text-[14px]">
          또한 기존 서비스 보다 발전된 금융공학 모델(NTS-ARMA-GARCH)을 <br />
          활용하여 투자에 유용한 정보를 제공합니다.
        </p>
      </div>
      <div className="bg-backgroundRiskWeather3 mobile:bg-backgroundRiskWeather3Mobile bg-cover bg-no-repeat bg-left absolute max-w-[60%] w-full h-full top-0 right-0" />
    </section>
  );
};

export default About;
