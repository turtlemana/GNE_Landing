import { useState,useMemo,useCallback } from "react";
import Image from "next/image";

import { MENUS, DATAS } from "datas/faq";
import search from "assets/icons/job/search.svg";
import rightArrow from "assets/icons/job/rightArrow.svg";
import leftArrow from "assets/icons/job/leftArrow.svg";
import { GetServerSidePropsContext } from "next";

interface Props {
  id: number;
  title: string;
  type: string;
  content:string; 
  priority:number;
}

const FAQ = ({faq}:any) => {
  const [selectedType, setSelectedType] = useState<string>("전체")
  const [selectedTab, setSelectedTab] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const handleSelect = (id: number) => {
    if (selectedTab.includes(id)) {
      const newTab = selectedTab.filter((tab) => tab !== id);
      setSelectedTab(newTab);
    } else {
      setSelectedTab([...selectedTab, id]);
    }
  };

  const faqTypes = useMemo(() => {
    const types = faq?.map((qna: any) => qna.type as string) || [];
    types.unshift("전체");
    return Array.from(new Set<string>(types));
  }, [faq]);
  
  const sortedFaq = useMemo(() => {
    if (!faq) {
      return [];
    }
    let result = faq;
    if (selectedType !== "전체") {
      result = result.filter((qna: any) => qna.type === selectedType);
    }
    if (searchInput !== "") {
      result = result.filter((qna: any) => qna.title.includes(searchInput));
    }
    return result;
  }, [selectedType, faq, searchInput]);


  return (
    <div className="bg-background mobile:bg-none bg-[#FCFCFF] bg-cover bg-no-repeat bg-right-top pt-[80px] pb-[133px] px-[24px] mobile:pt-[36px] mobile:px-0">
      <div className="w-[880px] mx-auto h-full laptop:max-w-[640px] mobile:w-full">
        <div className="border border-purple w-[414px] h-[40px] rounded-20 bg-white flex items-center px-[14px] mx-auto mb-[40px] mobile:mb-[32px] mobile:w-full mobile:max-w-[calc(100%-48px)]">
          <Image src={search} alt="" className="mr-[8px]" />
          <input
          value={searchInput}
          onChange={(e)=>setSearchInput(e.target.value)}
          type="text"
            placeholder="무엇이든 찾아보세요."
            className="w-full text-[14px]"
          />
        </div>
        <div className="max-w-[1280px] mx-auto flex min-h-[780px] laptop:flex-col">
          <section className="w-[196px] mr-[36px] h-full pt-[25px] laptop:hidden">
            {faqTypes?.map((types:string,i:number) => (
              <h1
              onClick={()=>setSelectedType(types)}
                key={i}
                className={`text-[16px] mb-[32px] cursor-pointer
                ${selectedType === types 
                ? "text-purple font-extrabold"
                : "text-light-gray font-semibold"
                }
                `}
              >
                {types}
              </h1>
            ))}
          </section>
          <h1 className="hidden text-[28px] leading-none mb-[24px] laptop:block mobile:mx-[24px]">
            자주 묻는 질문
          </h1>
          <section className="hidden w-full gap-[6px] h-[36px] mb-[42px] laptop:flex mobile:mx-[24px] overflow-auto scrollbar-hide">
            {faqTypes?.map((types:string,i:number) => (
              <div
              onClick={()=>setSelectedType(types)}
                key={i}
                className={`  py-[8px] px-[10px] h-[36px] min-w-fit rounded-[20px] flex items-center border border-[#e5e7eb] cursor-pointer
                ${selectedType === types 
                  ? "bg-purple border-purple"
                  : ""
                  }
          
                `}
              >
                <h1
                  className={`text-[14px]  
                  ${selectedType === types 
                    ? "text-white font-extrabold"
                    : "text-lighter-gray font-semibold"
                    }
                
                  `}
                >
                  {types}
                </h1>
              </div>
            ))}
          </section>
          <section className="w-[630px] mobile:w-full">
            {sortedFaq?.map(({ id, title, content }: Props) => (
              <article key={id} className="mb-[8px]">
                <div
                  onClick={() => handleSelect(id)}
                  className="flex font-medium text-[16px] text-dark-gray h-[60px] items-center cursor-pointer mobile:mx-[24px]"
                >
                  <p className="font-medium text-[16px] text-lighter-gray mr-[10px]">
                    Q.
                  </p>
                  {title}
                </div>
                {selectedTab.includes(id) && (
                  <div className="flex items-center py-[22px] px-[16px] bg-[#f2f0fd] font-medium text-dark-gray text-[16px] whitespace-normal break-keep leading-8">
                    <p className="font-medium text-[16px] text-purple mr-[10px] leading-8">
                      A.
                    </p>
                    <div dangerouslySetInnerHTML={{ __html:content }} />
                  </div>
                )}
              </article>
            ))}
          </section>
        </div>
        {/* <div className="flex items-center gap-[12px] mx-auto w-[264px] mt-[98px] laptop:mt-[60px] mobile:hidden">
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
    </div>
  );
};

export default FAQ;



export async function getServerSideProps(context:GetServerSidePropsContext) {

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getPost?postType=FAQ`)
  const faq =await res.json()

  return {props :{faq}}
}

