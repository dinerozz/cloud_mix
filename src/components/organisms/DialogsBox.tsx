import { FC, useCallback } from "react";
import { DialogsBar } from "@/components/molecules/DialogsBar";
import { ChatListItem } from "@/components/molecules/ChatListItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { foundedChatsState, searchState } from "@/store/chatsState";
import { useMutation, useQuery } from "react-query";
import { chatApi, TInitializeChatRequest } from "@/api/chatApi";
import { notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { userInfoState } from "@/store/authState";

export const DialogsBox: FC = () => {
  const { id: chatId } = useParams();
  const [foundedChats] = useRecoilState(foundedChatsState);
  const [searchValue] = useRecoilState(searchState);
  const userInfo = useRecoilValue(userInfoState);

  const navigate = useNavigate();

  const {
    data: chats,
    isLoading: isChatsLoading,
    refetch: refetchChats,
  } = useQuery(["chat-list"], () => chatApi.getChats());

  const initializeChatMutation = useMutation(
    (payload: TInitializeChatRequest) => chatApi.initializeChat(payload),
    {
      onSuccess: () =>
        notification.success({ message: "Conversation created successfully" }),
      onError: () => notification.error({ message: "Something went wrong" }),
    }
  );

  const findExistingChat = (currentUserId: string, dialogId: string) =>
    chats?.find(
      (chat) =>
        (chat.userId1 === currentUserId && chat.userId2 === dialogId) ||
        (chat.userId1 === dialogId && chat.userId2 === currentUserId)
    );

  const handleDialogClick = useCallback(
    (dialogId: string, isUserId: boolean) => {
      const currentUserId = userInfo?.id ?? "";

      if (isUserId) {
        const existingChat = findExistingChat(currentUserId, dialogId);
        if (existingChat) {
          navigate(`/chat/${existingChat.id}`);
        } else {
          initializeChatMutation.mutate(
            { userId1: currentUserId, userId2: dialogId },
            {
              onSuccess: (res) => {
                refetchChats();
                navigate(`/chat/${res.id}`);
              },
            }
          );
        }
      } else {
        navigate(`/chat/${dialogId}`);
      }
    },
    [chats, userInfo, initializeChatMutation, refetchChats, navigate]
  );

  return (
    <div className="flex-shrink-0 w-full md:w-1/3 sm:w-1/2 lg:w-1/4 border-r-[1px] border-borderColor overflow-y-auto">
      <DialogsBar />
      {searchValue.length > 0 ? (
        <></>
      ) : (
        <ChatListItem
          key={"ai-assistant"}
          onClick={() => handleDialogClick("ai-assistant", false)}
          title="AI Assistant"
          message="Hello, I am AI assistant"
          time="10:44"
          listItemBg="bg-activeDialog"
          isChecked
          isAssistant
        />
      )}
      {searchValue.length > 0
        ? foundedChats.map((item) => (
            <ChatListItem
              onClick={() => handleDialogClick(item.id, true)}
              key={item.id}
              title={item.username}
              message="Yo bro I got some info for you"
              time="10:44"
              isChecked={true}
            />
          ))
        : chats?.map((item) => (
            <ChatListItem
              onClick={() => handleDialogClick(item.id, false)}
              key={item.id}
              title={item.otherUserName}
              message="Yo bro I got some info for you"
              time="10:44"
              isChecked={true}
            />
          ))}
    </div>
  );
};
