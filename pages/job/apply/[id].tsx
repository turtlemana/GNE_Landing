import Link from "next/link";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import check from "assets/icons/job/check.svg";
import uncheck from "assets/icons/job/uncheck.svg";
import back from "assets/icons/job/back.svg";
import downArrow from "assets/icons/job/downArrow.svg";
import React,{ useState,useRef,useEffect } from "react";
import { useRouter } from "next/router";

const Apply = ({jobDetail}:any) => {
  const router = useRouter();  
  const detail = jobDetail && jobDetail[0] && jobDetail[0].content ? jobDetail[0] : { title: '', deadline: '', company: '', position: '', content: ''};
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [infoAgree,setInfoAgree] = useState<boolean>(false);
  const [hasExperience, setHasExperience] = useState<boolean>(false);
  const [isWorking,setIsWorking] = useState<boolean>(false);
  const [componentCount, setComponentCount] = useState(1);
const [resume,setResume]=useState<File | null>(null);
const [portfolio,setPortfolio]=useState<File | null>(null);
  const [experienceRefs, setExperienceRefs] = useState<{
    companyName: React.RefObject<HTMLInputElement>,
    role: React.RefObject<HTMLInputElement>,
    periodStart: React.RefObject<HTMLInputElement>,
    periodEnd: React.RefObject<HTMLInputElement>
  }[]>([]);


  const handleExperienceAddClick = () => {
    if (componentCount < 4) {
      setExperienceRefs(prevRefs => [
        ...prevRefs,
        {
          companyName: React.createRef<HTMLInputElement>(),
          role: React.createRef<HTMLInputElement>(),
          periodStart: React.createRef<HTMLInputElement>(),
          periodEnd: React.createRef<HTMLInputElement>(),
        },
      ]);
      setComponentCount(prevCount => prevCount + 1);
    }
  };

  const handleDeleteClick = () => {
    if (componentCount > 1) {
      setExperienceRefs(prevRefs => {
        const newRefs = [...prevRefs];
        newRefs.pop();
        return newRefs;
      });
      setComponentCount(prevCount => prevCount - 1);
    }
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);
  const portfolioRef = useRef<HTMLInputElement>(null);
  const linkRef= useRef<HTMLInputElement>(null);
  const totalExperienceRef = useRef<HTMLSelectElement>(null);


 const onFormSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // form data preparation
    const formData = new FormData();
    formData.append("position", detail.title)
    formData.append("name", nameRef.current?.value || '');
    formData.append("phone", phoneNumberRef.current?.value || '');
    formData.append("email", emailRef.current?.value || '');
    formData.append("link", linkRef.current?.value || '');
    formData.append("total_experience", totalExperienceRef.current?.value || '');

    // if (resumeRef.current?.files) {
    //   formData.append("resume", resumeRef.current.files[0]);
    // }
    // if (portfolioRef.current?.files) {
    //   formData.append("portfolio", portfolioRef.current.files[0]);
    // }
    if (resume) {
      formData.append("resume", resume);
    }
    if (portfolio) {
      formData.append("portfolio", portfolio);
    }
    // add experience data to formData

    formData.append("experience", JSON.stringify(experienceRefs.map((refs) => ({
        companyName: refs.companyName.current?.value || '',
        role: refs.role.current?.value || '',
        periodStart: refs.periodStart.current?.value || '',
        periodEnd: refs.periodEnd.current?.value || ''
    }))));

    for (let entry of formData.entries()) {
        console.log(entry);
      }

    try {
        const response = await fetch('/api/apply', {
          method: 'POST',
          body: formData

        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok') ;
        }
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setIsApplied(true)
    
      } catch (error) {
        alert("지원서 제출에 오류가 발생했습니다, 이력서 혹은 포트폴리오의 파일 크기를 살펴보시길 바랍니다.")

        console.error('There has been a problem with your fetch operation: ', error);
      }    
    
};

useEffect(() => {
    const initialExperienceRef = {
      companyName: React.createRef<HTMLInputElement>(),
      role: React.createRef<HTMLInputElement>(),
      periodStart: React.createRef<HTMLInputElement>(),
      periodEnd: React.createRef<HTMLInputElement>(),
    };
    setExperienceRefs([initialExperienceRef]);
  }, []);



  return (
    <div>
    <div className="bg-background mobile:bg-none bg-[#FCFCFF] bg-cover bg-no-repeat bg-right-top pt-[80px] pb-[133px] px-[24px] mobile:pt-[62px] mobile:pb-[108px]">
      <div className="relative max-w-[1024px] mx-auto">
        <Link
          href="/job"
          className="flex items-center mb-[67px] font-semibold text-[#a2a5aa] text-[16px] mobile:hidden"
        >
          <Image src={back} alt="" className="mr-[6px] w-[24px]" />
          뒤로가기
        </Link>
        <div className="mx-auto gap-[112px] w-[414px] mobile:max-w-[414px] mobile:w-full">
          <h1 className="font-extrabold text-[40px] leading-none mb-[16px] text-dark-gray text-center mobile:text-left mobile:text-[28px]">
            지원서 작성하기
          </h1>
          <p className="text-purple font-medium text-center text-[16px] mb-[80px] mobile:text-left mobile:mb-[70px]">
            {detail.title}{" "}{`~ (${detail.deadline.split("T")[0]})`}
          </p>
          <form onSubmit={onFormSubmit}>

          <div className="mb-[48px]">
            <div className="flex items-center gap-[3px]">
              <p className="mb-[8px] text-dark-gray text-[14px]">이름</p>
              <p className="text-purple text-[18px] mb-[2px]">*</p>
            </div>
            <input
              className="border border-[#e5e7eb] rounded-20 px-[10px] py-[12px] text-[14px] h-[40px] w-full"
              placeholder="이름"
              type="text"
              ref={nameRef}
              required
            />
          </div>
          <div className="mb-[48px]">
            <div className="flex items-center gap-[3px]">
              <p className="mb-[8px] text-dark-gray text-[14px]">전화번호</p>
              <p className="text-purple text-[18px] mb-[2px]">*</p>
            </div>
            <input
              className="border border-[#e5e7eb] rounded-20 px-[10px] py-[12px] text-[14px] h-[40px] w-full"
              placeholder="전화번호"
              type="text"
              required
              ref={phoneNumberRef}
            />
          </div>
          <div className="mb-[48px]">
            <div className="flex items-center gap-[3px]">
              <p className="mb-[8px] text-dark-gray text-[14px]">이메일</p>
              <p className="text-purple text-[18px] mb-[2px]">*</p>
            </div>
            <input
              className="border border-[#e5e7eb] rounded-20 px-[10px] py-[12px] text-[14px] h-[40px] w-full"
              placeholder="이메일"
              type="email"
              required
              ref={emailRef}
            />
          </div>
          <div className="mb-[48px]">
            <div className="flex items-center gap-[3px]">
              <p className="mb-[8px] text-dark-gray text-[14px]">
                이력서 및 경력기술서
              </p>
              <p className="text-purple text-[18px] mb-[2px]">*</p>
            </div>
            <input
            ref={resumeRef}
            required
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                {if (e.target.files &&e.target?.files.length){
                setResume(e.target?.files[0])}}}
            type="file"
              className="border border-[#e5e7eb] rounded-20 px-[10px] py-[12px] pb-[35px] text-[14px] h-[40px] w-full"
              placeholder="+ 첨부파일 업로드"
            />
            <p className="mt-[8px] text-lighter-gray mobile:text-[14px]">
              * 파일은 최대 50MB까지 업로드 하실 수 있습니다.
              <br />* 이력서 및 경력기술서는 자유 양식이며, 한 개의 파일로
              통합하여 제출해주세요.
              <br />
              <br />
              당사는 지원자분의 역량을 최우선적으로 검토하며, 채용과정에서
              지원자의 주민등록번호, 가족관계,혼인여부, 연봉, 사진, 신체조건,
              출신지역 등 채용절차법상 요구 금지된 정보를 요구하지 않습니다.
            </p>
          </div>
          <div className="mb-[48px] ">
            <p className="mb-[8px] text-dark-gray text-[14px] ">
              포트폴리오 (선택사항)
            </p>
            <input
            ref={portfolioRef}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                {if (e.target.files &&e.target?.files.length){
                setPortfolio(e.target?.files[0])}}}
            type="file"
              className="border border-[#e5e7eb] rounded-20 px-[10px] py-[12px] pb-[35px] text-[14px] h-[40px] w-full text-center"
              placeholder="+ 첨부파일 업로드"
            />
            <p className="mt-[8px] text-lighter-gray mobile:text-[14px]">
              * 파일은 최대 50MB까지 업로드 하실 수 있습니다. <br />*
              포트폴리오를 필수로 제출하셔야 하는 포지션은, 확인 후
              첨부해주세요.
            </p>
          </div>
          <div className="mb-[48px]">
            <p className="mb-[8px] text-dark-gray text-[14px]">링크</p>
            <input
              className="border border-[#e5e7eb] rounded-20 px-[10px] py-[12px] text-[14px] h-[40px] w-full"
              placeholder="https://"
              type="url"
              ref={linkRef}
            />
            <p className="mt-[8px] text-lighter-gray text-[14px]">
              자신을 드러낼 수 있는 개인 블로그나 노션, Github 링크 등을
              자유롭게 입력해주세요.
            </p>
          </div>
          <div className="mb-[48px]">
            <div className="flex items-center gap-[3px]">
              <p className="mb-[16px] text-dark-gray text-[14px]">경력 사항</p>
              <p className="text-purple text-[18px] mb-[2px]">*</p>
            </div>
            {hasExperience &&
  <div className="mb-10 mt-5">
    <div className="flex items-center gap-[3px]">
      <p className="mb-[8px] text-dark-gray text-[14px]">
        총 경력 기간
      </p>
      <p className="text-purple text-[18px] mb-[2px]">*</p>
    </div>
    <select 
    required
      ref={totalExperienceRef} 
      className="flex text-sm justify-between items-center text-light-gray border border-[#e5e7eb] rounded-20 px-[10px] py-[12px] text-[14px] h-[40px] w-full"
      defaultValue={""}
    >
      <option value="" disabled>총 경력 기간</option>
      <option value="under_1">1년 미만</option>
      <option value="over_1">1년 이상</option>
      <option value="over_2">2년 이상</option>
      <option value="over_3">3년 이상</option>
      <option value="over_5">5년 이상</option>
      <option value="over_10">10년 이상</option>
    </select>
  </div>
}
            <div className="flex gap-[25px]">
              <div onClick={()=>setHasExperience(true)} className="cursor-pointer flex gap-[8px] items-center text-light-gray font-medium mb-[12px]">
                {hasExperience ? 
                <Image src={check} alt="" />
                : <Image src={uncheck} alt="" />}
                경력
              </div>
              <div onClick={()=>setHasExperience(false)} className="cursor-pointer flex gap-[8px] items-center text-light-gray font-medium mb-[12px]">
               { !hasExperience ?
                <Image src={check} alt="" />
                :<Image src={uncheck} alt="" />}
                신입 (경력 없음)
              </div>
            </div>
          </div>
          
          
        {hasExperience && 
           Array.from({ length: componentCount }, (_, index) => (
       
        <div key={index}>
                 {(hasExperience && componentCount > 1 && index!=0) && 
              <div onClick={handleDeleteClick} className="flex items-center justify-end cursor-pointer  font-semibold text-xs text-purple">
                삭제
              </div>
            }

          <div className="mb-[48px]">
            <div className="flex items-center gap-[3px]">
              <p className="mb-[8px] text-dark-gray text-[14px]">회사명</p>
              <p className="text-purple text-[18px] mb-[2px]">*</p>
            </div>
            <input
            ref={experienceRefs[index].companyName} 
              className="border border-[#e5e7eb] rounded-20 px-[10px] py-[12px] text-[14px] h-[40px] w-full"
              placeholder="회사명을 입력해주세요."
            />
            <p className="mt-[8px] text-lighter-gray mobile:text-[14px]">
              * 경력은 최대 3개까지 작성하실 수 있으며, 3개를 초과할 경우 최근
              재직사 순으로 기입해주세요. <br />
           </p>
          </div>
          <div className="mb-[48px]">
            <div className="flex items-center gap-[3px]">
              <p className="mb-[8px] text-dark-gray text-[14px]">담당 직무명</p>
              <p className="text-purple text-[18px] mb-[2px]">*</p>
            </div>
            <input
             ref={experienceRefs[index].role}
              className="border border-[#e5e7eb] rounded-20 px-[10px] py-[12px] text-[14px] h-[40px] w-full"
              placeholder="(예시) Frontend Developer"
              type="text"
              required
            />
          </div>
          <div className="mb-[100px] mobile:mb-[71px]">
            <div className="flex items-center gap-[3px]">
              <p className="mb-[16px] text-dark-gray text-[14px]">재직 기간</p>
              <p className="text-purple text-[18px] mb-[2px]">*</p>
            </div>
            <div className="mb-[8px] flex text-lighter-gray text-light-gray border border-[#e5e7eb] rounded-20 px-[10px] py-[12px] text-[14px] h-[40px] w-full">
              <input type="date" ref={experienceRefs[index].periodStart} required placeholder="YYYY-MM-DD" className="w-[48%] mr-2" />
              - &nbsp;
              <input type="date" ref={experienceRefs[index].periodEnd} required placeholder="YYYY-MM-DD" className="w-[48%]" />
            </div>
            <div onClick={()=>setIsWorking((prev)=>!prev)} className="cursor-pointer flex gap-[8px] items-center text-light-gray font-medium mb-[16px]">
            {isWorking ? 
            <Image src={check} alt="" />
             : <Image src={uncheck} alt="" />}
              재직 중
            </div>
            {hasExperience && componentCount < 3 &&
            <div onClick={handleExperienceAddClick} className="flex items-center  justify-center cursor-pointer w-full font-medium text-[14px] text-purple bg-light-purple rounded-20 py-[8px] ">
              추가
            </div>}
          </div>
          </div>))}
          <div onClick={()=>setInfoAgree((prev)=>!prev)} className=" flex items-center text-dark-gray font-medium text-[14px] mx-auto">
            {infoAgree ? 
              <Image src={check} alt="" className="cursor-pointer mr-[8px]" />
              :<Image src={uncheck} alt="" className="cursor-pointer mr-[8px]" />}
            <span className="underline text-[14px]">개인정보 수집 및 이용</span>
            에 동의합니다.
          </div>
          <div className="mt-[48px] mx-auto w-[322px] mobile:mt-[24px] mobile:px-[24px] mobile:w-full">
          <button  type="submit" disabled={infoAgree ? false : true} className="cursor-pointer disabled:bg-slate-400   mobile:w-full w-[322px] h-[64px] font-extrabold text-[20px] bg-purple rounded-60 py-[18px] px-[10px] text-white shadow-[0_0_12px_0_rgba(121,120,132,0.15)] mobile:h-[54px] mobile:text-[18px]">
              제출하기
            </button> 
          </div>
          </form>
        </div>
      </div>
    </div>

    
{isApplied && (
        <div className={' sticky bottom-[300px] w-full'}>
        <article className="flex  flex-col  justify-center items-center h-fit border w-[415px] mx-auto bg-white  py-12 rounded-20  top-1/2 left-1/2   z-20 ">
          <h1 className="text-2xl text-[#111111] mb-4">
            {"지원서 제출이 완료됐습니다"}
          </h1>
          <p className="text-[#111111] mb-9 text-start ml-[50px]">
          {"지원서를 검토하여, 수일 내에"}<br />
          {"기재해주신 이메일로 결과를 알려드리겠습니다."}
          </p>
          <button
            onClick={()=>{router.replace({pathname:`/job`});setIsApplied(false);}}
            className="bg-purple  text-white font-bold py-3 w-full rounded-[60px] max-w-[375px] px-[155px] hover:bg-purple"
          >
           {"확인"}
          </button>
        </article>
        </div>
      )}
    </div>
  );
};

export default Apply;


export async function getServerSideProps(context:GetServerSidePropsContext) {

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/getPost?postType=RECRUIT&id=${context.query.id}`)
    const jobDetail =await res.json()
    
    return {props :{jobDetail}}
  }
  
  
  


