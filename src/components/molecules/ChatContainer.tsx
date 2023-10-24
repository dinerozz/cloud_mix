import React, { FC, useEffect, useRef, useState } from "react";
import Input from "antd/lib/input/Input";
import { Button, Form, Spin, Typography } from "antd";
import SendMessageIcon from "../../../public/assets/icons/SendMessageIcon.svg";
import { MessageList } from "./MessageList";
import { chatApi } from "@/api/chatApi";
import { Message } from "@/components/atoms/Message";
import { io, Socket } from "socket.io-client";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/authState";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

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

type TUserMessages = {
  userId: string;
  text: string;
};

const SOCKET_URL = "http://localhost:4000";

export const ChatContainer = () => {
  const { id: chatId } = useParams();
  const userInfo = useRecoilValue(userInfoState);
  const [form] = Form.useForm();
  const socketRef = useRef<Socket>(null);
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
    () => chatApi.getChatHistory(chatId ?? ""),
    {
      onSuccess: (res) => setUserMessages(res),
      enabled: chatId !== "ai-assistant",
    }
  );

  useEffect(() => {
    // @ts-ignore
    socketRef.current = io(SOCKET_URL, {
      query: { chatId },
    });
    socketRef.current.on("connect", () => {
      console.log("Connected to server");
      socketRef.current?.emit("joinChat", { chatId });
    });
    socketRef.current.on("newMessage", (message) => {
      setUserMessages((prevMessages) => [...prevMessages, message]);
    });
    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socketRef.current?.disconnect();
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
      messages: [systemMessage, ...apiMessages],
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

    if (chatId === "ai-assistant") {
      const newMessage = {
        message: values.message,
        sender: "user",
      };

      form.resetFields(["message"]);

      const newMessages = [...aiMessages, newMessage];

      setAiMessages(newMessages);
      setTyping(true);

      await processMessageToChatGPT(newMessages);
    } else {
      form.resetFields(["message"]);
      socketRef.current?.emit("sendMessage", {
        chatId,
        userId: userInfo?.id ?? "",
        text: values.message,
      });
    }
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      {isChatHistoryLoading && (
        <Spin size="large" className="flex items-center justify-center" />
      )}
      <MessageList>
        {chatId === "ai-assistant"
          ? aiMessages.map((message, index) => (
              <Message
                key={"ai-" + index}
                isUser={message.sender !== "AI Assistant"}
                content={message}
              />
            ))
          : userMessages.map((message, index) => (
              <Message
                key={"user" + index}
                isUser={message.userId === userInfo?.id}
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
