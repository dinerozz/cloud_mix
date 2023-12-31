import React, { FC, useCallback, useState } from "react";
import { DialogsBar } from "@/components/molecules/DialogsBar";
import { ChatListItem } from "@/components/molecules/ChatListItem";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allChatsState,
  foundedChatsState,
  searchState,
} from "@/store/chatsState";
import { useMutation, useQuery } from "react-query";
import { chatApi, TInitializeChatRequest } from "@/api/chatApi";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { userInfoState } from "@/store/authState";

export const DialogsBox: FC = () => {
  const [foundedChats] = useRecoilState(foundedChatsState);
  const [searchValue] = useRecoilState(searchState);
  const userInfo = useRecoilValue(userInfoState);
  const [allChats, setAllChats] = useRecoilState(allChatsState);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const navigate = useNavigate();

  const { refetch: refetchChats } = useQuery(
    ["chat-list"],
    () => chatApi.getChats(),
    {
      onSuccess: (res) => setAllChats(res),
      // refetchInterval: 5000,
    },
  );

  const initializeChatMutation = useMutation(
    (payload: TInitializeChatRequest) => chatApi.initializeChat(payload),
    {
      onSuccess: () =>
        notification.success({ message: "Conversation created successfully" }),
      onError: () => notification.error({ message: "Something went wrong" }),
    },
  );

  const findExistingChat = (currentUserId: string, dialogId: string) =>
    allChats?.find(
      (chat) =>
        (chat.userId1 === currentUserId && chat.userId2 === dialogId) ||
        (chat.userId1 === dialogId && chat.userId2 === currentUserId),
    );

  const handleDialogClick = useCallback(
    (dialogId: string, isUserId: boolean) => {
      const currentUserId = userInfo?.id ?? "";

      if (isUserId) {
        const existingChat = findExistingChat(currentUserId, dialogId);
        if (existingChat) {
          navigate(`/chat/${existingChat.id}`);
        } else {
          initializeChatMutation.mutate(
            { userId1: currentUserId, userId2: dialogId },
            {
              onSuccess: (res) => {
                refetchChats();
                setActiveChat(res.id);
                navigate(`/chat/${res.id}`);
              },
            },
          );
        }
      } else {
        setActiveChat(dialogId);
        navigate(`/chat/${dialogId}`);
      }
    },
    [allChats, userInfo, initializeChatMutation, refetchChats, navigate],
  );

  return (
    <div className="flex-shrink-0 w-full md:w-1/3 sm:w-1/2 lg:w-1/4 border-r-[1px] border-borderColor overflow-y-auto">
      <DialogsBar />
      {searchValue.length > 0 ? (
        <></>
      ) : (
        <ChatListItem
          key={"ai-assistant"}
          onClick={() => handleDialogClick("ai-assistant", false)}
          title="AI Assistant"
          message="Hello, I am AI assistant"
          time="10:44"
          listItemBg="bg-activeDialog"
          isActive={activeChat === "ai-assistant"}
          isChecked
          isAssistant
        />
      )}
      {searchValue.length > 0
        ? foundedChats.map((item) => (
            <ChatListItem
              onClick={() => handleDialogClick(item.id, true)}
              key={item.id}
              title={item.username}
              message=""
              time="10:44"
              isChecked={true}
              isActive={item.id === activeChat}
            />
          ))
        : allChats?.map((item) => (
            <ChatListItem
              onClick={() => handleDialogClick(item.id, false)}
              key={item.id}
              title={item.otherUserName}
              message={item.lastMessage}
              counter={item.unreadCount}
              time="10:44"
              isChecked={item.unreadCount === 0}
              isActive={item.id === activeChat}
            />
          ))}
    </div>
  );
};
