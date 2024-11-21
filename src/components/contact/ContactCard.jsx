import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import HttpService from "../../services/HttpService";

function ContactCard() {
  const { t, i18n } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+90");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = t("NameRequired");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = t("EmailRequired");
    } else if (!emailPattern.test(email)) {
      newErrors.email = t("InvalidEmail");
    }

    if (!phoneNumber.trim() || phoneNumber.length < 13) {
      newErrors.phoneNumber = t("PhoneRequired");
    }

    if (!message.trim()) {
      newErrors.message = t("MessageRequired");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onPressSubmitButton = async () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      message: message,
    };
    alert(t("EmailSent"));
    await HttpService.sendEmail(data);
  };

  const handlePhoneNumberChange = (event) => {
    let value = event.target.value;

    if (!value.startsWith("+")) {
      value = "+90" + value.replace(/^(\+?90)?/, "");
    }

    setPhoneNumber(value);
  };

  const handlePhoneNumberKeyDown = (e) => {
    const cursorPosition = e.target.selectionStart;
    if (cursorPosition <= 3 && (e.key === "Backspace" || e.key === "Delete")) {
      e.preventDefault();
    }
  };

  return (
      <div className="max-w-md mx-auto p-4 border rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {t("ContactUs")}
          </h3>
          <div className="border-b border-gray-300 my-4" />
          <p className="text-gray-600">{t("Contactdesc")}</p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">{t("Yourname")}</label>
            <input
                type="text"
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.fullName ? "border-red-500" : ""
                }`}
                placeholder={t("Yourname")}
                onChange={(event) => setFullName(event.target.value)}
            />
            {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">{t("YourEmail")}</label>
            <input
                type="email"
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.email ? "border-red-500" : ""
                }`}
                placeholder={t("YourEmail")}
                onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">{t("Yourphone")}</label>
            <input
                type="text"
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.phoneNumber ? "border-red-500" : ""
                }`}
                placeholder={t("Yourphone")}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                onKeyDown={handlePhoneNumberKeyDown}
            />
            {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">{t("YourMesage")}</label>
            <textarea
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.message ? "border-red-500" : ""
                }`}
                rows="4"
                placeholder={t("YourMesage")}
                onChange={(event) => setMessage(event.target.value)}
            ></textarea>
            {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          <button
              type="button"
              onClick={onPressSubmitButton}
              className="w-full bg-primary text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            {t("Sendmessage")}
          </button>
        </form>
      </div>
  );
}

export default ContactCard;
