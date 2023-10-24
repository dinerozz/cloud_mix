import React, { FC } from "react";

import { DialogsBox } from "@/components/organisms/DialogsBox";
import { ChatBox } from "@/components/organisms/ChatBox";
import { ChatLayout } from "@/components/templates/ChatLayout";
import { useWindowSize } from "@/components/hooks/useWindowSize";
import { useNavigate, useParams } from "react-router-dom";

export const DialogsPage: FC = () => {
  const { id: chatId } = useParams();
  const size = useWindowSize();
  const isMobile = size?.width ? size.width < 768 : false;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/chat");
  };

  return (
    <ChatLayout>
      <div className="flex h-[calc(100vh-92px)] w-full border-t-[1px] border-borderColor bg-grayWhite mt-[92px]">
        {isMobile ? (
          !chatId ? (
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
