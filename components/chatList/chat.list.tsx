import { useContext } from "react";
import Header from "./header/header";
import List from "./list/list";
import { Chat } from "@/context/chat.context";
import Settings from "./settings/settgins";

export default function Chatlist() {
  const chatContext = useContext(Chat);
  if (!chatContext) return;
  const { settings } = chatContext;
  return (
    <div className="w-full h-full">
      {settings ? (
        <div className="w-full h-full">
          <Settings />
        </div>
      ) : (
        <div className="w-full h-full">
          <Header />
          <List />
        </div>
      )}
    </div>
  );
}
