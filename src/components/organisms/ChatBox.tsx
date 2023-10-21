import React from "react";
import { RecipientBar } from "@/components/molecules/RecipientBar";
import { ChatContainer } from "@/components/molecules/ChatContainer";

export const ChatBox = () => {
  return (
    <div className="flex-grow w-full bg-primaryChat flex flex-col justify-between">
      <RecipientBar />
      <ChatContainer />
    </div>
  );
};
