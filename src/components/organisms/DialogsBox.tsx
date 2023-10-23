import React, { FC } from "react";
import { DialogsBar } from "@/components/molecules/DialogsBar";
import { ChatListItem } from "@/components/molecules/ChatListItem";
import { useRecoilState } from "recoil";
import {
  foundedChatsState,
  searchState,
  selectedChatState,
  TSelectedChatState,
} from "@/store/chatsState";
import { useMutation, useQuery } from "react-query";
import { chatApi, TInitializeChatRequest } from "@/api/chatApi";
import { notification } from "antd";

export const DialogsBox: FC = () => {
  const [foundedChats] = useRecoilState(foundedChatsState);
  const [searchValue] = useRecoilState(searchState);
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatState);

  const { data: chats, isLoading: isChatsLoading } = useQuery(
    ["chat-list"],
    () => chatApi.getChats()
  );

  const initializeChatMutation = useMutation(
    (payload: TInitializeChatRequest) => chatApi.initializeChat(payload),
    {
      onSuccess: () =>
        notification.success({ message: "Conversation created successfully" }),
      onError: () => notification.error({ message: "Something went wrong" }),
    }
  );

  const handleDialogClick = (dialogId: string) => {
    if (dialogId === "ai-assistant") {
      const aiAssistantDialog = {
        id: dialogId,
        userId1: "",
        userId2: "",
        updatedAt: "",
        createdAt: "",
        otherUserName: "AI Assistant",
      };
      setSelectedChat(aiAssistantDialog);
    } else {
      const selectedDialog = chats?.find((chat) => chat.id === dialogId);
      setSelectedChat(selectedDialog as TSelectedChatState);
    }
  };

  return (
    <div className="flex-shrink-0 w-full md:w-1/3 sm:w-1/2 lg:w-1/4 border-r-[1px] border-borderColor">
      <DialogsBar />
      <ChatListItem
        index={"ai-assistant"}
        onClick={() => handleDialogClick("ai-assistant")}
        title="AI Assistant"
        message="Hello, I am AI assistant"
        time="10:44"
        listItemBg="bg-activeDialog"
        isChecked
        isAssistant
      />
      {searchValue.length > 0
        ? foundedChats.map((item) => (
            <ChatListItem
              onClick={() => handleDialogClick(item.id)}
              index={item.id}
              title={item.username}
              message="Yo bro I got some info for you"
              time="10:44"
              isChecked={true}
            />
          ))
        : chats?.map((item) => (
            <ChatListItem
              onClick={() => handleDialogClick(item.id)}
              index={item.id}
              title={item.otherUserName}
              message="Yo bro I got some info for you"
              time="10:44"
              isChecked={true}
            />
          ))}
    </div>
  );
};
