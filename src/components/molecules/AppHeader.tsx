import React from "react";
import Logo from "../../../public/assets/icons/Logo.svg";
import { Header } from "antd/lib/layout/layout";

export const AppHeader = () => {
  return (
    <Header className="bg-white flex justify-between items-center leading-[28px]">
      <div id="logo">
        <img src={Logo} alt="" />
      </div>
      <div>
        <p className="text-[18px] font-[500]">Samurai Meow</p>
        <p className="opacity-[0.5] text-right">Logout</p>
      </div>
    </Header>
  );
};
