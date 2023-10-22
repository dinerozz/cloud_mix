import { api } from "@/api/index";

type TCurrentUserResponse = {
  id: string;
  username: string;
};

const getCurrentUser = () =>
  api
    .get<TCurrentUserResponse>("/api/v1/users/current")
    .then((res) => res.data);

export const userApi = {
  getCurrentUser,
};
