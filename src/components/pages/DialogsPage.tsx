import React, { FC } from "react";

import { DialogsBox } from "@/components/organisms/DialogsBox";
import { ChatBox } from "@/components/organisms/ChatBox";
import { ChatLayout } from "@/components/templates/ChatLayout";
import { useWindowSize } from "@/components/hooks/useWindowSize";
import { useRecoilState } from "recoil";
import { selectedChatState } from "@/store/chatsState";

const initialState = {
  id: "",
  userId1: "",
  userId2: "",
  updatedAt: "",
  createdAt: "",
  otherUserName: "",
};

export const DialogsPage: FC = () => {
  const size = useWindowSize();
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);
  const isMobile = size?.width ? size.width < 768 : false;

  const handleBack = () => {
    setSelectedChat(initialState);
  };

  return (
    <ChatLayout>
      <div className="flex h-[calc(100vh-92px)] w-full border-t-[1px] border-borderColor bg-grayWhite mt-[92px]">
        {isMobile ? (
          selectedChat.id === "" ? (
            <DialogsBox />
          ) : (
            <ChatBox onBack={handleBack} />
          )
        ) : (
          <>
            <DialogsBox />
            <ChatBox />
          </>
        )}
      </div>
    </ChatLayout>
  );
};
