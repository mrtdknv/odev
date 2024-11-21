import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { createCompany } from "../../redux/datas/companycreateSlice";
import { useNavigate } from "react-router-dom";

const AddCompanyForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Logo yükleme işlemi
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

  // Diğer resimlerin yüklenmesi (imageGalery)
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

  // Email validasyonu
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Form validasyonu
  const validateForm = () => {
    const newErrors = {};
    if (!company.name) newErrors.name = "Şirket İsmi zorunludur.";
    if (!company.address) newErrors.address = "Şirket Adresi zorunludur.";
    if (!company.phoneNumber)
      newErrors.phoneNumber = "Şirket Telefonu zorunludur.";
    if (!company.email) newErrors.email = "Şirket Emaili zorunludur.";
    if (!company.city) newErrors.city = "Şirketin bulunduğu şehir zorunludur.";
    if (!company.businessSector)
      newErrors.businessSector = "Şirket sektörü zorunludur.";
    if (company.description.length < 80)
      newErrors.description = "Açıklama en az 120 karakter olmalıdır.";
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
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(createCompany(company))
        .then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            alert("Şirket başarıyla oluşturuldu!");

            // Formu temizle
            setCompany({
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

            // Kullanıcıyı yönlendir
            navigate("/");
          } else {
            alert("Şirket oluşturulamadı.");
          }
        })
        .catch((error) => {
          console.error("Şirket oluşturulurken hata:", error);
        });
    }
  };
  //buranın algoritmasını düzelt
  // if (company !== null) {
  //   return (
  //     <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 text-center">
  //       <h2 className="text-lg font-bold">Zaten bir şirketiniz var!</h2>
  //       <p>Yeni bir şirket ekleyemezsiniz.</p>
  //       <button
  //         onClick={() => navigate("/welcome")}
  //         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
  //       >
  //         Ana Sayfaya Git
  //       </button>
  //     </div>
  //   );
  // }

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
          <input
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
          <input
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
          <input
            type="text"
            placeholder={t("CompanysPhoneNumber")}
            className={`w-full px-4 py-2 border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
            value={company.phoneNumber}
            onChange={(e) =>
              setCompany({ ...company, phoneNumber: e.target.value })
            } // Şirket telefon numarası güncelleniyor
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>
        {/* Şirket Emaili */}
        <div className="mb-4">
          <input
            type="email"
            placeholder={t("Companyemail")}
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
            value={company.email}
            onChange={(e) => setCompany({ ...company, email: e.target.value })} // Şirket emaili güncelleniyor
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Şirket Şehri */}
        <div className="mb-4">
          <input
            type="text"
            placeholder={t("Citywherethecompanyislocated")}
            className={`w-full px-4 py-2 border ${
              errors.city ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
            value={company.city}
            onChange={(e) => setCompany({ ...company, city: e.target.value })} // Şirketin bulunduğu şehir güncelleniyor
          />
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
              setCompany({ ...company, businessSector: e.target.value })
            } // Şirket sektörü güncelleniyor
          >
            <option value="">{t("Sector")}</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
          {errors.businessSector && (
            <p className="text-red-500 text-sm mt-1">{errors.businessSector}</p>
          )}
        </div>
        {/* Şirket Açıklaması */}
        <div className="mb-4">
          <textarea
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
          <label className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
            {t("Uploadimage")}
            <input
              type="file"
              className="hidden"
              accept=".jpg,.png,.jpeg"
              onChange={handleFileChange} // Resim galerisi için handleFileChange fonksiyonu
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
                {/* Silme butonu */}
                <button
                  className="absolute top-0 right-0  text-red-800 rounded-full p-1 m-1"
                  onClick={() => handleDeleteImage(index)} // Silme fonksiyonunu tetikleyelim
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
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {t("Addcompany")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCompanyForm;
