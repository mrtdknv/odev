import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/home.jpg";
import ContactCard from "../../components/contact/ContactCard";
import { useNavigate } from "react-router-dom";
import {
  AddCompanyIcon,
  CompanyIcon,
  ProfileIcon,
} from "../../components/icon/PublicIcons";
import i18n from "i18next";

const HomeCard = ({ title, icon, href }) => {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-6 m-4 cursor-pointer transition-transform transform hover:scale-105"
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </a>
  );
};

function HomeScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <section className="flex flex-col justify-center items-center my-8">
        <h1 className="text-4xl text-center font-bold text-gray-800 mb-6">
          {t("Welcome")}
        </h1>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {t("contents")}
        </h3>

        <div className="flex flex-wrap justify-center">
          <HomeCard
            title={t("companys")}
            icon={<CompanyIcon />}
            href="/company"
          />
          <HomeCard
            title={t("addcompany")}
            icon={<AddCompanyIcon />}
            href="/companycreate"
          />
          <HomeCard
            title={t("myprofile")}
            icon={<ProfileIcon />}
            href="/profile"
          />
        </div>
        <ContactCard />
      </section>
    </div>
  );
}

export default HomeScreen;
