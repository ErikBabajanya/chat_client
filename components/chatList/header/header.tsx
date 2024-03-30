import { useContext, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { Chat } from "@/context/chat.context";
import { SettingsContext } from "@/context/settings.context";
export default function Header() {
  const settingsContext = useContext(SettingsContext);
  if (!settingsContext) return;
  const { openSettings } = settingsContext;
  const [menu, setMenu] = useState<boolean>(false);
  return (
    <div className="px-4 h-14 w-full sm:px-2 sm:w-full flex items-center">
      {menu && (
        <div className="w-full h-full absolute top-0 left-0">
          <div
            onClick={() => setMenu(!menu)}
            className="w-full h-full absolute top-0 left-0 z-30"
          ></div>
          <div className="w-[260px] absolute bg-[#222222] py-[10px] px-[10px] top-[55px] left-[20px] backdrop-blur-[50px] h-[200px] opacity-80 z-50 shadow-lg rounded-[10px] border border-[#3a3838]">
            <div className="flex w-full h-[32px] items-center relative">
              <button
                onClick={openSettings}
                className="absolute w-full h-full hover:bg-[#aaaaaa14]"
              ></button>
              <IoMdSettings className="ml-[15px] text-[#ffffff]" />
              <div className="ml-[5px] text-[#ffffff]">settings</div>
            </div>
          </div>
        </div>
      )}
      <div className="w-10 h-10 ">
        <button
          onClick={() => setMenu(!menu)}
          className="p-2 rounded-full transition-colors duration-300 hover:bg-light-secondary-text-color "
        >
          <IoMenu className="w-6 h-6 text-gray-400" />
        </button>
      </div>
      <div className="relative w-full h-[42px] px-[7px] flex items-center justify-end">
        <input
          className="pl-11 w-full h-full rounded-[22px] bg-input-search-background-color text-primary-text-color transition-colors duration-300 border border-[1px] border-[#2f2f2f] hover:border-secondary-color focus:border-primary-color focus:border-2 focus:outline-none"
          placeholder="Search"
        />
        <div className="absolute w-6 h-6 left-5">
          <IoSearch className="text-gray-400 w-6 h-6" />
        </div>
        <div className="w-8 h-8 rounded-full bg-secondary-color absolute right-3 justify-center items-center flex">
          <div className="w-7 h-7 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
