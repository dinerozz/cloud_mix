import React, { FC } from "react";
import { RecipientBar } from "@/components/molecules/RecipientBar";
import { ChatContainer } from "@/components/molecules/ChatContainer";

type TChatBoxProps = {
  onBack?: () => void;
};

export const ChatBox: FC<TChatBoxProps> = ({ onBack }) => {
  return (
    <div className="flex-grow w-full bg-primaryChat flex flex-col justify-between">
      <RecipientBar onBack={onBack} />
      <ChatContainer />
    </div>
  );
};
