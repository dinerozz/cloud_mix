import React, { FC, RefObject, useEffect, useRef } from "react";

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

  const renderMobileView = () =>
    chatId ? <ChatBox onBack={handleBack} /> : <DialogsBox />;

  const renderDesktopView = () => (
    <>
      <DialogsBox />
      <ChatBox />
    </>
  );

  return (
    <ChatLayout>
      <div className="flex h-[calc(100vh-92px)] w-full border-t-[1px] border-borderColor bg-grayWhite mt-[92px]">
        {isMobile ? renderMobileView() : renderDesktopView()}
      </div>
    </ChatLayout>
  );
};
