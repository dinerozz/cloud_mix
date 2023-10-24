import { atom } from "recoil";

type TFoundedChats = {
  id: string;
  username: string;
}[];

export type TSelectedChatState = {
  id: string;
  userId1: string;
  userId2: string;
  updatedAt: string;
  createdAt: string;
  otherUserName: string;
};

export const foundedChatsState = atom<TFoundedChats>({
  key: "foundedChatsState",
  default: [],
});

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const selectedChatState = atom<TSelectedChatState>({
  key: "selectedChatState",
  default: {
    id: "ai-assistant",
    userId1: "",
    userId2: "",
    updatedAt: "",
    createdAt: "",
    otherUserName: "AI Assistant",
  },
});
