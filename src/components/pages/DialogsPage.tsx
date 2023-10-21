import React, { FC, useState } from "react";

import { DialogsBox } from "@/components/organisms/DialogsBox";
import { ChatBox } from "@/components/organisms/ChatBox";
import { ChatLayout } from "@/components/templates/ChatLayout";
import { useWindowSize } from "@/components/hooks/useWindowSize";

export const DialogsPage: FC = () => {
  const size = useWindowSize();
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  const isMobile = size?.width ? size.width < 768 : false;

  const handleDialogSelect = (dialogId: string) => {
    setSelectedDialog(dialogId);
  };

  const handleBack = () => {
    setSelectedDialog(null);
  };

  return (
    <ChatLayout>
      <div className="flex h-[calc(100vh-92px)] w-full border-t-[1px] border-borderColor bg-grayWhite mt-[92px]">
        {isMobile ? (
          selectedDialog === null ? (
            <DialogsBox onDialogSelect={handleDialogSelect} />
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
