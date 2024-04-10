"use client";
import * as React from "react";
import { Auth } from "./auth.context";
import { User } from "@/interface/user.interface";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Chat } from "@/context/chat.context";
import io from "socket.io-client";
import Message from "../interface/message.interface";
import { query } from "express";

interface Text {
  text: string;
}

export type MessagesContextType = {
  messages: Message[] | null;

  updateMessageInfo: (info: Text) => void;
  messageInfo: Text | null;
  sendMessage: (text: string) => void;
  newMessage: Message | null;
  loadingMessages: boolean;

  unSelectAllMessage: () => void;
  deleteMessages: () => void;
  closePopup: () => void;
  openPopup: () => void;
  popupChat: boolean;

  handleMouseDown: (key: number) => void;
  onMouseUp: () => void;
  onMouseMove: (key: number) => void;
  selected: { [key: string]: boolean };
  select: (key: number) => void;

  openchatInfo: () => void;
  chatInfo: boolean;

  forwardMessage: () => void;
  forwarded: string[] | null;
  forwardedNull: () => void;
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
    const newSocket = io("ws://localhost:5000");
    const id = chat._id;

    newSocket.on("connect", () => {});
    newSocket.emit("chat connect", chat._id, myUser?._id);
    newSocket.on("disconnect", () => {});
    newSocket.on("chat message", (message: any) => {
      setMessages((prevMessages) => [...(prevMessages || []), message.message]);
      setNewMessage(message.message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chat]);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  useEffect(() => {
    if (!token) return;
    const getMyChats = async () => {
      setLoadingMessages(true);
      const response = await fetch(`${endpoint}/getMessages/${chat?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await response.json();
      setMessages(data.messages);
      setLoadingMessages(false);
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

  const [popupChat, setPopupChat] = useState<boolean>(false);
  const openPopup = () => {
    setPopupChat(true);
  };
  const closePopup = () => {
    setPopupChat(false);
  };

  const [selectMessages, setSelectMessages] = useState(false);
  const [unSelectMessages, setUnSelectMessages] = useState(false);
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  const [fisrtId, setFirstId] = useState<number | null>(null);
  const [reverseMessages, setReverseMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messages) {
      setReverseMessages(messages.slice().reverse());
    }
  }, [messages]);

  const handleMouseDown = (key: number) => {
    if (Object.keys(selected).length) {
      if (selected[reverseMessages[key]._id]) {
        setUnSelectMessages(true);
        setFirstId(key);
      } else {
        setSelectMessages(true);
        setFirstId(key);
      }
    } else {
      setSelectMessages(true);
      setFirstId(key);
    }
  };

  const onMouseUp = () => {
    setSelectMessages(false);
    setUnSelectMessages(false);
  };

  const onMouseMove = async (key: number) => {
    if (selectMessages) {
      if (fisrtId || fisrtId == 0) {
        if (fisrtId !== key) {
          if (fisrtId > key) {
            for (let i = key; i <= fisrtId; i++) {
              setSelected((prevMessages) => ({
                ...prevMessages,
                [reverseMessages[i]._id]: true,
              }));
            }
          } else {
            for (let i = fisrtId; i <= key; i++) {
              setSelected((prevMessages) => ({
                ...prevMessages,
                [reverseMessages[i]._id]: true,
              }));
            }
          }
        }
      }
    }
    if (unSelectMessages) {
      if (fisrtId || fisrtId == 0) {
        if (fisrtId !== key) {
          if (fisrtId > key) {
            for (let i = key; i <= fisrtId; i++) {
              setSelected((prevMessages) => {
                const updatedMessages = { ...prevMessages };
                delete updatedMessages[reverseMessages[i]._id];
                return updatedMessages;
              });
            }
          } else {
            for (let i = fisrtId; i <= key; i++) {
              setSelected((prevMessages) => {
                const updatedMessages = { ...prevMessages };
                delete updatedMessages[reverseMessages[i]._id];
                return updatedMessages;
              });
            }
          }
        }
      }
    }
  };

  const select = (key: number) => {
    if (selected[reverseMessages[key]._id]) {
      setSelected((prevMessages) => {
        const updatedMessages = { ...prevMessages };
        delete updatedMessages[reverseMessages[key]._id];
        return updatedMessages;
      });
    } else {
      setSelected((prevMessages) => ({
        ...prevMessages,
        [reverseMessages[key]._id]: true,
      }));
    }
    // setSelected((prevMessages) => ({
    //   ...prevMessages,
    //   [_id]: !prevMessages[_id],
    // }));
  };

  const unSelectAllMessage = () => {
    setSelected({});
  };
  const [forwarded, setForwarded] = useState<string[] | null>(null);

  const forwardMessage = () => {
    if (selected) {
      // setForwarded(selected);
      // setSelected([]);
    }
  };

  const forwardedNull = () => {
    if (forwarded) {
      setForwarded(null);
    }
  };

  const deleteMessages = async () => {
    if (!token) return;
    const msg = messages?.filter(
      (item) => !Object.keys(selected).includes(item._id)
    );
    if (msg) {
      setMessages(msg);
    }
    setPopupChat(false);
    const msgs = [...Object.keys(selected)];
    setSelected({});
    const response = await fetch(`${endpoint}/deleteMessage/${chat?._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ messagesIds: msgs }),
    });
    if (response) {
      const data = await response.json();
      setMessages(data.messages);
    }
  };

  const [chatInfo, setChatInfo] = useState<boolean>(false);
  const openchatInfo = () => {
    setChatInfo(!chatInfo);
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        updateMessageInfo,
        messageInfo,
        sendMessage,
        newMessage,
        loadingMessages,

        unSelectAllMessage,
        deleteMessages,
        closePopup,
        openPopup,
        popupChat,

        handleMouseDown,
        onMouseUp,
        onMouseMove,
        selected,
        select,

        openchatInfo,
        chatInfo,

        forwardMessage,
        forwarded,
        forwardedNull,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
