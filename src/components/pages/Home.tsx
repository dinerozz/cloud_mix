import { FC, useState } from "react";

import { Layout } from "antd";
import { ChatListItem } from "../molecules/ChatListItem";
import { AppHeader } from "../molecules/AppHeader";
import { ChatContainer } from "../molecules/ChatContainer";
import { RecipientBar } from "../molecules/RecipientBar";

export const Home: FC = () => {
  return (
    <Layout className="layout h-[100vh] bg-white overflow-hidden">
      <AppHeader />
      <div className="flex h-[calc(100vh-92px)] w-full border-t-[1px] border-[#9AACB5] bg-[#FBFBFB] mt-[92px]">
        <div className="w-[30%] border-r-[1px] border-gray-light">
          <div className="px-10 py-[30px] h-[90px] border-b-[1px] border-[#9AACB5]">
            <p className="text-[28px] leading-[28px]">Messages(3)</p>
          </div>
          <ChatListItem
            title="AI Assistant"
            message="Hello, I am AI assistant"
            time="10:44"
            listItemBg="bg-[#EDEBEF]"
            isChecked={false}
          />
          <ChatListItem
            title="Moana"
            message="Yo bro I got some info for you"
            time="10:44"
            isChecked={true}
          />
          <ChatListItem
            title="Dragon Love"
            message="Send nuds"
            time="10:44"
            isChecked={false}
          />
        </div>
        <div className="w-full bg-[#F2F1F4] flex flex-col justify-between">
          <RecipientBar />
          <ChatContainer />
        </div>
      </div>
    </Layout>
  );
};
