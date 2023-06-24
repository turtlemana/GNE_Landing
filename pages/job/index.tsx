import Link from "next/link";
import Image from "next/image";
import { useState,useMemo,useEffect } from "react";
import { MENUS, DATAS } from "datas/job";
import { GetServerSidePropsContext } from "next";

import search from "assets/icons/job/search.svg";
import check from "assets/icons/job/check.svg";
import uncheck from "assets/icons/job/uncheck.svg";
import rightArrow from "assets/icons/job/rightArrow.svg";
import leftArrow from "assets/icons/job/leftArrow.svg";
import down from "assets/icons/job/down.svg";
import up from "assets/icons/job/up.svg";
import cs from "assets/icons/job/cs.svg";

interface Props {
  id: number;
  title: string;
  content: string;
  tags:string;
}

const Job = ({recruit}:any) => {
  // const [selectedType, setSelectedType] = useState<string>("전체")
  const [selectedCompany, setSelectedCompany] = useState<string>("전체")
  const [selectedPosition, setSelectedPosition] = useState<string>("전체")
  const keys = ["type", "company", "position","exp"];
  const titles = ["직군", "계열사", "형태", "경력"];
  const [selectedType, setSelectedType] = useState<string>("전체");
  const [selectedExp, setSelectedExp] = useState<string>("전체");
  const [searchInput, setSearchInput] = useState<string>("");

  const [selectedFilters, setSelectedFilters] = useState<{type?: string, company?: string, position?: string, exp?: string}>({
    type: "전체",
    company: "전체",
    position: "전체",
    exp: "전체"
  });

  const makeTypeList = (recruit: any[], key: string) => {
    // ensure recruit is an array
    const types = Array.isArray(recruit) ? recruit.map((job: any) => job[key] as string) : [];
  
  
  
    types.unshift("전체");
    return Array.from(new Set<string>(types));
  };
  
  const allTypes = useMemo(() => {
    return Array.isArray(keys) ? keys.map((key, index) => {
      const types = makeTypeList(recruit, key);
      // Add experience levels for "경력"

      return { title: titles[index], menu: types };
    }) : [];
  }, [recruit]);
  

  const [openFilter, setOpenFilter] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [selectState, setSelectState] = useState("");


  const sortedJobs = useMemo(() => {
    // Ensure recruit is an array
    let result = Array.isArray(recruit) ? recruit : [];
  
    // Filter based on the selected type
    if (selectedType !== "전체") {
      result = result.filter((job: any) => job.type === selectedType);
    }

    // Filter based on the selected company
    if (selectedCompany !== "전체") {
      result = result.filter((job: any) => job.company === selectedCompany);
    }

    // Filter based on the selected position
    if (selectedPosition !== "전체") {
      result = result.filter((job: any) => job.position === selectedPosition);
    }

    if (selectedExp !== "전체") {
      result = result.filter((job: any) => job.exp === selectedExp);
    }


    // Filter based on the search input
    if (searchInput !== "") {
      const keysToSearchIn = ['title', 'tags', 'position', 'company', 'type'];
      
      result = result.filter((job: any) =>
        keysToSearchIn.some(key =>
          job[key] && typeof job[key] === "string" && job[key].toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  
    return result;
  }, [selectedType, selectedExp,selectedCompany, selectedPosition, recruit, searchInput]);

  
  

  return (
    <div
      className={`bg-background mobile:bg-none bg-[#FCFCFF] bg-cover bg-no-repeat bg-right-top pt-[80px] pb-[133px] px-[20px] mobile:pt-[36px] mobile:px-[24px] 
       `}
    >
      <div className="relative max-w-[800px] mx-auto">
        <div className="border border-purple w-[414px] h-[40px] rounded-20 bg-white flex items-center px-[14px] mx-auto mb-[75px] mobile:mb-0 mobile:max-w-full">
          <Image src={search} alt="" className="mr-[8px]" />
          <input
                    value={searchInput}
                    onChange={(e)=>setSearchInput(e.target.value)}
                    type="text"
            placeholder="직무명, 기술 스택, 주요 업무 등을 검색해보세요."
            className="w-full text-[14px]"
          />
        </div>
        {openFilter ? (
          <div className="mt-[36px]">
            <div
              onClick={() => setOpenSelect((prev) => !prev)}
              className={`relative flex justify-between mb-[16px] py-[10px] px-[12px] border rounded-[20px] text-[#4b5563] text-[14px] 
              ${openSelect ? "border-purple" : "border-[#e5e7eb]"}`}
            >
              {selectState || "직군"}
              {openSelect ? (
                <Image src={up} alt="" />
              ) : (
                <Image src={down} alt="" />
              )}
              {openSelect && (
                <div className="absolute top-[45px] py-[12px] px-[8px] bg-white w-full left-0 border border-[#e5e7eb] rounded-[20px] shadow-[0_0_12px_0_rgba(121,120,132,0.15)]">
                  <p
                    onClick={() => setSelectState("전체")}
                    className="text-[14px] leading-[20px] text-[#111111] py-[6px] px-[12px] mb-[4px]"
                  >
                    전체
                  </p>
                  <p
                    onClick={() => setSelectState("Data")}
                    className="text-[14px] leading-[20px] text-[#111111] py-[6px] px-[12px] mb-[4px]"
                  >
                    Data
                  </p>
                  <p
                    onClick={() => setSelectState("Engineering")}
                    className="text-[14px] leading-[20px] text-[#111111] py-[6px] px-[12px] mb-[4px]"
                  >
                    Engineering
                  </p>
                  <p
                    onClick={() => setSelectState("Business")}
                    className="text-[14px] leading-[20px] text-[#111111] py-[6px] px-[12px]"
                  >
                    Business
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-between mb-[16px] py-[10px] px-[12px] border border-[#e5e7eb] rounded-[20px] text-[#4b5563] text-[14px]">
              계열사
              <Image src={down} alt="" />
            </div>
            <div className="mb-[342px] flex justify-between py-[10px] px-[12px] border border-[#e5e7eb] rounded-[20px] text-[#4b5563] text-[14px]">
              고용센터
              <Image src={down} alt="" />
            </div>
            <button
              onClick={() => setOpenFilter(false)}
              className="font-extrabold w-full leading-none text-[16px] bg-purple rounded-60 py-[16px] text-white shadow-[0_0_12px_0_rgba(121,120,132,0.15)] "
            >
              검색하기
            </button>
          </div>
        ) : (
          <div className="mt-[50px]">
            <div className="max-w-[1280px] mx-auto flex min-h-[650px]">
            <section className="w-[196px] mr-[36px] h-full mobile:hidden">
        {allTypes.map(({ menu, title },i) => (
          <div className="text-[16px] mb-[48px]" key={i}>
            <h1 className="font-semibold mb-[16px]">{title}</h1>
            {menu.map((detail,i) => (
              <button
                className="flex gap-[8px] items-center text-light-gray font-medium mb-[12px]"
                key={i}
                onClick={() => {
                  switch (title) {
                    case "직군":
                      setSelectedType(detail);
                      break;
                    case "계열사":
                      setSelectedCompany(detail);
                      break;
                    case "형태":
                      setSelectedPosition(detail);
                      break;
                    case "경력":
                        setSelectedExp(detail);
                      break;
                    default:
                      break;
                  }
                }}
              >
                {(title === "직군" && selectedType === detail) || 
                 (title === "계열사" && selectedCompany === detail) ||
                 (title === "형태" && selectedPosition === detail)||
                 (title === "경력" && selectedExp === detail) ? (
                  <Image src={check} alt="" />
                ) : (
                  <Image src={uncheck} alt="" />
                )}
    {title === "경력" ? (detail === "0" ? "신입" : detail ==="전체" ? "전체"  : `${detail}년 이상`) : detail}
              </button>
            ))}
          </div>
        ))}
      </section>
              <section className="mb-[140px]">
                {sortedJobs.map(({ id, title, content,tags }: Props) => (
                  <article
                    key={id}
                    className={`
              ${sortedJobs.length - 1 !== id && "py-5 mb-[48px] mobile:mb-[42px]"} 
              cursor-pointer `}
                  >
                    <Link href={`job/${id}`}>
                      <h1 className="font-extrabold text-[24px] leading-none mb-[8px] text-gray laptop:text-[20px]">
                        {title}
                      </h1>
                      <div className="flex gap-[8px] mb-[40px] mt-6 ">
  {tags.slice(1, -1).split(',').map((tag, index) => (
    <div key={index} className="text-md rounded-[36px] border border-[#e5e6e7] py-[8px] px-[12px] text-lighter-gray font-bold ">
      {tag.trim()}
    </div>
  ))}
</div>
                    </Link>
                  </article>
                ))}
              </section>
            </div> {!openFilter && (
          <div onClick={() => {
            window.open('https://open.kakao.com/o/sy0BmPqf', '_blank')
          }} className="right-[5%] bottom-[5%] flex flex-col items-center cursor-pointer fixed">
            <div className="bg-purple rounded-[8px] shadow-[0_0_12px_0_rgba(121,120,132,0.15)] w-[84px] h-[55px] text-white text-medium font-sm flex justify-center items-center">
              채용팀에
              <br />
              문의하기
            </div>
            <Image src={cs} alt="" />
          </div>
        )}
            {/* <div className="flex items-center gap-[12px] mx-auto w-[264px] mobile:hidden">
              <Image src={leftArrow} alt="" />
              <div className="flex gap-[4px]">
                <button className="text-[12px] font-semibold bg-light-purple w-[32px] h-[32px] border flex items-center justify-center rounded-20 border-purple text-purple">
                  1
                </button>
                <button className="text-[12px] font-normal bg-white w-[32px] h-[32px] border flex items-center justify-center rounded-20 border-[#e5e7eb] text-light-gray">
                  2
                </button>
                <button className="text-[12px] font-normal bg-white w-[32px] h-[32px] border flex items-center justify-center rounded-20 border-[#e5e7eb] text-light-gray">
                  3
                </button>
                <button className="text-[12px] font-normal bg-white w-[32px] h-[32px] border flex items-center justify-center rounded-20 border-[#e5e7eb] text-light-gray">
                  ...
                </button>
                <button className="text-[12px] font-normal bg-white w-[32px] h-[32px] border flex items-center justify-center rounded-20 border-[#e5e7eb] text-light-gray">
                  5
                </button>
              </div>
              <Image src={rightArrow} alt="" />
            </div> */}
          </div>
        )}
       
      </div>
    </div>
  );
};

export default Job;



export async function getServerSideProps(context:GetServerSidePropsContext) {

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getPost?postType=RECRUIT`)
  const recruit =await res.json()

  return {props :{recruit}}
}
