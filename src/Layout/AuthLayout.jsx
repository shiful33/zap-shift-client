import React from "react";
import Logo from "../Components/Logo/Logo";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="mx-auto lg:max-w-7xl">
      <Logo />
      <div className="items-center lg:flex">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="flex-1">
          <img src={authImage} alt="" className="lg:w-[700px]"/>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
