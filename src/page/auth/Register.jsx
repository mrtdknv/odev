import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, registerUser } from "../../redux/datas/authSlice";
import { MdAddPhotoAlternate, MdCheckCircle } from "react-icons/md";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import moment from "moment";

function Register() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePicture, setProfilePicture] = useState(
      {
        content: "",
        fileName: "",
        fileExtension: "",
      }
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = useCallback(() => {
    const errors = {};
    if (!firstName) errors.firstName = "İsim girilmelidir.";
    if (!lastName) errors.lastName = "Soyisim girilmelidir.";
    if (!dateOfBirth) errors.dateOfBirth = "Doğum tarihi girilmelidir.";
    if (!email) errors.email = "E-mail girilmelidir.";
    if (!password) errors.password = "Şifre girilmelidir.";
    if (!confirmPassword) errors.confirmPassword = "Şifre tekrar girilmelidir.";
    if (!passwordsMatch) errors.passwordMatch = "Şifreler uyuşmuyor.";
    if (!profilePicture.content)
      errors.profilePicture = "Resim Ekleyiniz.";
    return errors;
  }, [
    confirmPassword,
    passwordsMatch,
    dateOfBirth,
    email,
    firstName,
    lastName,
    password,
    profilePicture.content,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    setSubmitted(true);

    if (Object.keys(errors).length === 0) {
      const createdUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        dateOfBirth: moment(dateOfBirth).toISOString(),
        profilePicture: {
          content: profilePicture.content,
          fileName: profilePicture.fileName,
          fileExtension: profilePicture.fileExtension,
        },
      }
      dispatch(register(createdUser));
      navigate("/login");
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture({
          content: reader.result.split(",")[1],
          fileName: file.name.split(".")[0],
          fileExtension: `.${file.name.split(".").pop()}`,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow-lg shadow-red-200 border-solid border-2 border-red-300">
            <h2 className="text-red-800 text-center text-2xl font-bold">
              {t("Register")}
            </h2>
            <div className="flex justify-center mb-4">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="w-40 h-40 bg-slate-500 flex justify-center items-center rounded-full overflow-hidden relative cursor-pointer">
                  {profilePicture.content ? (
                    <img
                      src={`data:image/jpeg;base64,${profilePicture.content}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative flex items-center justify-center w-full h-full">
                      <MdAddPhotoAlternate className="absolute text-white text-7xl text-center" />
                    </div>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </label>
            </div>
            {submitted && formErrors.profilePicture && (
              <p className="text-red-500 text-xs mt-1 text-center">
                {formErrors.profilePicture}
              </p>
            )}
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  {t("firstName")}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e)=>{
                    const value = e.target.value;
                    setFirstName(value.charAt(0).toUpperCase() + value.slice(1))

                  }}
                  required
                  className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md text-center outline-red-600 ${
                    submitted && formErrors.firstName ? "border-red-500" : ""
                  }`}
                  placeholder={t("firstName")}
                />
                {submitted && formErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  {t("lastName")}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e)=>{
                    const value = e.target.value;
                    setLastName(value.toUpperCase());
                  }}
                  required
                  className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md text-center outline-red-600 ${
                    submitted && formErrors.lastName ? "border-red-500" : ""
                  }`}
                  placeholder={t("lastName")}
                />
                {submitted && formErrors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.lastName}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  {t("dateOfBirth")}
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={
                    dateOfBirth && !isNaN(new Date(dateOfBirth))
                      ? dateOfBirth.split("T")[0]
                      : ""
                  }
                  onChange={(e)=>setDateOfBirth(e.target.value)}
                  required
                  className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md text-center outline-red-600 ${
                    submitted && formErrors.dateOfBirth ? "border-red-500" : ""
                  }`}
                  placeholder="Doğum Tarihi"
                />
                {submitted && formErrors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.dateOfBirth}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                  className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md text-center outline-red-600 ${
                    submitted && formErrors.email ? "border-red-500" : ""
                  }`}
                  placeholder="E-mail"
                />
                {submitted && formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  {t("password")}
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md text-center pr-10"
                    placeholder={t("password")}
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeIcon className="w-5 h-5 text-gray-600" />
                    ) : (
                      <EyeSlashIcon className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </div>
                {submitted && formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  {t("confirmpassword")}
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md text-center outline-red-600 pr-10 ${
                      submitted &&
                      (formErrors.confirmPassword || formErrors.passwordMatch)
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder={t("confirmpassword")}
                  />
                  <div
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeIcon className="w-5 h-5 text-gray-600" />
                    ) : (
                      <EyeSlashIcon className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  {passwordsMatch && confirmPassword && (
                    <MdCheckCircle
                      className="absolute right-12 text-green-500 w-5 h-5"
                      aria-label="Passwords match"
                    />
                  )}
                </div>
                {submitted && formErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.confirmPassword}
                  </p>
                )}
                {submitted && formErrors.passwordMatch && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.passwordMatch}
                  </p>
                )}
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className={`w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white ${
                    Object.keys(formErrors).length === 0
                      ? "bg-red-700 hover:bg-red-800 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  } focus:outline-none`}
                >
                  {t("Kaydol")}
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                {t("DoIalreadyhaveanaccount")}
                <a
                  href="/login"
                  className="text-red-700 hover:underline ml-1 whitespace-nowrap font-semibold cursor-pointer"
                >
                  {t("Giriş yap")}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
