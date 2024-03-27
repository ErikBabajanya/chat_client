"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Auth } from "./auth.context";
import { User } from "@/interface/user.interface";
import Chat from "@/interface/chat.interface";
import { MyChatList } from "@/interface/myChatList.interface";
import { io } from "socket.io-client";

interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export type ChatContextType = {
  chatList: MyChatList[] | null;
  findUserChat: (user: User) => void;
  chat: Chat | null;
  chatUser: User | null;
  closeChat: () => void;

  openSettings: () => void;

  settings: boolean;

  newMsg: Message | null;
};

export const Chat = React.createContext<ChatContextType | null>(null);
const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useContext(Auth);
  if (!auth) return;
  const { token, myUser } = auth;
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
  const [newMsg, setNewMsg] = useState<Message | null>(null);
  useEffect(() => {
    const newSocket = io("ws://localhost:5000", {
      query: { userId: myUser?._id },
    });
    newSocket.on("connect", () => {
      console.log("connect from server");
    });
    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    newSocket.on("chat message", (message: any) => {
      console.log(message.message);
      setNewMsg(message.message);
    });
    return () => {
      newSocket.disconnect();
    };
  }, [chatList]);

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
        newMsg,
      }}
    >
      {children}
    </Chat.Provider>
  );
};

export default ChatProvider;
