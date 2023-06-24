import boardImg from "assets/images/team_culture/board.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { REPORTS } from "datas/report";



const Report = ({news}:{news:any}) => {
  const router = useRouter();

  return (
    <section className="max-w-[1280px] mx-auto mt-[370px] laptop:mt-[80px] ">
      <h2 className="mb-[82px] text-[40px] leading-[140%] font-extrabold text-dark-gray laptop:mb-[40px] mobile:text-[28px]">
        팀 소식, <span className="laptop:block" />
        보도자료 게시판
      </h2>
      <div className="grid grid-cols-3 gap-y-[68px] gap-x-[22px] smLaptop:grid-cols-2 mobile:gap-x-[9px] mobile:gap-y-[12px]">
        {news?.map(({ id, title, create_dt, thumbnail }:{id:number; title:string; create_dt:string; thumbnail:string;}) => (
          <div
            key={id}
            onClick={() => router.push(`/team_culture/${id}`)}
            className="rounded-[20px] border border-[#D1D5DB] cursor-pointer mobile:rounded-[7px]"
          >
            <div className="relative h-[316px] rounded-tr-[20px] rounded-tl-[20px] overflow-hidden mobile:h-[230px] smMobile:max-h-[121px] smMobile:h-full mobile:rounded-tr-[7px] mobile:rounded-tl-[7px]">
              <Image quality={100} width={1000} height={1000} src={thumbnail} alt="" className="absolute w-full h-full" />
            </div>
            <div className="px-[30px] py-[20px] mobile:pt-[12px] mobile:pr-[18px] mobile:pb-[18px] mobile:pl-[10px]">
              <h3 className="mt-[24px] text-[24px] leading-[140%] font-semibold text-gray overflow-ellipsis overflow-hidden line-clamp-2 mobile:text-[14px] mobile:mt-0">
                {title}
              </h3>
              <p className="mt-[12px] text-[16px] leading-[140%] font-medium text-[#BDBDBD] mobile:mt-[5px] mobile:text-[10px]">
                {create_dt.split("T")[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Report;
