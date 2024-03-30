"use client";
import React, { useState } from "react";

export type SettingsContextType = {
  openSettings: () => void;
  settings: boolean;

  setFullAvatar: () => void;
  avatarFull: boolean;

  profile: boolean;
  openProfile: () => void;
};

export const SettingsContext = React.createContext<SettingsContextType | null>(
  null
);
const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<boolean>(false);
  const [avatarFull, setAvatarFull] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);

  const openSettings = () => {
    setSettings(!settings);
    setAvatarFull(false);
  };

  const setFullAvatar = () => {
    setAvatarFull(true);
  };

  const openProfile = () => {
    setProfile(!profile);
  };

  return (
    <SettingsContext.Provider
      value={{
        setFullAvatar,
        avatarFull,
        openSettings,
        settings,
        profile,
        openProfile,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
