import React, { useState } from "react";
import { Button } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import Input from "antd/lib/input/Input";
import { useQuery } from "react-query";
import { userApi } from "@/api/userApi";
import { debounce } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allChatsState,
  foundedChatsState,
  searchState,
} from "@/store/chatsState";

export const DialogsBar = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [, setFoundedChatsState] = useRecoilState(foundedChatsState);
  const [searchValue, setSearchValue] = useRecoilState(searchState);
  const allChats = useRecoilValue(allChatsState);

  useQuery(
    ["users-search", searchValue],
    () => userApi.findByUsername(searchValue),
    {
      onSuccess: (res) => setFoundedChatsState(res),
      enabled: searchValue.length > 0,
    },
  );

  const toggleSearch = () => {
    setSearchValue("");
    setIsInputVisible((prev) => !prev);
  };

  const handleSearch = debounce((value) => {
    setSearchValue(value);
  }, 300);

  const dialogsCount = allChats.length + 1;

  return (
    <div className="px-10 py-[30px] h-[90px] border-b-[1px] border-borderColor flex items-center justify-between gap-4">
      {isInputVisible ? (
        <Input
          onChange={(event) => handleSearch(event.target.value)}
          type="text"
          className="!w-full !border-0 bg-white-gray transition-all duration-300 ease-in-out border-gray-300 p-2 rounded-md md:w-[200px]"
          placeholder="Search..."
        />
      ) : (
        <p className="transition-all duration-300 ease-in-out md:text-[28px] text-[20px] leading-[28px]">
          Messages({dialogsCount})
        </p>
      )}
      <Button
        type="text"
        className="flex items-center justify-center h-[38px]"
        onClick={toggleSearch}
      >
        {isInputVisible ? (
          <CloseOutlined rev={undefined} className="text-2xl" />
        ) : (
          <SearchOutlined rev={undefined} className="text-2xl" />
        )}
      </Button>
    </div>
  );
};
