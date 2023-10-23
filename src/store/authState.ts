import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    id: "",
    username: "",
  },
});

export const isInitializedState = atom({
  key: "isInitializedState",
  default: false,
});
