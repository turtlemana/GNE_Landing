import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import MENUS from "datas/menus";
import iconNoti from "assets/icons/header/noti.svg";

interface Props {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: Props) => {
  const router = useRouter();
  const [showChildrenMenu, setShowChildrenMenu] = useState(false);

  const handleClickMenu = (isChildrenMenu: boolean) => {
    if (isChildrenMenu) {
      setShowChildrenMenu((prev) => !prev);
      return;
    }

    onClose();
  };

  return (
    <div className="fixed top-[53px] w-full h-[calc(100%-53px)] bg-white z-[10] flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <ul className="text-center">
          {MENUS.map(({ link, menu, children }) => {
            const isCurrentChild = children?.find(
              ({ link }) => link === router.pathname
            );
            const isCurrentLink = router.pathname === link || isCurrentChild;

            return (
              <li key={menu} className="mb-[40px] last:mb-0">
                <Link
                  href={link}
                  onClick={() => handleClickMenu(!!children)}
                  className={`text-[18px] leading-[28px] text-${
                    isCurrentLink ? "dark-gray" : "light-gray"
                  } font-${isCurrentLink ? "extrabold" : "medium"}`}
                >
                  {menu}
                </Link>
                {(showChildrenMenu || isCurrentChild) && (
                  <div className="mt-[24px]">
                    <ul>
                      {children?.map((child) => {
                        const isCurrent = router.pathname === child.link;
                        return (
                          <li key={child.menu} className="mb-[16px]">
                            <Link
                              href={child.link}
                              onClick={onClose}
                              className={`text-[14px] leading-[20px] font-medium text-${
                                isCurrent ? "purple" : "black"
                              }`}
                            >
                              {child.menu}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {/* <div className="p-[20px] flex items-center justify-between">
        <ul className="flex gap-[12px] items-center">
          <li>
            <Link href="" className="text-[14px] leading-[20px] text-black">
              Contact
            </Link>
          </li>
          <li>
            <span className="block w-px h-[14px] bg-[#D1D5DB]"></span>
          </li>
          <li>
            <Link
              href=""
              className="text-[14px] leading-[20px] text-lighter-gray"
            >
              Logout
            </Link>
          </li>
        </ul>
        <button>
          <Image src={iconNoti} alt="" />
        </button>
      </div> */}
    </div>
  );
};

export default MobileMenu;
