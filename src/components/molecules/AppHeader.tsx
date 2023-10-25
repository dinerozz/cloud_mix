import React from "react";
import Logo from "../../../public/assets/icons/Logo.svg";
import { Header } from "antd/lib/layout/layout";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { authApi } from "@/api/authApi";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/store/authState";
import { userApi } from "@/api/userApi";

export const AppHeader = () => {
  const isLoggedIn = Boolean(localStorage.getItem("IS_LOGGED_IN"));
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const navigate = useNavigate();

  const logoutMutation = useMutation(async (userId: string) =>
    authApi.logout(userId)
  );

  const { isLoading } = useQuery(
    "current-user",
    () => userApi.getCurrentUser(),
    {
      enabled: isLoggedIn,
      onSuccess: (res) => setUserInfo({ id: res.id, username: res.username }),
    }
  );

  const handleLogout = () => {
    logoutMutation.mutate(userInfo?.id ?? "");
    setUserInfo(undefined);
    localStorage.removeItem("IS_LOGGED_IN");
    navigate("/login");
  };

  return (
    <Header className="bg-white flex justify-between items-center leading-[28px] h-[92px] fixed top-0 left-0 w-full md:px-10 px-5">
      <div id="logo">
        <img src={Logo} alt="" className="max-w-full max-h-[92px]" />
      </div>
      <div className="text-sm md:text-base flex flex-col items-end">
        {isLoading ? (
          <Spin />
        ) : (
          <p className="font-[500] mb-0 text-[18px]">{userInfo?.username}</p>
        )}
        <Button
          type="text"
          className="opacity-[0.5] text-right text-[16px] p-0"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </div>
    </Header>
  );
};
