import Image from "next/image";

import state1 from "assets/images/risk_weather/state1.png";
import state2 from "assets/images/risk_weather/state2.png";
import state3 from "assets/images/risk_weather/state3.png";
import state4 from "assets/images/risk_weather/state4.png";

const STATES = [
  {
    title: "MAU",
    subTitle: "100만 +",
    image: state1,
    background: "bg-backgroundState1",
  },
  {
    title: "가입자",
    subTitle: "100만 +",
    image: state2,
    background: "bg-backgroundState2",
  },
  {
    title: "투자금액",
    subTitle: "100만 +",
    image: state3,
    background: "bg-backgroundState3",
  },
  {
    title: "대형증권",
    subTitle: "고객사 보유",
    image: state4,
    background: "bg-backgroundState4",
  },
];

const State = () => {
  return (
    <section className="bg-[#F2F6FF] py-[150px] px-[23px] mobile:py-[50px]">
      <div className="flex justify-center flex-wrap gap-x-[68px] gap-y-[64px] max-w-[842px] mx-auto lgMobile:flex-col lgMobile:items-center mobile:max-w-[320px] mobile:gap-[16px]">
        {STATES.map(({ title, image, subTitle, background }) => {
          return (
            <div
              key={title}
              className={`flex flex-col justify-between w-[380px] h-[460px] bg-cover bg-no-repeat bg-center px-[34px] py-[37px] rounded-[20px] mobile:h-[182px] mobile:rounded-[7px] mobile:w-[150px] mobile:px-[14px] mobile:py-[16px] mobile:rounded-[7px] ${background} `}
            >
              <div>
                <Image
                  src={image}
                  alt={title}
                  className="mobile:max-h-[38px] mobile:max-w-[54px] mobile:w-auto"
                />
              </div>
              <div>
                <p className="text-white text-[48px] leading-[120%] font-extrabold mobile:text-[19px]">
                  {title}
                  <br />
                  {subTitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default State;
