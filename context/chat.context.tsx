"use client";
import * as React from "react";
import { Message } from "postcss";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Auth } from "./auth.context";
import { User } from "@/interface/user.interface";
import Chat from "@/interface/chat.interface";

export interface MyChatList {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    phone: string;
    color: string;
  };
  lastMsg: {
    _id: string;
    chatId: string;
    senderId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
  };
}

export type ChatContextType = {
  chatList: MyChatList[] | null;
  findUserChat: (user: User) => void;
  chat: Chat | null;
  chatUser: User | null;
  closeChat: () => void;

  openSettings: () => void;

  settings: boolean;
};

export const Chat = React.createContext<ChatContextType | null>(null);
const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useContext(Auth);
  if (!auth) return;
  const { token } = auth;
  const endpoint = "http://localhost:5000/chat";
  const [chatList, setChatList] = useState<MyChatList[] | null>(null);
  useEffect(() => {
    if (!token) return;
    const getMyChats = async () => {
      const response = await fetch(`${endpoint}/findChats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await response.json();
      setChatList(data);
    };
    getMyChats();
  }, [token]);

  const [chat, setChat] = useState<Chat | null>(null);
  const [chatUser, setChatUser] = useState<User | null>(null);
  const findUserChat = async (user: User) => {
    if (!token) return;
    const secondId = user._id;
    const response = await fetch(`${endpoint}/find/${secondId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const data = await response.json();
    console.log(data);
    setChat(data);
    setChatUser(user);
  };

  const closeChat = () => {
    setChat(null);
  };

  const [settings, setSettings] = useState<boolean>(false);

  const openSettings = () => {
    setSettings(!settings);
    console.log(settings);
  };
  return (
    <Chat.Provider
      value={{
        chatList,
        findUserChat,
        chat,
        chatUser,
        closeChat,
        openSettings,

        settings,
      }}
    >
      {children}
    </Chat.Provider>
  );
};

export default ChatProvider;
