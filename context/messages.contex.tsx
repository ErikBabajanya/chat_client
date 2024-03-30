"use client";
import * as React from "react";
import { Auth } from "./auth.context";
import { User } from "@/interface/user.interface";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Chat } from "@/context/chat.context";
import io from "socket.io-client";
import { query } from "express";

interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface Text {
  text: string;
}

export type MessagesContextType = {
  messages: Message[] | null;

  updateMessageInfo: (info: Text) => void;
  messageInfo: Text | null;
  sendMessage: (text: string) => void;
  newMessage: Message | null;
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
  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const updateMessageInfo = (info: Text) => {
    setMessageInfo(info);
  };

  useEffect(() => {
    if (!chat) return;
    const newSocket = io("ws://localhost:5000", {
      query: { chatId: chat._id },
    });
    const id = chat._id;

    newSocket.on("connect", () => {});

    newSocket.on("disconnect", () => {});
    newSocket.on("chat message", (message: any) => {
      setMessages((prevMessages) => [...(prevMessages || []), message.message]);
      setNewMessage(message.message);
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
    let recipientId;
    if (chat?.members[0] == myUser?._id) {
      recipientId = chat?.members[1];
    } else {
      recipientId = chat?.members[0];
    }
    socket.emit("chat message", {
      text: text,
      id: chat?._id,
      senderId: myUser?._id,
      recipientId: recipientId,
    });
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        updateMessageInfo,
        messageInfo,
        sendMessage,
        newMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
