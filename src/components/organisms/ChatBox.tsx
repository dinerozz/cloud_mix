import React, { FC } from "react";
import { RecipientBar } from "@/components/molecules/RecipientBar";
import { ChatContainer } from "@/components/molecules/ChatContainer";
import { useParams } from "react-router-dom";
import { Empty } from "antd";
import DogIcon from "@/components/atoms/Icons/DogIcon";

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
    <div className="flex-grow w-full bg-primaryChat flex items-center justify-center">
      <Empty
        image={<DogIcon width={128} height={128} />}
        description={
          <p className="text-primaryText text-[18px]">
            Select chat from chatlist
          </p>
        }
      ></Empty>
    </div>
  );
};
