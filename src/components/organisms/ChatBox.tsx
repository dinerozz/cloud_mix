import React, { FC } from "react";
import { RecipientBar } from "@/components/molecules/RecipientBar";
import { ChatContainer } from "@/components/organisms/ChatContainer";
import { useParams } from "react-router-dom";
import { EmptyState } from "@/components/atoms/EmptyState";

type TChatBoxProps = {
  onBack?: () => void;
};

export const ChatBox: FC<TChatBoxProps> = ({ onBack }) => {
  const { id: chatId } = useParams();

  return chatId ? (
    <div className="flex-grow w-full bg-primaryChat flex flex-col justify-between">
      <RecipientBar onBack={onBack} />
      <ChatContainer />
    </div>
  ) : (
    <EmptyState />
  );
};
