import React, { FC, useEffect, useState } from "react";
import Input from "antd/lib/input/Input";
import { Button, Form, Spin, Typography } from "antd";
import SendMessageIcon from "../../../public/assets/icons/SendMessageIcon.svg";
import { MessageList } from "./MessageList";
import { chatApi } from "@/api/chatApi";
import { Message } from "@/components/atoms/Message";
import { io } from "socket.io-client";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/authState";
import { useQuery } from "react-query";

enum EMessageSender {
  ChatGPT = "ChatGPT",
}

enum ERole {
  Assistant = "assistant",
  User = "user",
}

type TMessage = {
  message: string;
  sender: string;
};

type TChatContainerProps = {
  dialogType: "ai" | "user";
  chatId: string;
};

type TUserMessages = {
  chatId: string;
  userId: string;
  text: string;
};

const socket = io("http://localhost:4000");

export const ChatContainer: FC<TChatContainerProps> = ({
  dialogType,
  chatId,
}) => {
  const userInfo = useRecoilValue(userInfoState);
  const [form] = Form.useForm();
  const [typing, setTyping] = useState(false);
  const [aiMessages, setAiMessages] = useState<TMessage[]>([
    {
      message: "Hello, I am AI assistant!",
      sender: "AI Assistant",
    },
  ]);

  const [userMessages, setUserMessages] = useState<TUserMessages[]>([]);

  const { data: chatHistory, isLoading: isChatHistoryLoading } = useQuery(
    ["chat-history", chatId],
    () => chatApi.getChatHistory(chatId),
    {
      onSuccess: (res) => setUserMessages(res),
      enabled: chatId !== "ai-assistant",
    }
  );

  useEffect(() => {
    setUserMessages([]);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.emit("joinChat", { chatId });

    // socket.on("chatHistory", (history) => {
    //   setUserMessages(history);
    // });

    socket.on("newMessage", (message) => {
      setUserMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [chatId]);

  const processMessageToChatGPT = async (chatMessages: TMessage[]) => {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === EMessageSender.ChatGPT) {
        role = ERole.Assistant;
      } else {
        role = ERole.User;
      }
      return { role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Respond like software engineer",
    };

    const requestBody = {
      model: "gpt-4",
      messages: [systemMessage, ...apiMessages], // [message1, ...]
    };

    await chatApi.sendMessageToChatGPT(requestBody).then((res) => {
      setAiMessages([
        ...chatMessages,
        { message: res.choices[0].message.content, sender: "AI Assistant" },
      ]);
      setTyping(false);
    });
  };

  const handleSend = async (values: { message: string }) => {
    if (values.message.length === 0) {
      return;
    }

    if (dialogType === "ai") {
      const newMessage = {
        message: values.message,
        sender: "user",
      };

      form.resetFields(["message"]);

      const newMessages = [...aiMessages, newMessage]; // old messages + new message

      setAiMessages(newMessages);
      setTyping(true);

      await processMessageToChatGPT(newMessages);
    } else if (dialogType === "user") {
      form.resetFields(["message"]);

      console.log("send message");
      socket.emit("sendMessage", {
        chatId,
        userId: userInfo?.id ?? "",
        text: values.message,
      });
    }
  };
  console.log(userMessages);
  return (
    <div className="flex flex-col overflow-y-auto">
      {isChatHistoryLoading && (
        <Spin size="large" className="flex items-center justify-center" />
      )}
      <MessageList>
        {dialogType === "ai"
          ? aiMessages.map((message, index) => (
              <Message
                key={index}
                isUser={message.sender !== "AI Assistant"}
                index={index}
                content={message}
              />
            ))
          : userMessages.map((message, index) => (
              <Message
                key={message.userId}
                isUser={message.userId === userInfo?.id}
                index={index}
                content={{ message: message.text, sender: message.userId }}
              />
            ))}
      </MessageList>
      <div className="flex justify-between items-center">
        <Form form={form} onFinish={handleSend} className="w-full">
          {typing && (
            <Typography.Text className="typing-indicator px-4 text-gray-light">
              AI assistant is typing...
            </Typography.Text>
          )}
          <Form.Item className="m-0" name="message">
            <Input
              disabled={typing}
              className="sticky h-16 rounded-[0px] outline-0"
              placeholder="Write a message ..."
              suffix={
                <Button
                  className="bg-none border-0 outline-0"
                  htmlType="submit"
                  disabled={typing}
                >
                  <img src={SendMessageIcon} alt="send-message-icon" />
                </Button>
              }
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
