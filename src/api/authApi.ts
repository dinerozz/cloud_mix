import { api } from "@/api/index";

export type TAuthRequest = {
  username: string;
  password: string;
};

type TAuthResponse = {
  accessToken: string;
  refreshToken: string;
};

const signUp = (payload: TAuthRequest) =>
  api
    .post<TAuthResponse>("/api/v1/auth/register", payload)
    .then((res) => res.data);

const login = (payload: TAuthRequest) =>
  api
    .post<TAuthResponse>("/api/v1/auth/login", payload)
    .then((res) => res.data);

const logout = (userId: string) =>
  api.post("/api/v1/auth/logout", { userId }).then((res) => res.data);

export const authApi = {
  signUp,
  login,
  logout,
};
