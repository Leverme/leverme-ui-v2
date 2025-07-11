import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaTelegram, FaTwitter } from "react-icons/fa6";
export function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-col ">
        <p className="mb-4 text-center text-sm font-medium text-white-600 sm:!mb-0 md:text-lg">
            <span className="mb-4 text-center text-sm text-white-600 sm:!mb-0 md:text-base">
            ©{new Date().getFullYear()} Leverme Protocol. All Rights Reserved.
            </span>
        </p>
        <div>
            <ul className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10">
            <li>
                <a
                target="blank"
                href="https://x.com/moleverme"
                className="text-base font-medium text-white-600 hover:text-gray-600"
                >
                <FaTwitter size={30}></FaTwitter>
                </a>
            </li>
            <li>
                <a
                target="blank"
                href="https://web.telegram.org/a/#-1002580251999"
                className="text-base font-medium text-white-600 hover:text-gray-600"
                >
                <FaTelegram  size={30}></FaTelegram>
                </a>
            </li>
            <li>
                <a
                target="blank"
                href="https://github.com/leverme"
                className="text-base font-medium text-white-600 hover:text-gray-600 flex"
                >
                <FaGithub  size={30}/>
                </a>
            </li>
            </ul>
        </div>
        </div>
    );
}

