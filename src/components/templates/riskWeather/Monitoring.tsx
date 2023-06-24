import Image from "next/image";

import monitoring from "assets/images/risk_weather/monitoring.png";
import monitoringMobile from "assets/images/risk_weather/monitoringMobile.png";
import logo from "assets/images/risk_weather/logo.png";
import weatherCloud from "assets/images/risk_weather/weather_cloud.png";
import weatherLightning from "assets/images/risk_weather/weather_lightning.png";
import weatherRain from "assets/images/risk_weather/weather_rain.png";
import weatherSunshine from "assets/images/risk_weather/weather_sunshine.png";
import weatherSunshineCloud from "assets/images/risk_weather/weather_sunshine_cloud.png";
import weatherTornado from "assets/images/risk_weather/weather_tornado.png";
import weatherVolcano from "assets/images/risk_weather/weather_volcano.png";

const WEATHERS1 = [weatherSunshineCloud, weatherCloud, weatherSunshine];
const WEATHERS2 = [
  weatherRain,
  weatherVolcano,
  weatherTornado,
  weatherLightning,
];

const Monitoring = () => {
  return (
    <section className="w-full bg-[#F9FAFF] bg-backgroundRiskWeather2 bg-cover mobile:bg-[length:120%_70%] bg-no-repeat bg-bottom overflow-hidden px-[20px]">
      <div className="text-center flex flex-col items-center">
        <div className="mt-[116px] mobile:mt-[87px] mobile:w-[138px]">
          <Image src={logo} alt="" />
        </div>

        <h2 className="mt-[40px] text-[48px] leading-[140%] font-extrabold mobile:mt-[30px] mobile:text-[24px]">
          세계 주요 투자은행과 증권사의 <span className="laptop:block" />
          리스크 측정 모델을 통해
          <br />
          여러분의 포트폴리오가 <span className="laptop:block" /> 안전한지
          확인해요
        </h2>
        <p className="mt-[42px] text-[16px] leading-[140%] font-semibold text-[#989898] mobile:mt-[30px] mobile:text-[14px]">
          전세계 투자 자산의 리스크를 <br />한 눈에 확인해보세요
        </p>

        <div className="flex gap-[15px] laptop:flex-col mt-[117px] mobile:mt-[44px]">
          <ul className="flex gap-[15px] justify-center">
            {WEATHERS1.map((weather, index) => (
              <li
                key={index}
                className="w-[154px] h-[110px] bg-white-400 rounded-lg flex flex-col items-center justify-center mobile:w-[47px] mobile:h-[33px]"
              >
                <Image src={weather} alt="" className="mobile:w-[25px]" />
              </li>
            ))}
          </ul>
          <ul className="flex gap-[15px] justify-center">
            {WEATHERS2.map((weather, index) => (
              <li
                key={index}
                className="w-[154px] h-[110px] bg-white-400 rounded-lg flex flex-col items-center justify-center mobile:w-[47px] mobile:h-[33px]"
              >
                <Image src={weather} alt="" className="mobile:w-[25px]" />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[140px] mobile:mt-[49px]">
          <Image src={monitoring} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Monitoring;
