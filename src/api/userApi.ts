import { api } from "@/api/index";

type TCurrentUserResponse = {
  id: string;
  username: string;
};

type TUsersSearchResponse = TCurrentUserResponse;

const getCurrentUser = () =>
  api
    .get<TCurrentUserResponse>("/api/v1/users/current")
    .then((res) => res.data);

const findByUsername = (username: string) =>
  api
    .get<TUsersSearchResponse>(`/api/v1/users/search/${username}`)
    .then((res) => res.data);

export const userApi = {
  getCurrentUser,
  findByUsername,
};
