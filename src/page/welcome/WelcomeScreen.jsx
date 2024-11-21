import React from "react";
import { useTranslation } from "react-i18next";
import ContactCard from '../../components/contact/ContactCard';
import logo from '../../assets/home.jpg';

function WelcomeScreen() {
  const { t, i18n } = useTranslation();

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        <img
          src={logo}
          alt="Person"
          className="w-full lg:w-1/2 mb-4 lg:mb-0 rounded-tl-3xl rounded-sm"
        />
        <div className="lg:ml-8 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {t("WelcomeToYourWorkplace")}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            <strong>{t("YourWorkplace")}</strong>
            {t("DescriptionPart1")}
            <strong>{t("YourWorkplace")}</strong>
            {t("DescriptionPart2")}
            <strong>{t("YourWorkplace")}</strong>
            {t("DescriptionPart3")}

          </p>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-xl font-bold mb-4 text-center">
          {t("WhatWeOffer")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Service Cards */}
          <div className="p-4 border rounded-lg text-center">
            <div className="mb-2">
              <span className="inline-block bg-primary p-2 rounded-full text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M16 8a6 6 0 11-12 0 6 6 0 0112 0zM12 14v6m8-6v6"/>
                </svg>
              </span>
            </div>
            <h3 className="font-bold mb-2">{t("platformDefinitionTitle")}</h3>
            <p className="text-gray-600">{t("platformDefinition")}</p>
          </div>
          {/* Add more cards similarly */}
          <div className="p-4 border rounded-lg text-center">
            <div className="mb-2">
              <span className="inline-block bg-primary p-2 rounded-full text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </span>
            </div>
            <h3 className="font-bold mb-2">{t("professionalServiceTitle")}</h3>
            <p className="text-gray-600">{t("professionalService")}</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <div className="mb-2">
              <span className="inline-block bg-primary p-2 rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 19V6h3m0 0l9 9-9 9M5 13H2m0 0v8h8"/>
                </svg>
              </span>
            </div>
            <h3 className="font-bold mb-2">{t("effectiveReachTitle")}</h3>
            <p className="text-gray-600">{t("effectiveReach")}</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <div className="mb-2">
              <span className="inline-block bg-primary p-2 rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                </svg>
              </span>
            </div>
            <h3 className="font-bold mb-2">{t("strongPartnerTitle")}</h3>
            <p className="text-gray-600">{t("strongPartner")}</p>
          </div>
        </div>
      </div>

      <ContactCard />
    </div>
  );
}

export default WelcomeScreen;
