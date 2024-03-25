"use client";
import * as React from "react";
import { Auth } from "./auth.context";
import { User } from "@/interface/user.interface";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Chat } from "@/context/chat.context";
import io from "socket.io-client";
import { query } from "express";

interface Message {
  chatId: string;
  senderId: string;
  text: string;
}

interface Text {
  text: string;
}

export type MessagesContextType = {
  messages: Message[] | null;

  updateMessageInfo: (info: Text) => void;
  messageInfo: Text | null;
  sendMessage: (text: string) => void;
};

export const MessagesContext = React.createContext<MessagesContextType | null>(
  null
);
const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const endpoint = "http://localhost:5000/messages";
  const auth = useContext(Auth);
  const chatContext = useContext(Chat);
  if (!auth || !chatContext) return;
  const { chat } = chatContext;
  const { myUser, token } = auth;
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [messageInfo, setMessageInfo] = useState<Text | null>(null);
  const updateMessageInfo = (info: Text) => {
    setMessageInfo(info);
  };

  useEffect(() => {
    if (!chat) return;
    const newSocket = io("ws://localhost:5000", {
      query: { chatId: chat._id },
    });
    const id = chat._id;

    newSocket.on("connect", () => {
      console.log(id);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    newSocket.on("chat message", (msg: Message) => {
      setMessages((prevMessages) => [...(prevMessages || []), msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chat]);

  useEffect(() => {
    if (!token) return;
    const getMyChats = async () => {
      const response = await fetch(`${endpoint}/getMessages/${chat?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await response.json();
      setMessages(data.messages);
    };
    getMyChats();
  }, [chat]);

  const sendMessage = async (text: string) => {
    if (!text) return;
    const socket = io("ws://localhost:5000");
    socket.emit("chat message", {
      text: text,
      id: chat?._id,
      senderId: myUser?._id,
    });
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        updateMessageInfo,
        messageInfo,
        sendMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
