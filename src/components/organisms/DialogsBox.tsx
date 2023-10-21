import React from "react";
import { DialogsBar } from "@/components/molecules/DialogsBar";
import { ChatListItem } from "@/components/molecules/ChatListItem";

export const DialogsBox = () => {
  return (
    <div className="flex-shrink-0 w-full md:w-1/3 sm:w-1/2 lg:w-1/4 border-r-[1px] border-borderColor">
      <DialogsBar />
      <ChatListItem
        title="AI Assistant"
        message="Hello, I am AI assistant"
        time="10:44"
        listItemBg="bg-activeDialog"
        isChecked={false}
      />
      <ChatListItem
        title="Moana"
        message="Yo bro I got some info for you"
        time="10:44"
        isChecked={true}
      />
      <ChatListItem
        title="Dragon Love"
        message="Send nuds"
        time="10:44"
        isChecked={false}
      />
    </div>
  );
};
