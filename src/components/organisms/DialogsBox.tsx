import React, { FC } from "react";
import { DialogsBar } from "@/components/molecules/DialogsBar";
import { ChatListItem } from "@/components/molecules/ChatListItem";

type TDialogsBoxProps = {
  onDialogSelect?: (dialogId: string) => void;
};

export const DialogsBox: FC<TDialogsBoxProps> = ({ onDialogSelect }) => {
  return (
    <div className="flex-shrink-0 w-full md:w-1/3 sm:w-1/2 lg:w-1/4 border-r-[1px] border-borderColor">
      <DialogsBar />
      <ChatListItem
        onClick={onDialogSelect}
        title="AI Assistant"
        message="Hello, I am AI assistant"
        time="10:44"
        listItemBg="bg-activeDialog"
        isChecked
        isAssistant
      />
      <ChatListItem
        title="Moana"
        message="Yo bro I got some info for you"
        time="10:44"
        isChecked={true}
      />
    </div>
  );
};
