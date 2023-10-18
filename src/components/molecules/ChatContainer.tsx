import React, { useEffect, useRef, useState } from "react";
import Input from "antd/lib/input/Input";
import { Button, Form, InputRef, Typography } from "antd";
import SendMessageIcon from "../../../public/assets/icons/SendMessageIcon.svg";
import { MessageList } from "./MessageList";
import { Message } from "../atoms/Message";
import { chatApi } from "../../api/chatApi";

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

export const ChatContainer = () => {
  const [form] = Form.useForm();
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<TMessage[]>([
    {
      message: "Hello, I am AI assistant!",
      sender: "AI Assistant",
    },
  ]);

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
      setMessages([
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

    const newMessage = {
      message: values.message,
      sender: "user",
    };

    form.resetFields(["message"]);

    const newMessages = [...messages, newMessage]; // old messages + new message

    setMessages(newMessages);
    setTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <MessageList>
        {messages.map((message, index) => (
          <Message
            isUser={message.sender !== "AI Assistant"}
            key={index}
            content={message}
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
