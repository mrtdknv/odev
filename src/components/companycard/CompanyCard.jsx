import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useSelector} from "react-redux";

export default function CompanyCard({ company }) {
  const navigate = useNavigate(); // useNavigate kancasını kullan
  const { t, i18n } = useTranslation();
  const handleCardClick = () => {
    const token = localStorage.getItem('token');
    if (token){
      navigate(`/companyprofile/${company.companyId}`);
    }
    else {
      navigate(`/companydetail/${company.companyId}`);
    }

  };

  return (
    <div
      className="flex flex-col lg:w-80 w-10/12 bg-white mt-10 rounded-lg border-2 border-red-800 p-4 cursor-pointer" // cursor-pointer ile fare imlecini değiştirdik
      style={{
        maxWidth: "320px",
        minWidth: "320px",
        maxHeight: "500px",
        minHeight: "500px",
      }}
      onClick={handleCardClick}
    >
      <div className="items-center mb-4">
        <h1 className="text-center m-auto text-2xl font-bold">
          {company.companyName}
        </h1>
        <h3 className="text-center m-auto text-lg font-medium">
          {t("Sector")}{": "}{company.companyBusinessSector}
        </h3>
        <hr className="border-t-2 mt-4 mb-4 border-red-800" />

        <img
          src={`data:image/${company.companyLogo.fileExtension.replace(
            ".",
            ""
          )};base64,${company.companyLogo.content}`}
          alt={`${company.companyName} Logo`}
          className="m-auto"
          style={{
            maxWidth: "250px",
            maxHeight: "250px",
            minWidth: "250",
            minHeight: "250px",
            objectFit: "cover",
          }}
        />

        <hr className="border-t-2 mt-4 border-red-800" />
      </div>
      <div className="flex flex-col items-center mt-4">
        <div className="flex items-center space-x-2 mb-2">
          <FontAwesomeIcon icon={faPhoneAlt} className="text-gray-600" />
          <h3 className="text-sm">{company.companyPhoneNumber}</h3>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-600" />
          <h3 className="text-sm">{company.companyEmail}</h3>
        </div>
      </div>
    </div>
  );
}
