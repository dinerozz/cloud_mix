import React, { FC } from "react";
import { useWindowSize } from "@/components/hooks/useWindowSize";
import { Button } from "antd";
import { SvgChevronLeftIcon } from "@/components/atoms/Icons";

type TRecipientBarProps = {
  onBack?: () => void;
  username: string;
};

export const RecipientBar: FC<TRecipientBarProps> = ({ onBack, username }) => {
  const size = useWindowSize();
  const isMobile = size?.width ? size.width < 768 : false;

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
            {username || "AI Assistant"}
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
        {username || "AI Assistant"}
      </p>
      <p className="opacity-[0.5] text-[16px] font-[400] leading-[28px]">
        Online
      </p>
    </div>
  );
};
