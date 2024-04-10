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
  const chatContext = useContext(Chat);
  const messagesContext = useContext(MessagesContext);
  if (!auth || !chatContext || !messagesContext) return;
  const { chatList, findUserChat, newMsg, chat, writingMsg } = chatContext;
  const { unSelectAllMessage, forwardedNull } = messagesContext;
  const { myUser, token } = auth;
  const [MyChatsList, setMyChatsList] = useState<MyChatList[] | undefined>(
    undefined
  );
  const [chatUser, setChatUser] = useState<string | null>(null);
  useEffect(() => {
    console.log(writingMsg);
  }, [writingMsg]);
  useEffect(() => {
    if (!chat) {
      setChatUser(null);
      return;
    }
    if (chat?.members[0] === myUser?._id) {
      setChatUser(chat?.members[1]);
    } else setChatUser(chat?.members[0]);
  }, [chat]);

  const findChat = (user: User) => {
    unSelectAllMessage();
    forwardedNull();
    findUserChat(user);
  };
  const getWritingMsg = Object.keys(writingMsg).filter(
    (key) => writingMsg[key] === true
  );
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
              className={`w-full h-[72px]  pr-2 flex items-center sm:hover:rounded-[0px]
              rounded-[10px]
               ${
                 chatUser === user?.user._id
                   ? "bg-message-out-background-color "
                   : "hover:bg-light-filled-secondary-text-color"
               }`}
            >
              <button
                className="w-full h-[72px] absolute z-[10] "
                onClick={() => findChat(user.user)}
              ></button>
              <div className="w-full relative flex items-center">
                <div className="w-[54px] h-[54px] rounded-full left-2 absolute sm:ml-[9px] flex justify-center items-center">
                  {(user.user.picture && (
                    <img
                      className="w-[54px] h-[54px] rounded-full"
                      src={`data:image/jpeg;base64,${user.user?.picture}`}
                      alt="User Profile"
                    />
                  )) ||
                    (user.user.firstName && (
                      <h1 className="font-medium text-[1.25rem] text-primary-text-color bg-profile-color">
                        {user.user.firstName?.charAt(0) +
                          user.user.lastName?.charAt(0)}
                      </h1>
                    )) || (
                      <div className="w-full h-full rounded-full flex items-center justify-center bg-profile-color">
                        <FaUser />
                      </div>
                    )}
                </div>
                <div className="w-full h-[48px] pl-[72px] flex flex-col justify-between mr-3 sm:pl-[80px]">
                  <div className="w-full flex justify-between">
                    <div className="font-medium text-primary-text-color">
                      {(user.user.firstName &&
                        user.user.firstName + " " + user.user.lastName) ||
                        user.user.lastName ||
                        user.user.phone}
                    </div>

                    <div
                      className={` text-[12px] leading-[16px]
                    ${
                      chatUser === user.user._id
                        ? "text-primary-text-color"
                        : "text-secondary-text-color"
                    }`}
                    >
                      {new Date(user.lastMsg.updatedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="w-full text-base">
                    {writingMsg[user.user._id] ? (
                      <div className="flex max-w-full justify-evenly w-[60px]">
                        <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-3 w-3 bg-black rounded-full animate-bounce"></div>
                      </div>
                    ) : (
                      <div
                        className={`max-w-full text-base
                     overflow-hidden whitespace-nowrap
                     ${
                       chatUser === user.user._id
                         ? "text-primary-text-color"
                         : "text-secondary-text-color"
                     }`}
                      >
                        {user?.lastMsg.text}
                      </div>
                    )}
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
