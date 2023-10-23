import React, { FC, useEffect, useState } from "react";

import { DialogsBox } from "@/components/organisms/DialogsBox";
import { ChatBox } from "@/components/organisms/ChatBox";
import { ChatLayout } from "@/components/templates/ChatLayout";
import { useWindowSize } from "@/components/hooks/useWindowSize";
import { useQuery } from "react-query";
import { userApi } from "@/api/userApi";
import { io } from "socket.io-client";
import { useRecoilState } from "recoil";
import { isLoggedInState, userInfoState } from "@/store/authState";

export const DialogsPage: FC = () => {
  const size = useWindowSize();
  const [selectedDialog, setSelectedDialog] = useState<string | null>(null);
  const isMobile = size?.width ? size.width < 768 : false;
  const [isLoggedIn] = useRecoilState(isLoggedInState);
  const [, setUser] = useRecoilState(userInfoState);

  const { data: currentUser, isLoading } = useQuery(
    "current-user",
    () => userApi.getCurrentUser(),
    {
      enabled: isLoggedIn,
      onSuccess: (res) => setUser({ id: res.id, username: res.username }),
    }
  );

  const handleBack = () => {
    setSelectedDialog(null);
  };

  return (
    <ChatLayout>
      <div className="flex h-[calc(100vh-92px)] w-full border-t-[1px] border-borderColor bg-grayWhite mt-[92px]">
        {isMobile ? (
          selectedDialog === null ? (
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
