import { useContext } from "react";
import Header from "./header/header";
import List from "./list/list";
import { Chat } from "@/context/chat.context";
import Settings from "./settings/settgins";
import { SettingsContext } from "@/context/settings.context";

export default function Chatlist() {
  const settingsContext = useContext(SettingsContext);
  if (!settingsContext) return;
  const { settings } = settingsContext;
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
