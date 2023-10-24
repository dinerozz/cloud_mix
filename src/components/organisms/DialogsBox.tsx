import React, { FC } from "react";
import { DialogsBar } from "@/components/molecules/DialogsBar";
import { ChatListItem } from "@/components/molecules/ChatListItem";
import { useRecoilState } from "recoil";
import { foundedChatsState, searchState } from "@/store/chatsState";
import { useMutation, useQuery } from "react-query";
import { chatApi, TInitializeChatRequest } from "@/api/chatApi";
import { notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";

export const DialogsBox: FC = () => {
  const { id: chatId } = useParams();
  const [foundedChats] = useRecoilState(foundedChatsState);
  const [searchValue] = useRecoilState(searchState);

  const navigate = useNavigate();

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
    navigate(`/chat/${dialogId}`);
  };

  return (
    <div className="flex-shrink-0 w-full md:w-1/3 sm:w-1/2 lg:w-1/4 border-r-[1px] border-borderColor">
      <DialogsBar />
      <ChatListItem
        key={"ai-assistant"}
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
              key={item.id}
              title={item.username}
              message="Yo bro I got some info for you"
              time="10:44"
              isChecked={true}
            />
          ))
        : chats?.map((item) => (
            <ChatListItem
              onClick={() => handleDialogClick(item.id)}
              key={item.id}
              title={item.otherUserName}
              message="Yo bro I got some info for you"
              time="10:44"
              isChecked={true}
            />
          ))}
    </div>
  );
};
