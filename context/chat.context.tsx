"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Auth } from "./auth.context";
import { User } from "@/interface/user.interface";
import ChatInterface from "@/interface/chat.interface";
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

interface Value {
  value: string;
}

interface typing {
  id: boolean;
}

export type ChatContextType = {
  chatList: MyChatList[] | null;
  findUserChat: (user: User) => void;
  chat: ChatInterface | null;
  chatUser: User | null;
  closeChat: () => void;

  openSettings: () => void;

  settings: boolean;

  newMsg: Message | null;

  openSeacrch: () => void;
  closeSeacrch: () => void;
  searchChat: boolean;

  updateInputValueInfo: (info: Value) => void;
  inputValue: Value;
  findUser: User[] | null;
  writing: () => void;
  stopWriting: () => void;
  writingMsg: { [key: string]: boolean };
};

export const Chat = React.createContext<ChatContextType | null>(null);
const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useContext(Auth);
  if (!auth) return;
  const { token, myUser } = auth;
  const endpoint = "http://localhost:5000";
  const newSocket = io("ws://localhost:5000");
  const [chatList, setChatList] = useState<MyChatList[] | null>(null);
  const [writingMsg, setWritingMsg] = useState<{ [key: string]: boolean }>({});
  useEffect(() => {
    if (!token) return;
    const getMyChats = async () => {
      const response = await fetch(`${endpoint}/chat/findChats`, {
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

  const createChat = async (userId: string) => {
    if (!token) return;
    const response = await fetch(`${endpoint}/chat/createChat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ firstId: myUser?._id, secondId: userId }),
    });
  };

  const [chat, setChat] = useState<ChatInterface | null>(null);
  const [chatUser, setChatUser] = useState<User | null>(null);
  const findUserChat = async (user: User) => {
    if (!token) return;
    if (chat) {
      newSocket.emit("close chat", chat?._id, myUser?._id);
    }
    const secondId = user._id;
    const response = await fetch(`${endpoint}/chat/find/${secondId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const data = await response.json();
    setChat(data);
    setChatUser(user);
  };
  const [newMsg, setNewMsg] = useState<Message | null>(null);
  const [unreadMsg, setUnreadMsg] = useState<[] | null>(null);
  useEffect(() => {
    newSocket.on("connect", () => {});
    newSocket.emit("userLoggedIn", myUser?._id);
    newSocket.on("unreadMsg", (unread: []) => {
      setUnreadMsg(unread);
    });
    newSocket.on("lastMessage", (message: any) => {
      console.log(message);
      setNewMsg(message.message);
    });
    newSocket.on("writingMsg", (sender: string) => {
      setWritingMsg((prevWriting) => ({
        ...prevWriting,
        [sender]: true,
      }));
    });
    newSocket.on("stopWritingMsg", (sender: string) => {
      setWritingMsg((prevWriting) => ({
        ...prevWriting,
        [sender]: false,
      }));
    });
    return () => {
      newSocket.disconnect();
    };
  }, [chatList]);

  useEffect(() => {
    const newMessages = chatList?.map((chat) => {
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
    const sortMessage = newMessages?.sort((a, b) => {
      const timestampA = new Date(a.lastMsg.createdAt).getTime();
      const timestampB = new Date(b.lastMsg.createdAt).getTime();
      return timestampB - timestampA;
    });
    if (sortMessage) setChatList(sortMessage);
  }, [newMsg]);

  const closeChat = () => {
    newSocket.emit("close chat", chat?._id, myUser?._id);
    setChat(null);
  };

  const [settings, setSettings] = useState<boolean>(false);

  const openSettings = () => {
    setSettings(!settings);
  };

  const [searchChat, setSearchChat] = useState<boolean>(false);

  const openSeacrch = () => {
    setSearchChat(true);
  };

  const closeSeacrch = () => {
    setSearchChat(false);
  };
  const [inputValue, setInputValue] = useState<Value>({
    value: "",
  });

  const updateInputValueInfo = (info: Value) => {
    setInputValue(info);
  };
  const [findUser, setFindUser] = useState<User[] | null>(null);
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (inputValue.value.length > 0) {
        if (!token) return;
        const response = await fetch(`${endpoint}/user/searchUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({ value: inputValue.value }),
        });
        const data = await response.json();
        setFindUser(data);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  const writing = () => {
    newSocket.emit("writingMsg", {
      sender: myUser?._id,
      recipient: chatUser?._id,
    });
  };

  const stopWriting = () => {
    newSocket.emit("stopWritingMsg", {
      sender: myUser?._id,
      recipient: chatUser?._id,
    });
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

        openSeacrch,
        searchChat,
        closeSeacrch,

        updateInputValueInfo,
        inputValue,
        findUser,

        writing,
        stopWriting,
        writingMsg,
      }}
    >
      {children}
    </Chat.Provider>
  );
};

export default ChatProvider;
