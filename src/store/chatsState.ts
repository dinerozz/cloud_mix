import { atom } from "recoil";
import { TChatsResponse } from "@/api/chatApi";

type TFoundedChats = {
  id: string;
  username: string;
}[];

export type TUserMessages = {
  userId: string;
  text: string;
};

export const foundedChatsState = atom<TFoundedChats>({
  key: "foundedChatsState",
  default: [],
});

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const allChatsState = atom<TChatsResponse[]>({
  key: "allChatsState",
  default: [],
});

export const chatHistoryState = atom({
  key: "chatHistoryState",
  default: [],
});

export const userMessagesState = atom<TUserMessages[]>({
  key: "userMessagesState",
  default: [],
});
