import Image from "next/image";
import Link from "next/link";

import logo from "assets/images/common/logo_footer.svg";

const INFOS = [
  { id: 0, title: "Service", koreanTitle:"고객센터", content: "070-4603-2369", border: true },
  { id: 1, title: "Fax", koreanTitle:"팩스",content: "02-722-2369", border: true },
  { id: 2, title: "Email", koreanTitle:"이메일",content: "jay@gne.ai", border: true },
  { id: 3, title: "Web", koreanTitle:"웹사이트",content: "https://gne.ai", border: false },
];

const ADDRESS = [
  {
    id: 0,
    title: "Address",
    koreanTitle:"주소",
    content: "33, Gukjegeumyung-ro 6-gil, Yeongdeungpo-gu, Seoul, Republic of Korea",
    koreanContent:"07331 서울특별시 국제금융로 6길 33, 1002호"
  },
  { id: 1, title: "Representative",koreanTitle:"개인정보처리 담당자", content: "Lee Jay Woong", koreanContent:"이재웅" },
];

const LINKS = [
  { content: "제품", link: "/" },
  { content: "팀 문화", link: "/team_culture" },
  { content: "인재상", link: "/people" },
  { content: "채용공고", link: "/job" },
  { content: "자주 묻는 질문", link: "/faq" },
];

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] px-[24px] pt-[40px] pb-[60px] border-t border-[#e5e7ea]">
      <div className="max-w-[1280px] mx-auto flex gap-[80px] smLaptop:flex-col smLaptop:gap-[28px]">
        <h1>
          <Image src={logo} alt=""/>
        </h1>
        <div>
          <p className="mb-[28px] text-[16px] leading-[16px] font-bold text-gray smLaptop:mb-[16px] smLaptop:text-[14px]">
            Customer Service
          </p>
          <ul className="flex gap-[20px] smLaptop:flex-col smLaptop:gap-[10px]">
            {INFOS.map(({ title, content }, index) => (
              <li key={index} className="flex gap-[12px] items-center">
                <p className="text-[14px] leading-[20px] text-lighter-gray smLaptop:text-[12px]">
                  {title}
                </p>
                <p className="text-[14px] leading-[20px] text-dark-gray smLaptop:text-[12px]">
                  {content}
                </p>
                {INFOS.length - 1 !== index && (
                  <p className="ml-[8px] w-[1px] h-[12px] bg-[#E5E7EB] smLaptop:hidden" />
                )}
              </li>
            ))}
          </ul>
          <ul className="mt-[8px] flex gap-[20px] smLaptop:hidden">
            {ADDRESS.map(({ title, content }, index) => (
              <li key={index} className="flex gap-[12px] items-center">
                <p className="text-[14px] leading-[20px] text-lighter-gray">
                  {title}
                </p>
                <p className="text-[14px] leading-[20px] text-dark-gray">
                  {content}
                </p>
              </li>
            ))}
          </ul>
          <ul className="mt-[48px] flex gap-[60px] items-center smLaptop:mt-[40px] smLaptop:gap-[24px]">
            {LINKS.map(({ content, link }) => (
              <li key={content}>
                <Link
                  href={link}
                  className="text-[14px] leading-[20px] text-gray"
                >
                  {content}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
