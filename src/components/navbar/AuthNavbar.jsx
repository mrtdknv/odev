import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import appImg from '../../assets/app_img.png'
import {useDispatch} from "react-redux";
import {setLanguage} from "../../redux/datas/languageSlice";

const navigation = [
  { name: "Companys", href: "/companies", current: false },
  { name: "Kaydol", href: "/register", current: false },
  { name: "Giriş yap", href: "/login", current: false },
];

function AuthNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const onChangeLanguage = (lang) => {
    dispatch(setLanguage(lang));

  };

  return (
    <nav className="bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-white font-bold text-lg">
                <img className="w-90 h-16" src={appImg}></img>
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item, index) => (
                  <a
                      key={index}
                      href={item.href}
                      className={`${item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:text-white"
                      } px-3 py-2 rounded-md text-sm font-medium`}
                      aria-current={item.current ? "page" : undefined}
                  >
                    {t(item.name)}
                  </a>
              ))}
              <select
                  id="small"
                  className="block text-sm text-white border border-red-300 rounded-lg bg-primary focus:ring-red-500 focus:border-red-500"
                  onChange={(e) => onChangeLanguage(e.target.value)}
                  defaultValue={i18n.language}
              >
                <option value="" disabled selected>Dil Seçiniz</option>
                <option value="en">English</option>
                <option value="tr">Türkçe</option>
              </select>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-red-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigation.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`${item.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:text-white"
                } block px-3 py-2 rounded-md text-base font-medium`}
              aria-current={item.current ? "page" : undefined}
            >
              {t(item.name)}
            </a>
          ))}
          <div className="mt-4">
            <select
                id="small"
                className="block text-sm text-white border border-red-300 rounded-lg bg-primary focus:ring-red-500 focus:border-red-500"
                onChange={(e) => onChangeLanguage(e.target.value)}
                defaultValue={i18n.language}
            >
              <option value="" disabled selected>Dil Seçiniz</option>
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AuthNavbar;
