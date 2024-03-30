import { Auth } from "@/context/auth.context";
import { SettingsContext } from "@/context/settings.context";
import { useContext, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";

export default function Content() {
  const settingsContext = useContext(SettingsContext);
  const auth = useContext(Auth);
  if (!settingsContext || !auth) return;
  const { myUser } = auth;
  const { setFullAvatar, avatarFull } = settingsContext;

  return (
    <div className="w-full h-full">
      <div
        className={`w-full relative flex justify-end flex-col ${
          avatarFull ? "sm:h-[100vw] h-[424px]" : "h-[280px]"
        }`}
      >
        <button
          onClick={setFullAvatar}
          className="w-full h-full absolute"
        ></button>
        <div
          className={`w-full flex justify-center ${
            avatarFull ? "h-full" : "h-[120px]"
          }`}
        >
          <div
            className={`${myUser?.picture ? "" : "bg-profile-color"} ${
              avatarFull
                ? "w-full h-full rounded-full"
                : "w-[120px] h-[120px] rounded-full"
            } ${avatarFull ? "animate-expand" : ""}`}
          >
            {myUser?.picture && (
              <img
                className={`${
                  avatarFull
                    ? "w-full h-full rounded-full"
                    : "w-[120px] h-[120px] rounded-full"
                } ${avatarFull ? "animate-expand" : ""}`}
                src={`data:image/jpeg;base64,${myUser?.picture}`}
                alt="User Profile"
              />
            )}
          </div>
        </div>

        <div
          className={` h-[80px] text-[#ffffff] flex justify-center flex-col items-center ${
            avatarFull ? "absolute w-auto bottom-0 left-[20px]" : "w-full"
          }`}
        >
          <div>
            {" "}
            {(myUser?.firstName &&
              myUser?.firstName + " " + myUser?.lastName) ||
              myUser?.lastName ||
              myUser?.phone}
          </div>
          <div>online</div>
        </div>
      </div>
      <div className="w-full h-[70px] px-2 flex items-center">
        <button className="w-full h-[56px] flex items-center relative hover:bg-light-secondary-text-color rounded-[10px]">
          <div className="w-[40px] h-[40px] flex justify-center items-center absolute left-[25px]">
            <FaPhoneAlt className="w-[24px] h-[24px] text-secondary-text-color" />
          </div>
          <div className="w-full h-[40px] pl-[80px] flex flex-col items-start	">
            <div className="text-[#fff] text-[16px] leading-[1.3125]">
              {myUser?.phone}
            </div>
            <div className="text-[14px] leading-[0.1875rem] mt-[10px] text-secondary-text-color">
              Phone
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
