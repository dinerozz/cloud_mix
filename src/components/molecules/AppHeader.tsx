import React from "react";
import Logo from "../../../public/assets/icons/Logo.svg";
import { Header } from "antd/lib/layout/layout";

export const AppHeader = () => {
  return (
    <Header className="bg-white flex justify-between items-center leading-[28px] h-[92px] fixed top-0 left-0 w-full md:px-10 px-5">
      <div id="logo">
        <img src={Logo} alt="" className="max-w-full max-h-[92px]" />
      </div>
      <div className="text-sm md:text-base">
        <p className="font-[500] mb-0 text-[18px]">Samurai Meow</p>
        <p className="opacity-[0.5] text-right text-[16px]">Logout</p>
      </div>
    </Header>
  );
};
