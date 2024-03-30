"use client";
import {
  MouseEventHandler,
  ReactEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/interface/user.interface";
import { Auth } from "@/context/auth.context";
import { Chat } from "@/context/chat.context";
import { FaUser } from "react-icons/fa";
import { MessagesContext } from "@/context/messages.contex";
import { MyChatList } from "@/interface/myChatList.interface";

const List = () => {
  const auth = useContext(Auth);
  const chat = useContext(Chat);
  const messagesContext = useContext(MessagesContext);
  if (!auth || !chat || !messagesContext) return;
  const { chatList, findUserChat, newMsg } = chat;
  const { newMessage } = messagesContext;
  const { myUser } = auth;
  const [MyChatsList, setMyChatsList] = useState<MyChatList[] | undefined>(
    undefined
  );
  useEffect(() => {
    const setNewMessages = chatList?.map((chat) => {
      if (chat.lastMsg.chatId == newMsg?.chatId) {
        const msg = (chat.lastMsg = newMsg);
        return {
          user: chat.user,
          lastMsg: msg,
        };
      } else {
        return chat;
      }
    });
    setMyChatsList(setNewMessages);
  }, [newMsg]);
  return (
    <div
      className="w-full relative overflow-y-auto overflow-x-hidden"
      style={{ height: "calc(100% - 56px)" }}
    >
      <div className="px-2 w-full h-full sm:px-0">
        {chatList?.map((user, key) => {
          return (
            <div
              key={key}
              className={`w-full h-[72px]  pr-2 flex items-center sm:hover:rounded-[0px] hover:bg-light-filled-secondary-text-color hover:rounded-[10px]`}
            >
              <button
                className="w-full h-[72px] absolute z-10 "
                onClick={() => findUserChat(user.user)}
              ></button>
              <div className="w-full relative flex items-center">
                <div className="w-[54px] h-[54px] bg-profile-color rounded-full left-2 absolute sm:ml-[9px] flex justify-center items-center">
                  {(user.user.picture && (
                    <img
                      className="w-[54px] h-[54px] rounded-full"
                      src={`data:image/jpeg;base64,${user.user?.picture}`}
                      alt="User Profile"
                    />
                  )) ||
                    (user.user.firstName && (
                      <h1 className="font-medium text-[1.25rem] text-primary-text-color">
                        {user.user.firstName?.charAt(0) +
                          user.user.lastName?.charAt(0)}
                      </h1>
                    )) || <FaUser />}
                </div>
                <div className="w-full pl-[72px] mr-3 sm:pl-[80px]">
                  <div className="w-full flex justify-between">
                    <div className="font-medium text-primary-text-color">
                      {(user.user.firstName &&
                        user.user.firstName + " " + user.user.lastName) ||
                        user.user.lastName ||
                        user.user.phone}
                    </div>
                    <div className="text-secondary-text-color text-[12px] leading-[16px]">
                      {new Date(user.lastMsg.updatedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="w-full text-base text-secondary-text-color">
                    <div className="max-w-full text-base text-secondary-text-color overflow-hidden whitespace-nowrap">
                      {user?.lastMsg.text}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
