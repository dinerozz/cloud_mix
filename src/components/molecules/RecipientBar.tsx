import React, { FC } from "react";
import { useWindowSize } from "@/components/hooks/useWindowSize";
import { Button, Spin } from "antd";
import { SvgChevronLeftIcon } from "@/components/atoms/Icons";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { chatApi } from "@/api/chatApi";

type TRecipientBarProps = {
  onBack?: () => void;
};

export const RecipientBar: FC<TRecipientBarProps> = ({ onBack }) => {
  const { id: chatId } = useParams();
  const size = useWindowSize();
  const isMobile = size?.width ? size.width < 768 : false;

  const { data: recipient, isLoading } = useQuery(
    ["recipient-data", chatId],
    () => chatApi.getChatParticipant(chatId ?? ""),
    { enabled: chatId !== "ai-assistant" }
  );

  if (isMobile) {
    return (
      <div className="h-[76px] w-full bg-white text-left text-primaryText px-6 py-2.5 inline-flex items-start gap-2 border-b-[1px] border-b-borderColor">
        <Button
          type="text"
          className="p-0 m-0 !w-6 h-6 bg-transparent border-0 rounded-0 shadow-none flex text-[18px]"
          onClick={onBack}
          icon={<SvgChevronLeftIcon className="w-6 h-6" />}
        />
        <div>
          <p className="text-[18px] font-[500] leading-[25px] m-0">
            {isLoading ? <Spin /> : recipient?.username || "AI Assistant"}
          </p>
          <p className="opacity-[0.5] text-[16px] font-[400] leading-[28px]">
            Online
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-10 py-4 h-[90px] border-b-[1px] border-borderColor bg-white">
      <p className="text-[18px] font-[500] leading-[28px]">
        {isLoading ? <Spin /> : recipient?.username || "AI Assistant"}
      </p>
      <p className="opacity-[0.5] text-[16px] font-[400] leading-[28px]">
        Online
      </p>
    </div>
  );
};
