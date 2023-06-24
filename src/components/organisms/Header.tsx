import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import MobileMenu from "components/organisms/MobileMenu";
import MENUS from "datas/menus";
import useModalClose from "utils/useModalClose";

import logo from "assets/images/common/logo.svg";
import search from "assets/icons/header/search.svg";
import menu from "assets/icons/header/menu.svg";
import my from "assets/icons/header/my.svg";
import close from "assets/icons/header/close.svg";

const Header = () => {
  const router = useRouter();
  const [menuShow, setMenuShow] = useState(false);
  const [selectModalShow, setSelectModalShow] = useState(false);

 const menuRef=useModalClose(menuShow, setMenuShow)
 const modalRef=useModalClose(selectModalShow, setSelectModalShow)

  return (
    <>      
    <Head>
    <link rel="Icon" href="/favicon.svg" type="image/x-icon" />
    <title>GNE</title>
    <meta property="og:image" content="https://gne.ai/favicon.svg" />
      <meta property="og:description" content={"GNE - Generate Next Economy"} />
      <meta property="og:title" content="GNE" />
    </Head>
      <header className="px-[24px] smLaptop:px-[20px] smLaptop:border-b smLaptop:border-[#F3F4F6] smLaptop:fixed smLaptop:top-0 smLaptop:w-full smLaptop:z-10 smLaptop:bg-white">
        <div className="max-w-[1280px] h-[68px] mx-auto flex items-center justify-between smLaptop:h-[52px]">
          <h1>
            <Image src={logo} alt="" className="smLaptop:h-[22px] cursor-pointer" onClick={()=>router.push("/")} />
          </h1>
          <ul className="flex gap-[64px] items-center smLaptop:hidden ">
            {MENUS.map(({ link, menu, children }) => {
              const isCurrentPage =
                router.pathname === link ||
                children?.find(({ link }) => link === router.pathname);
              return (
                <li key={menu}>
                  {children ? (
                    <div className="relative">
                      <button
                        className={`text-[16px] leading-[140%] text-${
                          isCurrentPage ? "dark-gray" : "gray"
                        } font-${isCurrentPage ? "extrabold" : "medium"}`}
                        onClick={() => setSelectModalShow((prev) => !prev)}
                      >
                        {menu}
                      </button>
                      {selectModalShow && (
                        //@ts-ignore
                        <div ref={modalRef} className="absolute top-[30px] left-[-55px] shadow-[0_0_12px_0_rgba(121,120,132,0.15)] border border-[#e5e7eb] rounded-20 w-[150px] h-[92px] z-20 bg-white px-[8px] py-[12px]">
                          {children.map(({ link, menu }) => {
                            const isCurrentPage = router.pathname === link;
                            return (
                              <div
                                key={link}
                                className="w-[134px] h-[32px] px-[12px] py-[6px]"
                                onClick={() => setSelectModalShow(false)}
                              >
                                <Link
                                  href={link}
                                  className={`text-[14px] leading-[140%] text-gray
                                ${isCurrentPage && "text-[#0198FF] font-medium"}
                                `}
                                >
                                  {menu}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link}
                      className={`text-[16px] leading-[140%] text-${
                        isCurrentPage ? "dark-gray" : "gray"
                      } font-${isCurrentPage ? "extrabold" : "medium"}`}
                    >
                      {menu}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="gap-[16px] hidden smLaptop:flex">
            {menuShow ? (
              <button onClick={() => setMenuShow(false)}>
                <Image src={close} alt="" />
              </button>
            ) : (
              <>
                {/* <button>
                  <Image src={search} alt="" />
                </button> */}
                <button onClick={() => setMenuShow(true)}>
                  <Image src={menu} alt="" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      {menuShow && <MobileMenu onClose={() => setMenuShow(false)} />}
    </>
  );
};

export default Header;