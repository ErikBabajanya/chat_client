"use client";
import React, { useEffect, useState } from "react";
import AuthLogin from "@/components/auth/auth.login";
import { Auth } from "@/context/auth.context";
import { useContext } from "react";
import Chatlist from "@/components/chatList/chat.list";
import { Chat } from "@/context/chat.context";
import Container from "@/components/chatContainer/container";
import { MessagesContext } from "@/context/messages.contex";
export default function Home() {
  const auth = useContext(Auth);
  const chatContext = useContext(Chat);
  const messagesContext = useContext(MessagesContext);
  if (!auth || !chatContext || !messagesContext) return;
  const { token } = auth;
  const { chat } = chatContext;
  const { onMouseUp } = messagesContext;
  const [darck, setDarck] = useState<boolean>(true);
  return (
    <div
      onMouseUp={onMouseUp}
      className="w-full h-[100vh] bg-body-background-color"
    >
      {token ? (
        <div className="max-w-[1535px] mx-auto h-screen flex img sm:w-full bg">
          <div
            className={`${chat ? "lg:hidden" : ""} ${
              darck ? "bg-surface-color" : "bg-[#fff]"
            } sm:w-full w-[424px] h-full transition-width duration-300 after`}
          >
            <Chatlist />
          </div>
          <div
            className={`${
              chat ? "w-[calc(100%-424px)] lg:w-full" : "hidden"
            } transition-width duration-300`}
          >
            <Container />
          </div>
        </div>
      ) : (
        <div className="w-full h-full">{<AuthLogin />}</div>
      )}
    </div>
  );
}
