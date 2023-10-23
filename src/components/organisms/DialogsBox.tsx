import React, { FC } from "react";
import { DialogsBar } from "@/components/molecules/DialogsBar";
import { ChatListItem } from "@/components/molecules/ChatListItem";
import { useRecoilState } from "recoil";
import { foundedChatsState, searchState } from "@/store/chatsState";
import { useQuery } from "react-query";
import { chatApi } from "@/api/chatApi";

type TDialogsBoxProps = {
  onDialogSelect?: (dialogId: string) => void;
};

export const DialogsBox: FC<TDialogsBoxProps> = ({ onDialogSelect }) => {
  const [foundedChats] = useRecoilState(foundedChatsState);
  const [searchValue] = useRecoilState(searchState);

  const { data: chats, isLoading: isChatsLoading } = useQuery(
    ["chat-list"],
    () => chatApi.getChats()
  );

  return (
    <div className="flex-shrink-0 w-full md:w-1/3 sm:w-1/2 lg:w-1/4 border-r-[1px] border-borderColor">
      <DialogsBar />
      <ChatListItem
        key={"ai-assistant"}
        onClick={onDialogSelect}
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
              key={item.id}
              title={item.username}
              message="Yo bro I got some info for you"
              time="10:44"
              isChecked={true}
            />
          ))
        : chats?.map((item) => (
            <ChatListItem
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
