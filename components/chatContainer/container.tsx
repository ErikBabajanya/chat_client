import { MessagesContext } from "@/context/messages.contex";
import ChatInfo from "./chatInfo/chatInfo";
import Footer from "./footer/footer";
import MessagesHeader from "./header/header";
import Messages from "./messages/messages";
import { useContext } from "react";

export default function Container() {
  const messagesContext = useContext(MessagesContext);
  if (!messagesContext) return;
  const { chatInfo, forwarded } = messagesContext;
  return (
    <div className="w-full h-full flex">
      <div className={`w-full h-full`}>
        <MessagesHeader />
        <div
          className={`h-[calc(100%-114px)] w-full flex justify-center ${
            forwarded ? "h-[calc(100%-142px)] " : "h-[calc(100%-114px)]"
          }`}
        >
          <div className={`h-full w-full`}>
            <Messages />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
