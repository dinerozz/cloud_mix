import { FC } from "react";

import { Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import Logo from "../../../public/assets/icons/Logo.svg";

export const Home: FC = () => {
  return (
    <Layout className="layout h-[100vh] bg-white">
      <Header className="bg-white flex justify-between items-center leading-[28px]">
        <div id="logo">
          <img src={Logo} alt="" />
        </div>
        <div>
          <p className="text-[18px] font-[500]">Samurai Meow</p>
          <p className="opacity-[0.5] text-right">Logout</p>
        </div>
      </Header>
      <div className="flex h-[100vh] w-full border-t-[1px] border-[#9AACB5] bg-[#FBFBFB]">
        <div className="w-[30%] border-r-[1px] border-gray-light">
          <div className="px-10 py-[30px] h-[90px] border-b-[1px] border-[#9AACB5]">
            <p className="text-[28px] leading-[28px]">Messages(3)</p>
          </div>
          <div className="px-10 py-[20px] h-[90px] border-b-[1px] border-[#9AACB5] cursor-pointer bg-[#EDEBEF]">
            <p className="text-[18px] font-[500] leading-[28px]">Aslan</p>
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-400 opacity-[0.5] leading-[21px]">
                Hi, how is going now?
              </p>
              <p className="text-[16px] font-400 opacity-[0.5] leading-[28px]">
                10:44
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col px-10 py-4 h-[90px] border-b-[1px] border-[#9AACB5]">
            <p className="text-[18px] font-[500] leading-[28px]">Aslan</p>
            <p className="opacity-[0.5] text-[16px] font-[400] leading-[28px]">
              Online
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </Layout>
  );
};
