import { IoMdArrowRoundBack } from "react-icons/io";
import { Chat } from "@/context/chat.context";
import { useContext } from "react";

export default function Header() {
  const chatContext = useContext(Chat);
  if (!chatContext) return;
  const { openSettings } = chatContext;
  return (
    <div className="w-full h-[56px] px-[16px] flex items-center">
      <button
        onClick={openSettings}
        className="w-[40px] h-[40px] p-2 relative rounded-[50%] hover:bg-light-secondary-text-color mr-2"
      >
        <div className="w-[40px] h-[40px]"></div>
        <IoMdArrowRoundBack className="w-6 h-6 absolute top-2 text-secondary-text-color" />
      </button>
      <div className="ml-[30px]">
        <h1 className="font-medium text-[1.25rem] text-[#ffffff]">Settings</h1>
      </div>
    </div>
  );
}
