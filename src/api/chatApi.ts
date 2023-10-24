import axios from "axios";
import { api } from "@/api/index";

type TChatGPTPayload = {
  model: string;
  messages: { role: string; content: string }[];
};

type TChoice = {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
};

type TUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type TChatGPTResponseObject = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: TChoice[];
  usage: TUsage;
};

type TChatsResponse = {
  id: string;
  userId1: string;
  userId2: string;
  updatedAt: string;
  createdAt: string;
  otherUserName: string;
};

type TInitializeChatResponse = {
  id: string;
  userId1: string;
  userId2: string;
  updatedAt: string;
  createdAt: string;
};

export type TInitializeChatRequest = {
  userId1: string;
  userId2: string;
};

const sendMessageToChatGPT = (payload: TChatGPTPayload) =>
  axios
    .post<TChatGPTResponseObject>(
      import.meta.env.VITE_REACT_APP_OPENAI_API_URL,
      payload,
      {
        headers: {
          Authorization:
            "Bearer " + import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
        },
      }
    )
    .then((res) => res.data);

const getChats = () =>
  api.get<TChatsResponse[]>("/api/v1/chat/all").then((res) => res.data);

const initializeChat = (payload: TInitializeChatRequest) =>
  api
    .post<TInitializeChatResponse>("/api/v1/chat/initialize", payload)
    .then((res) => res.data);

const getChatHistory = (chatId: string) =>
  api.get(`/api/v1/chat/${chatId}/history`).then((res) => res.data);

export const chatApi = {
  sendMessageToChatGPT,
  getChats,
  initializeChat,
  getChatHistory,
};
