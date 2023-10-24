import React, { FC } from "react";
import { RecipientBar } from "@/components/molecules/RecipientBar";
import { ChatContainer } from "@/components/molecules/ChatContainer";
import { useRecoilValue } from "recoil";
import { selectedChatState } from "@/store/chatsState";

type TChatBoxProps = {
  onBack?: () => void;
};

export const ChatBox: FC<TChatBoxProps> = ({ onBack }) => {
  const selectedChat = useRecoilValue(selectedChatState);

  return (
    <div className="flex-grow w-full bg-primaryChat flex flex-col justify-between">
      <RecipientBar username={selectedChat.otherUserName} onBack={onBack} />
      <ChatContainer
        key={selectedChat.id}
        chatId={selectedChat.id}
        dialogType={selectedChat.id === "ai-assistant" ? "ai" : "user"}
      />
    </div>
  );
};
