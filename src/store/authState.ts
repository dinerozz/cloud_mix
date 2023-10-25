import { atom } from "recoil";

type TUserInfo = {
  id: string;
  username: string;
};

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export const userInfoState = atom<TUserInfo | undefined>({
  key: "userInfoState",
  default: undefined,
});

export const isInitializedState = atom({
  key: "isInitializedState",
  default: false,
});
