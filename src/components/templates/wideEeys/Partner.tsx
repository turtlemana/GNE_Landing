import Image from "next/image";
import partner1 from "assets/images/wide_eyes/partner1.png";

const Partner = () => {
  return (
    <section className="bg-[#1b1b1b] pt-[80px] pb-[110px] text-center px-[24px] mobile:pt-[70px] mobile:pb-[90px]">
      <h2 className="mb-[60px] text-[16px] leading-[140%] font-semibold text-white">
        Partners
      </h2>
      <div className="flex gap-[20px] justify-center mobile:gap-[10px]">
        <div className="flex flex-col items-center justify-center w-[197px] h-[100px] px-[25px] bg-white rounded-[10px] mobile:w-[100px] mobile:h-[50px] mobile:px-[12px] mobile:rounded-[5px]">
          <Image src={partner1} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center w-[197px] h-[100px] px-[25px] bg-white rounded-[10px] mobile:w-[100px] mobile:h-[50px] mobile:px-[12px] mobile:rounded-[5px]">
          <Image src={partner1} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Partner;
