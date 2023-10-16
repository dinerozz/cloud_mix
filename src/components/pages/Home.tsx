import { FC } from "react";

import { Button, Layout } from "antd";
import SendMessageIcon from "../../../public/assets/icons/SendMessageIcon.svg";
import { MessageListItem } from "../molecules/MessageListItem";
import { AppHeader } from "../molecules/AppHeader";
import Input from "antd/lib/input/Input";

export const Home: FC = () => {
  return (
    <Layout className="layout h-[100vh] bg-white">
      <AppHeader />
      <div className="flex h-[100vh] w-full border-t-[1px] border-[#9AACB5] bg-[#FBFBFB]">
        <div className="w-[30%] border-r-[1px] border-gray-light">
          <div className="px-10 py-[30px] h-[90px] border-b-[1px] border-[#9AACB5]">
            <p className="text-[28px] leading-[28px]">Messages(3)</p>
          </div>
          <MessageListItem
            title="Aslan"
            message="Hi, how is going now?"
            time="10:44"
            listItemBg="bg-[#EDEBEF]"
            isChecked={false}
          />
          <MessageListItem
            title="Moana"
            message="Yo bro I got some info for you"
            time="10:44"
            isChecked={true}
          />
          <MessageListItem
            title="Dragon Love"
            message="Send nuds"
            time="10:44"
            isChecked={false}
          />
        </div>
        <div className="w-full bg-[#F2F1F4] flex flex-col justify-between">
          <div className="flex flex-col px-10 py-4 h-[90px] border-b-[1px] border-[#9AACB5] bg-white">
            <p className="text-[18px] font-[500] leading-[28px]">Aslan</p>
            <p className="opacity-[0.5] text-[16px] font-[400] leading-[28px]">
              Online
            </p>
          </div>
          <div className="flex justify-between items-center">
            <Input
              className="h-16 rounded-[0px] outline-0"
              placeholder="Write a message ..."
              suffix={
                <Button className="bg-none p-0 border-0 outline-0">
                  <img src={SendMessageIcon} alt="send-message-icon" />
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
