import { useContext, useEffect, useState } from "react";
import { User } from "@/interface/user.interface";
import { Auth } from "@/context/auth.context";
import { Chat } from "@/context/chat.context";
import { MessagesContext } from "@/context/messages.contex";

export default function Messages() {
  const messagesContext = useContext(MessagesContext);
  const chatContext = useContext(Chat);
  const auth = useContext(Auth);

  if (!messagesContext || !chatContext || !auth) {
    return <div>Loading...</div>;
  }

  const { chat } = chatContext;
  const { messages } = messagesContext;
  const { myUser } = auth;
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    <div className="w-full h-full flex flex-col-reverse overflow-y-auto scroll">
      {messages
        ?.slice()
        .reverse()
        .map((message, key) => {
          if (message.senderId == myUser?._id) {
            return (
              <div
                key={key}
                className={`2xl:w-[455px] xl:w-full min-w-[56px] max-w-full flex justify-end mb-1 `}
              >
                <div className="max-w-[420px]  text-primary-text-color bg-message-out-background-color p-1.5 rounded-xl">
                  <div>{message.text}</div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={key} className="min-w-[56px] max-w-full mb-1 flex">
                <div className="max-w-[420px] text-primary-text-color bg-surface-color p-1.5 rounded-xl">
                  <div>{message.text}</div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}