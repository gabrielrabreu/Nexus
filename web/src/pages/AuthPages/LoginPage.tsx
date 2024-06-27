import React from "react";

import { Login } from "@/components/Auth/Login";

import "./LoginPage.css";

const _LoginPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex ">
      <div
        className="
          flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 
          bg-white"
      >
        <div
          className="
            sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-no-repeat bg-cover relative 
            bg-dark-primary-200 text-white"
        >
          <div
            className="
              absolute bg-gradient-to-b opacity-75 inset-0 z-0
              from-dark-mixed-200 to-dark-mixed-500"
          ></div>
          <div className="w-full max-w-md z-10"></div>
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <Login />
      </div>
    </div>
  );
};

const LoginPage = React.memo(_LoginPage);

export default LoginPage;
