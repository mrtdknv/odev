import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HttpService from "../../services/HttpService";

function CompanyCreate() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCompanyAlreadyExist, setIsCompanyAlreadyExist] = useState(false);

  // State'ler
  const [company, setCompany] = useState({
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
    "Yiyecek ve İçecek"
  ];

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
    "Zonguldak"
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
    if (files.length) {
      files.forEach((file) => {
        const reader = new FileReader();
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

  const handleDeleteImage = (index) => {
    setCompany((prevCompany) => ({
      ...prevCompany,
      imageGalery: prevCompany.imageGalery.filter((_, i) => i !== index),
    }));
  };

  const handleIsCompanyAlreadyExist = async () => {
    const response = await HttpService.getCompanyProfile();
    if (response) {
      setIsCompanyAlreadyExist(true);
    }
  };

  useEffect(() => {
    handleIsCompanyAlreadyExist().catch();
  }, []);

  // Form validasyonu
  const validateForm = () => {
    let newErrors = {};
    if (!company.name) newErrors.name = "Şirket İsmi zorunludur.";
    if (!company.address) newErrors.address = "Şirket Adresi zorunludur.";
    if (!company.phoneNumber)
      newErrors.phoneNumber = "Şirket Telefonu zorunludur.";
    if (!company.email) newErrors.email = "Şirket Emaili zorunludur.";
    if (!company.city) newErrors.city = "Şirketin bulunduğu şehir zorunludur.";
    if (!company.businessSector)
      newErrors.businessSector = "Şirket sektörü zorunludur.";
    if (company.description.length < 40)
      newErrors.description = "Açıklama en az 40 karakter olmalıdır.";
    if (!company.logo.content) newErrors.logo = "Logo yüklemek zorunludur.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangeDescription = (e) => {
    const value = e.target.value;
    setCompany({ ...company, description: value });

    // Sadece boş değilse validasyon kontrolü yap
    if (value.length >= 50 || value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        description:
          value.length >= 50 ? "" : "Açıklama en az 50 karakter olmalıdır.",
      }));
    }
  };

  // Form submit işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await HttpService.createCompany(company);
      navigate("/company");
    }
  };

  if (isCompanyAlreadyExist) {
    return (
      <div className="flex flex-col  justify-center items-center">
        <h1 className="text-4xl text-center font-bold text-gray-800 m-6">
          {t("Yourcompanyalreadyexists")}
        </h1>
        <button
          className="w-90 bg-primary text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          onClick={() => navigate("/mycompany")}
        >
          {t("GotoMyCompanyPage")}
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

      {/* Şirket Adı */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="companyName">
            {t("Companyname")}
          </label>
          <input
            id="companyName"
            type="text"
            placeholder={t("Companyname")}
            className={`w-full px-4 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Şirket Adresi */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="companyAddress">
            {t("CompanysAddress")}
          </label>
          <input
            id="companyAddress"
            type="text"
            placeholder={t("CompanysAddress")}
            className={`w-full px-4 py-2 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
            value={company.address}
            onChange={(e) =>
              setCompany({ ...company, address: e.target.value })
            }
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Şirket Telefonu */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="companyPhoneNumber">
            {t("CompanysPhoneNumber")}
          </label>
          <input
            id="companyPhoneNumber"
            type="text"
            placeholder={t("CompanysPhoneNumber")}
            className={`w-full px-4 py-2 border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
            value={company.phoneNumber}
            onChange={(e) => {
              let value = e.target.value;
              if (!value.startsWith("+")) {
                value = "+90" + value.replace(/^(\+?90)?/, "");
              }
              setCompany({ ...company, phoneNumber: value });
            }}
            onKeyDown={(e) => {
              const cursorPosition = e.target.selectionStart;
              if (
                cursorPosition <= 3 &&
                (e.key === "Backspace" || e.key === "Delete")
              ) {
                e.preventDefault();
              }
            }}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Şirket Emaili */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="companyEmail">
            {t("Companyemail")}
          </label>
          <input
            id="companyEmail"
            type="email"
            placeholder={t("Companyemail")}
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
            value={company.email}
            onChange={(e) => setCompany({ ...company, email: e.target.value })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Şirket Şehri */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="companyCity">
            {t("city")}
          </label>
          <select
            id="companyCity"
            className={`w-full px-4 py-2 border ${
              errors.city ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
            value={company.city}
            onChange={(e) => setCompany({ ...company, city: e.target.value })}
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
          <label className="block mb-1" htmlFor="companyBusinessSector">
            {t("Sector")}
          </label>
          <select
            id="companyBusinessSector"
            className={`w-full px-4 py-2 border ${
              errors.businessSector ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
            value={company.businessSector}
            onChange={(e) =>
              setCompany({ ...company, businessSector: e.target.value })
            }
          >
            <option disabled value="">
              {t("Sector")}
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
          <label className="block mb-1" htmlFor="companyDescription">
            {t("Makeastatementaboutyourcompany")}
          </label>
          <textarea
            id="companyDescription"
            placeholder={t("Makeastatementaboutyourcompany")}
            className={`w-full px-4 py-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
            rows="3"
            value={company.description}
            onChange={handleChangeDescription}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Resim Galerisi Yükleme */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="imageUpload">
            {t("Uploadimage")}
          </label>
          <label className="w-full flex items-center justify-center px-4 py-2 bg-primary hover:bg-red-600 text-white rounded-md cursor-pointer">
            {t("Uploadimage")}
            <input
              id="imageUpload"
              type="file"
              className="hidden"
              accept=".jpg,.png,.jpeg"
              onChange={handleFileChange}
              multiple
            />
          </label>
          {company.imageGalery.length > 0 && (
            <div className="text-gray-500 text-center mt-2">
              <span>{company.imageGalery.length} file(s) selected</span>
            </div>
          )}
        </div>

        {company.imageGalery.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {company.imageGalery.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={`data:image/jpeg;base64,${image.content}`}
                  alt={`Uploaded ${index}`}
                  className="object-cover w-full h-24 rounded-md"
                />
                <button
                  className="absolute top-0 right-0 text-red-800 rounded-full p-1 m-1"
                  onClick={() => handleDeleteImage(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
              </div>
            ))}
          </div>
        )}

        {/* Submit Butonu */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            {t("Addcompany")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyCreate;
