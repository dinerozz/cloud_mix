import React, { FC, ReactNode, useEffect, useRef } from "react";

type TMessageListProps = {
  children: ReactNode;
  typingIndicator: boolean;
};

export const MessageList: FC<TMessageListProps> = ({
  children,
  typingIndicator,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [children]);

  return (
    <div className="flex flex-col gap-9 py-9 overflow-y-auto overflow-x-hidden h-full flex-grow px-10">
      {children}
      <div ref={bottomRef} />
    </div>
  );
};
