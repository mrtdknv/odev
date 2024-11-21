import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HttpService from "../../services/HttpService";
import { useTranslation } from "react-i18next";

import { t } from "i18next";
import { getBase64Prefix } from "../../services/Utilities";

function MyCompanyProfile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State'ler
  const [isEditing, setIsEditing] = useState(false); // isEditing state'i eklendi
  const [company, setCompany] = useState({
    id: "",
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    city: "",
    businessSector: "",
    description: "",
    logo: {
      content: "",
      fileName: "",
      fileExtension: "",
    },
    imageGalery: [],
  });

  const [errors, setErrors] = useState({});

  const city = [
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Aksaray",
    "Amasya",
    "Ankara",
    "Antalya",
    "Ardahan",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bartın",
    "Batman",
    "Bayburt",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Düzce",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Iğdır",
    "Isparta",
    "İstanbul",
    "İzmir",
    "Kahramanmaraş",
    "Karabük",
    "Karaman",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırıkkale",
    "Kırklareli",
    "Kırşehir",
    "Kilis",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Mardin",
    "Mersin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Osmaniye",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Şanlıurfa",
    "Şırnak",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Uşak",
    "Van",
    "Yalova",
    "Yozgat",
    "Zonguldak",
  ];

  const sectors = [
    "Danışmanlık",
    "Eğitim",
    "Eğlence",
    "Emlak",
    "Enerji",
    "Finans",
    "Hukuk Hizmetleri",
    "İnşaat",
    "Pazarlama",
    "Perakende",
    "Sağlık",
    "Taşımacılık",
    "Teknoloji",
    "Telekomünikasyon",
    "Üretim",
    "Yazılım",
    "Yiyecek ve İçecek",
  ];

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompany((prevCompany) => ({
          ...prevCompany,
          logo: {
            content: reader.result.split(",")[1],
            fileName: file.name.split(".")[0],
            fileExtension: `.${file.name.split(".").pop()}`,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const reader = new FileReader();
    if (files.length > 0) {
      files.forEach((file) => {
        reader.onloadend = () => {
          setCompany((prevCompany) => ({
            ...prevCompany,
            imageGalery: [
              ...prevCompany.imageGalery,
              {
                content: reader.result.split(",")[1],
                fileName: file.name.split(".")[0],
                fileExtension: `.${file.name.split(".").pop()}`,
              },
            ],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteImage = (image) => {
    let tempImages = [...company.imageGalery];

    const imageIndex = tempImages.findIndex(
      (img) => img.fileName === image.fileName
    );

    if (imageIndex !== -1) {
      tempImages.splice(imageIndex, 1);
    }

    setCompany({ ...company, imageGalery: tempImages });
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!company.name) newErrors.name = "Lütfen bir şirket adı girin.";
    if (!company.address) newErrors.address = "Lütfen bir adres girin.";

    // Telefon numarası için regex kontrolü
    const phoneRegex = /^(\+90|0)[1-9][0-9]{9}$/; // Türkiye için
    if (!company.phoneNumber || !phoneRegex.test(company.phoneNumber)) {
      newErrors.phoneNumber = "Lütfen geçerli bir telefon numarası girin.";
    }

    // E-posta adresi için regex kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!company.email || !emailRegex.test(company.email)) {
      newErrors.email = "Lütfen geçerli bir e-posta adresi girin.";
    }

    if (!company.city) newErrors.city = "Lütfen bir şehir girin.";
    if (!company.businessSector)
      newErrors.businessSector = "Lütfen bir sektör seçin.";
    if (!company.description)
      newErrors.description = "Lütfen bir açıklama girin.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let updatedCompany = {
        id: company.id,
        name: company.name,
        address: company.address,
        phoneNumber: company.phoneNumber,
        email: company.email,
        city: company.city,
        businessSector: company.businessSector,
        description: company.description,
        logo: company.logo,
        imageGalery: company.imageGalery,
      };
      await HttpService.updateCompanyProfile(updatedCompany);
      navigate("/company");
    } catch (error) {
      console.error("Şirket profili güncellenirken hata oluştu:", error);
    }
  };

  const fetchMyCompanyProfile = async () => {
    const response = await HttpService.getCompanyProfile();
    if (response) {
      setCompany(response);
    }
  };

  useEffect(() => {
    fetchMyCompanyProfile().catch();
  }, []);

  if (company.name === "") {
    return (
      <div className="flex flex-col  justify-center items-center">
        <h1 className="text-4xl text-center font-bold text-gray-800 m-6">
          {t("company_not_exist")}
        </h1>
        <button
          className="w-90 bg-primary text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          onClick={() => navigate("/companycreate")}
        >
          {t("go_to_company_create")}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      {/* Logo yükleme */}
      <div className="text-center mb-6">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="profileImageInput"
          onChange={handleLogoChange}
          disabled={!isEditing}
        />
        <label
          htmlFor="profileImageInput"
          className="w-48 h-48 bg-gray-200 rounded-full mx-auto flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {company.logo.content ? (
            <img
              src={`data:image/jpeg;base64,${company.logo.content}`}
              alt="Logo"
              className="object-cover w-full h-full"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 19.121A3 3 0 118.88 15.88M8 7a4 4 0 118 0v3a4 4 0 11-8 0V7zm12 14v-5a2 2 0 00-2-2H6a2 2 0 00-2 2v5"
              />
            </svg>
          )}
        </label>
      </div>

      {/* Şirket bilgileri */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Şirket Adı"
          className={`w-full px-4 py-2 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-blue-500`}
          value={company.name}
          onChange={(e) =>
            isEditing && setCompany({ ...company, name: e.target.value })
          }
          disabled={!isEditing} // Düzenleme durumu kontrolü
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Şirket Adresi */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Şirket Adresi"
          className={`w-full px-4 py-2 border ${
            errors.address ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-blue-500`}
          value={company.address}
          onChange={(e) =>
            isEditing && setCompany({ ...company, address: e.target.value })
          }
          disabled={!isEditing} // Düzenleme durumu kontrolü
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>

      {/* Şirket Telefonu */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Şirket Telefon Numarası"
          className={`w-full px-4 py-2 border ${
            errors.phoneNumber ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-blue-500`}
          value={company.phoneNumber}
          onChange={(e) => {
            let value = e.target.value;
            if (!value.startsWith("+")) {
              value = "+90" + value.replace(/^(\+?90)?/, "");
            }

            isEditing && setCompany({ ...company, phoneNumber: value });
          }}
          disabled={!isEditing} // Düzenleme durumu kontrolü
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
        )}
      </div>

      {/* Şirket Emaili */}
      <div className="mb-4">
        <input
          type="email"
          placeholder="Şirket Emaili"
          className={`w-full px-4 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-blue-500`}
          value={company.email}
          onChange={(e) =>
            isEditing && setCompany({ ...company, email: e.target.value })
          }
          disabled={!isEditing} // Düzenleme durumu kontrolü
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Şirket Şehri */}
      <div className="mb-4">
        <select
          className={`w-full px-4 py-2 border ${
            errors.city ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-blue-500`}
          value={company.city}
          onChange={(e) => setCompany({ ...company, city: e.target.value })}
          disabled={!isEditing}
        >
          <option disabled value="">
            {t("city")}
          </option>
          {city.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
        )}
      </div>

      {/* Şirket Sektörü */}
      <div className="mb-4">
        <select
          className={`w-full px-4 py-2 border ${
            errors.businessSector ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-blue-500`}
          value={company.businessSector}
          onChange={(e) =>
            isEditing &&
            setCompany({ ...company, businessSector: e.target.value })
          }
          disabled={!isEditing} // Düzenleme durumu kontrolü
        >
          <option disabled value="">
            Sektör Seçin
          </option>
          {sectors.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.businessSector && (
          <p className="text-red-500 text-sm mt-1">{errors.businessSector}</p>
        )}
      </div>

      {/* Şirket Açıklaması */}
      <div className="mb-4">
        <textarea
          placeholder="Şirket Hakkında Bir Açıklama Yapın"
          className={`w-full px-4 py-2 border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-blue-500`}
          rows="3"
          value={company.description}
          onChange={(e) =>
            isEditing && setCompany({ ...company, description: e.target.value })
          }
          disabled={!isEditing} // Düzenleme durumu kontrolü
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setIsEditing(!isEditing)} // Düzenleme modunu değiştir
          className="bg-green-500 text-white  px-4 py-2 rounded-md" // Mavi yerine yeşil
        >
          {isEditing ? t("cancel") : t("Edit")}
        </button>
        {isEditing && (
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded-md" // Rengi kırmızı yaptık
          >
            {t("Submit")}
          </button>
        )}
      </div>
      {/* Resim Galerisi Yükleme */}
      <h2 className="mb-4 text-xl font-bold text-center">
        {t("companygallery")}
      </h2>
      {isEditing ? (
        <div className="mb-4">
          <label className="w-full flex items-center justify-center px-4 py-2 bg-primary hover:bg-red-600 text-white rounded-md cursor-pointer">
            {t("Uploadimage")}
            <input
              type="file"
              className="hidden"
              accept=".jpg,.png,.jpeg"
              multiple
              onClick={handleFileChange}
            />
          </label>
          {company.imageGalery.length > 0 && (
            <div className="text-gray-500 text-center mt-2">
              <span>{company.imageGalery.length} dosya(lar)</span>
            </div>
          )}
        </div>
      ) : undefined}
      {company.imageGalery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {company.imageGalery.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={`${getBase64Prefix(image.fileExtension)}${image.content}`}
                alt={`Uploaded ${index}`}
                className={`object-cover w-full h-32 rounded-md transition-transform transform ${
                  isEditing ? "opacity-100" : "opacity-50"
                }`}
                style={{ pointerEvents: isEditing ? "auto" : "none" }}
              />
              {isEditing && (
                <button
                  className="absolute top-1 right-1 hidden group-hover:block bg-white rounded-full p-1 shadow-lg transition duration-200 ease-in-out hover:bg-red-100"
                  aria-label="Delete image"
                  onClick={() => handleDeleteImage(image)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 10-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Galeride henüz resim yok.</p>
      )}
    </div>
  );
}

export default MyCompanyProfile;
