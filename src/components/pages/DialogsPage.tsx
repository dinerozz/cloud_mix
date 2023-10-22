import React, { FC, useContext, useEffect, useState } from "react";

import { DialogsBox } from "@/components/organisms/DialogsBox";
import { ChatBox } from "@/components/organisms/ChatBox";
import { ChatLayout } from "@/components/templates/ChatLayout";
import { useWindowSize } from "@/components/hooks/useWindowSize";
import { AuthContext } from "@/context/authContext";
import { useQuery } from "react-query";
import { userApi } from "@/api/userApi";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export const DialogsPage: FC = () => {
  const size = useWindowSize();
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  const isMobile = size?.width ? size.width < 768 : false;
  const { isLoggedIn, setUser } = useContext(AuthContext);

  const { data: currentUser, isLoading } = useQuery(
    "current-user",
    () => userApi.getCurrentUser(),
    {
      enabled: isLoggedIn,
      onSuccess: (res) => setUser({ id: res.id, username: res.username }),
    }
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
