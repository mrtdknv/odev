import React from "react";
import appImg from "../../assets/app_img.png";
import facebook from "../../assets/social-media/facebook.png";
import instagram from "../../assets/social-media/instagram.png";
import linkedin from "../../assets/social-media/linkedin.png";
import twitter from "../../assets/social-media/twitter.png";
import youtube from "../../assets/social-media/youtube.png";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
      <footer className="bg-primary py-1">
        <div className="w-full max-w-screen-xl mx-auto p-1">
          <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
            <img
                className="w-24 h-auto sm:w-28 md:w-32"
                src={appImg}
                alt="App Logo"
            />
            <ul className="flex flex-wrap items-center justify-center mb-1 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li className="me-2 md:me-3"> {/* Reduced margin */}
                <a
                    href="https://facebook.com"
                    className="flex items-center hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <img className="w-5 h-5" src={facebook} alt="Facebook" /> {/* Reduced icon size */}
                </a>
              </li>
              <li className="me-2 md:me-3">
                <a
                    href="https://instagram.com"
                    className="flex items-center hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <img className="w-5 h-5" src={instagram} alt="Instagram" />
                </a>
              </li>
              <li className="me-2 md:me-3">
                <a
                    href="https://twitter.com"
                    className="flex items-center hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <img className="w-5 h-5" src={twitter} alt="X" />
                </a>
              </li>
              <li className="me-2 md:me-3">
                <a
                    href="https://linkedin.com"
                    className="flex items-center hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <img className="w-5 h-5" src={linkedin} alt="LinkedIn" />
                </a>
              </li>
              <li className="me-2 md:me-3">
                <a
                    href="https://youtube.com"
                    className="flex items-center hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <img className="w-5 h-5" src={youtube} alt="YouTube" />
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-1 border-white" /> {/* Reduced vertical spacing */}
          <span className="block text-xs text-center text-white sm:text-sm">
          © {new Date().getFullYear()} {t("Allrightsreserved")}
        </span>
        </div>
      </footer>
  );
}

export default Footer;
