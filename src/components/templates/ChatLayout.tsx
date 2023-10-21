import React, { FC, ReactNode } from "react";
import { Layout } from "antd";
import { AppHeader } from "@/components/molecules/AppHeader";

type TChatLayoutProps = {
  children: ReactNode;
};

export const ChatLayout: FC<TChatLayoutProps> = ({ children }) => {
  return (
    <Layout className="layout h-[100vh] bg-white overflow-hidden">
      <AppHeader />
      {children}
    </Layout>
  );
};
