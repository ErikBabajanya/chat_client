import { useContext, useState } from "react";
import Content from "./content/content";
import Header from "./header/header";
import Profile from "./profile/profile";
import { SettingsContext } from "@/context/settings.context";

export default function Settings() {
  const settingsContext = useContext(SettingsContext);
  if (!settingsContext) return;
  const { profile } = settingsContext;
  return (
    <div className="w-full h-full relative">
      {profile ? (
        <Profile />
      ) : (
        <div className="w-full h-full">
          <div className="absolute w-full z-10">
            <Header />
          </div>
          <div className="w-full h-full">
            <Content />
          </div>
        </div>
      )}
    </div>
  );
}
