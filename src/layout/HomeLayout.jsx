import React from "react";
import Footer from "../components/footer/Footer";
import AuthNavbar from "../components/navbar/AuthNavbar";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <AuthNavbar />
      <div className="h-full w-full min-h-screen  bg-custom-slate">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
