import hljs from "highlight.js";
import React, { FC, useEffect, useRef } from "react";
import "highlight.js/styles/default.css";

type TMessageProps = {
  content: {
    message: string;
    sender: string;
  };
  key: number;
  isUser: boolean;
};

export const Message: FC<TMessageProps> = ({
  content,
  key: number,
  isUser,
}) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [content.message]);

  const messageClassNames = isUser
    ? "self-end bg-[#9969FF] custom-hljs-user"
    : "self-start bg-white custom-hljs";

  return (
    <p
      className={`max-w-[500px] max-h-[500px] flex items-center px-6 py-3 text-[16px] w-fit rounded-[16px] font-[400] ${messageClassNames}`}
    >
      <pre className="whitespace-pre-wrap h-full w-full overflow-auto">
        <code
          className={messageClassNames}
          ref={codeRef}
          dangerouslySetInnerHTML={{ __html: content.message }}
        />
      </pre>
    </p>
  );
};
