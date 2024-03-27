import { Auth } from "@/context/auth.context";
import { SettingsContext } from "@/context/settings.context";
import { useContext, useState } from "react";

export default function Content() {
  const settingsContext = useContext(SettingsContext);
  const auth = useContext(Auth);
  if (!settingsContext || !auth) return;
  const { myUser } = auth;
  const { setFullAvatar, avatarFull } = settingsContext;
  return (
    <div className="w-full h-full">
      <div
        className={`w-full relative flex justify-center flex-col ${
          avatarFull ? "h-[420px]" : "h-[350px]"
        }`}
      >
        <button
          onClick={setFullAvatar}
          className="w-full h-full absolute"
        ></button>
        <div
          className={`w-full flex justify-center ${
            avatarFull ? "absolute h-[420px]" : "h-[120px]"
          }`}
        >
          <div
            className={`bg-profile-color ${
              avatarFull
                ? "w-full h-full rounded-[50%]"
                : "w-[120px] h-[120px] rounded-[50%]"
            } ${avatarFull ? "animate-expand" : ""}`}
          ></div>
        </div>

        <div
          className={` h-[80px] text-[#ffffff] flex justify-center flex-col items-center ${
            avatarFull ? "absolute w-auto bottom-0 left-[20px]" : "w-full"
          }`}
        >
          <div>{myUser?.phone}</div>
          <div>online</div>
        </div>
      </div>
    </div>
  );
}
