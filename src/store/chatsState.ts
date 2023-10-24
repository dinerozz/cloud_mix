import { atom } from "recoil";

type TFoundedChats = {
  id: string;
  username: string;
}[];

export const foundedChatsState = atom<TFoundedChats>({
  key: "foundedChatsState",
  default: [],
});

export const searchState = atom({
  key: "searchState",
  default: "",
});
