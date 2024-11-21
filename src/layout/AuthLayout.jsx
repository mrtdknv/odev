import React from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="h-full w-full min-h-screen  bg-custom-slate">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
