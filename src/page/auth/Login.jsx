import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/datas/authSlice";

function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setCustomError] = useState(""); // Custom error state
  const { error, status } = useSelector((state) => state.auth);

  useEffect(() => {
    // Eğer customError set edilmişse, 3 saniye sonra hata mesajını kaldır.
    if (customError) {
      const timer = setTimeout(() => {
        setCustomError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [customError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userForLoginDto = {
      email: email,
      password: password,
    };
    try {
      await dispatch(login(userForLoginDto)).unwrap();
      navigate("/home", { replace: true });
      setCustomError("");
    } catch (error) {
      console.error("Login failed:", error);
      setCustomError(t("Hatalı kullanıcı adı veya parola"));
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow-lg shadow-red-200 border-solid border-2 border-red-300">
            <h2 className="text-red-800 text-center text-2xl font-bold">
              {t("Siginin")}
            </h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  E-mail
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md text-center outline-red-600"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  {t("Password")}
                </label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md text-center outline-red-600"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {customError && (
                <p className="text-red-500 text-sm text-center mt-2">
                  {customError}
                </p>
              )}

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-primary hover:ring-red-50 focus:outline-none"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Giriş Yapılıyor..." : t("Siginin")}
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                {t("Donthaveanaccount")}{" "}
                <a
                  href="/register"
                  className="text-red-500 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  {t("Registerhere")}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
