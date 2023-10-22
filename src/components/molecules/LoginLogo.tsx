import React from "react";
import CloudIcon from "@/components/atoms/Icons/CloudIcon";
import { Typography } from "antd";

export const LoginLogo = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <CloudIcon width="140" height="140" className="rotate-and-fade-in" />
      <Typography.Title className="fade-in-down">
        Cloud
        <Typography.Text className="text-[38px] text-primary font-[600] fade-in-up">
          Mix
        </Typography.Text>
      </Typography.Title>
    </div>
  );
};
