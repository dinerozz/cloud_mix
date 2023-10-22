import React, { FC, ReactNode } from "react";
import { Layout } from "antd";
import { LoginLogo } from "@/components/molecules/LoginLogo";

type TLoginLayoutProps = {
  children: ReactNode;
};

export const LoginLayout: FC<TLoginLayoutProps> = ({ children }) => {
  return (
    <Layout className="layout h-[100vh] bg-primary overflow-hidden flex items-center justify-center w-full p-4 md:p-0">
      <div className="bg-white p-5 sm:p-6 md:p-10 rounded w-full sm:w-[75%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]">
        <LoginLogo />
        {children}
      </div>
    </Layout>
  );
};
