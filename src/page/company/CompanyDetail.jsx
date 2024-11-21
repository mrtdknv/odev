import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HttpService from "../../services/HttpService";
import { getBase64Prefix } from "../../services/Utilities";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

function CompanyDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [company, setCompany] = useState();
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCompany = async () => {
    try {
      const response = await HttpService.getCompanyById(id);
      setCompany(response);
    } catch (error) {
      console.error("Şirket bilgileri alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    getCompany().catch();
  }, [id]);

  if (!company) {
    return (
        <div className="text-center text-lg text-red-600">Şirket bulunamadı.</div>
    );
  }

  // Galeri kısmını yöneten metot
  const renderGallery = () => {
    const galleryImages = company.imageGalery || [];
    if (galleryImages.length === 0) {
      return <div className="text-center text-lg text-gray-600"></div>;
    }

    const topImage = galleryImages[galleryImages.length - 1];
    const otherImages = galleryImages.slice(0, galleryImages.length - 1);
    const imagesPerPage = 2;

    const nextImages = () => {
      if (currentIndex + imagesPerPage < otherImages.length) {
        setCurrentIndex(currentIndex + imagesPerPage);
      }
    };

    const prevImages = () => {
      if (currentIndex - imagesPerPage >= 0) {
        setCurrentIndex(currentIndex - imagesPerPage);
      }
    };

    const visibleImages = otherImages.slice(
        currentIndex,
        currentIndex + imagesPerPage
    );

    return (
        <div>
          {/* Üstteki Büyük Resim */}
          <div className="mb-4">
            <div
                className="w-full h-80 overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() =>
                    setSelectedImage(
                        `${getBase64Prefix(topImage.fileExtension)}${
                            topImage.content
                        }`
                    )
                }
            >
              <img
                  src={`${getBase64Prefix(topImage.fileExtension)}${
                      topImage.content
                  }`}
                  className="w-full h-full object-cover"
                  alt="En büyük resim"
              />
            </div>
          </div>

          {/* Diğer Resimler */}
          <div className="flex justify-between items-center mb-4">
            <button
                className="bg-red-800 text-white px-4 py-2 rounded-lg"
                onClick={prevImages}
                disabled={currentIndex === 0}
            >
              <FaArrowLeft />
            </button>

            <div className="grid grid-cols-2 gap-4">
              {visibleImages.map((image, index) => (
                  <div
                      key={index}
                      className="cursor-pointer overflow-hidden rounded-lg border border-gray-300"
                      onClick={() =>
                          setSelectedImage(
                              `${getBase64Prefix(image.fileExtension)}${image.content}`
                          )
                      }
                  >
                    <img
                        src={`${getBase64Prefix(image.fileExtension)}${
                            image.content
                        }`}
                        className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                        alt={`Galeri resmi ${currentIndex + index + 1}`}
                    />
                  </div>
              ))}
            </div>

            <button
                className="bg-red-800 text-white px-4 py-2 rounded-lg"
                onClick={nextImages}
                disabled={currentIndex + imagesPerPage >= otherImages.length}
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Tam Boyutlu Resim */}
          {selectedImage && (
              <div
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                  onClick={() => setSelectedImage(null)}
              >
                <div className="relative">
                  <img
                      src={selectedImage}
                      className="max-w-full max-h-full"
                      alt="Tam boyutlu resim"
                  />
                  <button
                      className="absolute top-2 right-2 bg-red-800 text-white rounded-full p-1"
                      onClick={() => setSelectedImage(null)}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
          )}
        </div>
    );
  };

  return (
      <div>
        <div className="container mx-auto p-4 flex flex-col lg:flex-row space-y-6 lg:space-y-0">
          {/* Sol Kısım */}
          <div className="lg:w-1/2 w-full flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <div className="w-36 h-36 rounded-full overflow-hidden mb-4 shadow-lg">
              <img
                  src={`${getBase64Prefix(
                      company.userProfilePicture.fileExtension
                  )}${company.userProfilePicture.content}`}
                  alt={`${company.userFirstName} ${company.userLastName}`}
                  className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-red-800 mb-2">
              {company.userFirstName} {company.userLastName}
            </h1>
            <div className="flex flex-col space-y-2 w-full">
              {[
                { label: t("Companyemail"), value: company.companyEmail },
                {
                  label: t("CompanysPhoneNumber"),
                  value: company.companyPhoneNumber,
                },
                { label: t("Sector"), value: company.companyBusinessSector },
                {
                  label: t("Citywherethecompanyislocated"),
                  value: company.companyCity,
                },
                { label: t("CompanysAddress"), value: company.companyAddress },
              ].map((item, index) => (
                  <div key={index}>
                    <label className="block text-lg text-gray-700">
                      {item.label}
                    </label>
                    <h2 className="border rounded-lg border-red-800 text-black text-xl text-center p-2">
                      {item.value}
                    </h2>
                  </div>
              ))}
            </div>
          </div>

          {/* Sağ Kısım */}
          <div className="lg:w-1/2 w-full flex flex-col p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="w-60 h-60 border-4 border-red-800 rounded-full overflow-hidden shadow-lg">
                <img
                    src={`${getBase64Prefix(company.companyLogo.fileExtension)}${
                        company.companyLogo.content
                    }`}
                    alt={company.companyName}
                    className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-red-800 text-center mb-4">
              {company.companyName}
            </h2>

            <h2 className="text-2xl font-bold text-red-800 text-center my-4">
              {t("Gallery")}
            </h2>

            {/* Galeri Metodu Çağrısı */}
            {renderGallery()}
          </div>
        </div>
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-center font-bold text-2xl"> {t("Explanation")} </h2>
          <div className="border-2 px-14 border-red-800 p-4 rounded-lg w-3/4 mt-4 h-auto">
            <p className="text-black text-center whitespace-pre-wrap break-words">
              {company.companyDescription}
            </p>
          </div>
        </div>
      </div>
  );
}

export default CompanyDetailPage;
