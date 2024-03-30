import { SettingsContext } from "@/context/settings.context";
import { useContext } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Header() {
  const settingsContext = useContext(SettingsContext);
  if (!settingsContext) return;
  const { openProfile } = settingsContext;
  return (
    <div className="w-full h-[56px] px-[16px] flex items-center">
      <button
        onClick={openProfile}
        className={`w-[40px] h-[40px] p-2 relative rounded-full mr-2 hover:bg-light-secondary-text-color rounded-full`}
      >
        <IoMdArrowRoundBack
          className={`w-6 h-6 absolute top-2 text-secondary-text-color`}
        />
      </button>
      <div className="ml-[30px]">
        <h1 className="font-medium text-[1.25rem] text-[#ffffff] select-none">
          Edite Profile
        </h1>
      </div>
    </div>
  );
}
