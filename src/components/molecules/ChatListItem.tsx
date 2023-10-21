import React, { FC } from "react";
import { Button } from "antd";

type TMessageListItemProps = {
  title: string;
  message: string;
  time: string;
  isChecked: boolean;
  listItemBg?: string;
  counter?: number;
  onClick?: (dialogId: string) => void;
  isAssistant?: boolean;
};

export const ChatListItem: FC<TMessageListItemProps> = ({
  title,
  message,
  time,
  isChecked = false,
  listItemBg = "bg-white",
  counter = 1,
  onClick = () => {},
  isAssistant = false,
}) => {
  return (
    <Button
      type="text"
      onClick={() => onClick(new Date().toString())}
      className={`border-t-0 border-r-0 rounded-[0px] w-full outline-0 px-10 py-[20px] h-[90px] border-b-[1px] border-[#9AACB5] cursor-pointer hover:bg-white-gray duration-300 ${listItemBg}`}
    >
      <div className="flex justify-between items-center">
        <p className="text-[18px] font-[500] leading-[28px]">{title}</p>
        {isChecked && (
          <div className="bg-[#9969FF] text-white w-6 h-6 rounded-full px-[8.5px] py-[2px]">
            {counter}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-400 opacity-[0.5] leading-[21px]">
          {message}
        </p>
        <p className="text-[16px] font-400 opacity-[0.5] leading-[28px]">
          {time}
        </p>
      </div>
    </Button>
  );
};
