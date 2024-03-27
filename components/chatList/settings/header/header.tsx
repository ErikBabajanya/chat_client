import { IoMdArrowRoundBack } from "react-icons/io";
import { Chat } from "@/context/chat.context";
import { useContext } from "react";
import { SettingsContext } from "@/context/settings.context";
import { GoPencil } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";

export default function Header() {
  const settingsContext = useContext(SettingsContext);
  if (!settingsContext) return;
  const { avatarFull, openSettings } = settingsContext;
  return (
    <div
      className={`w-full h-[56px] px-[16px] flex items-center  bg-surface-color ${
        avatarFull ? "bg-transparent" : "bg-surface-color"
      }`}
    >
      <button
        onClick={openSettings}
        className={`w-[40px] h-[40px] p-2 relative rounded-[50%] mr-2 ${
          avatarFull
            ? "hover:bg-[#ffffff14]"
            : "hover:bg-light-secondary-text-color"
        }`}
      >
        <div className="w-[40px] h-[40px]"></div>
        <IoMdArrowRoundBack
          className={`w-6 h-6 absolute top-2 ${
            avatarFull ? "text-[#ffffff]" : "text-secondary-text-color"
          }`}
        />
      </button>
      <div className="ml-[30px]">
        <h1 className="font-medium text-[1.25rem] text-[#ffffff]">Settings</h1>
      </div>
      <div className="flex absolute right-0">
        <button
          className={`w-[40px] h-[40px] p-2 relative rounded-[50%] mr-2 ${
            avatarFull
              ? "hover:bg-[#ffffff14]"
              : "hover:bg-light-secondary-text-color"
          }`}
        >
          <div className="w-[40px] h-[40px]"></div>
          <GoPencil
            className={`w-6 h-6 absolute top-2 ${
              avatarFull ? "text-[#ffffff]" : "text-secondary-text-color"
            }`}
          />
        </button>
        <button
          className={`w-[40px] h-[40px] p-2 relative rounded-[50%] mr-2 ${
            avatarFull
              ? "hover:bg-[#ffffff14]"
              : "hover:bg-light-secondary-text-color"
          }`}
        >
          <div className="w-[40px] h-[40px]"></div>
          <CiMenuKebab
            className={`w-6 h-6 absolute top-2 ${
              avatarFull ? "text-[#ffffff]" : "text-secondary-text-color"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
