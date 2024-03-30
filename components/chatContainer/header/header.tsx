import { IoCallOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Chat } from "@/context/chat.context";
import { useContext } from "react";
import { FaUser } from "react-icons/fa";
export default function MessagesHeader() {
  const ChatContext = useContext(Chat);
  if (!ChatContext) return;
  const { chatUser, closeChat } = ChatContext;
  if (!chatUser) return;
  return (
    <div className="w-full h-14">
      <div className="w-full h-14 bg-surface-color relative">
        <button
          className="w-full h-full absolute"
          //onClick={openchatInfo}
        ></button>
        <div className="w-full h-14 px-4">
          <div className="w-full h-14 flex items-center justify-between">
            <div className="max-w-full h-full py-1 pl-[3px] flex items-center">
              <button
                onClick={closeChat}
                className="lg:flex hidden w-[40px] h-[40px] p-2 relative rounded-full hover:bg-light-secondary-text-color mr-2"
              >
                <div className="w-[40px] h-[40px]"></div>
                <IoMdArrowRoundBack className="w-6 h-6 absolute top-2 text-secondary-text-color" />
              </button>
              <div className="flex items-center">
                <div
                  className={`min-w-[42px] h-[42px] rounded-full flex justify-center items-center ${
                    chatUser.picture ? "" : "bg-profile-color"
                  }`}
                >
                  {(chatUser.picture && (
                    <img
                      className="w-[42px] h-[42px] rounded-full"
                      src={`data:image/jpeg;base64,${chatUser.picture}`}
                      alt="User Profile"
                    />
                  )) ||
                    (chatUser.firstName && (
                      <h1 className="font-medium text-[1.25rem] text-primary-text-color">
                        {chatUser.firstName?.charAt(0) +
                          chatUser.lastName?.charAt(0)}
                      </h1>
                    )) || <FaUser />}
                </div>
                <div className="w-full h-full pl-[18px]">
                  <div className="w-full">
                    <div className="leading-[1.3125] text-primary-text-color">
                      {chatUser?.firstName || chatUser?.phone}
                    </div>
                  </div>
                  <div className="w-full ">
                    <div className="text-secondary-text-color text-[0.875rem]">
                      last seen recently
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[144px] h-[40px] flex justify-end	">
              <div className="w-[40px] h-[40px]">
                <button className="w-[40px] h-[40px] p-2 relative rounded-full transition-colors duration-300 hover:bg-light-secondary-text-color">
                  <IoCallOutline className="w-6 h-6 absolute top-2 text-secondary-text-color" />
                </button>
              </div>
              <div className="w-[40px] h-[40px]">
                <button className="w-[40px] h-[40px] p-2 relative rounded-full transition-colors duration-300 hover:bg-light-secondary-text-color">
                  <IoSearch className="w-6 h-6 absolute top-2 text-secondary-text-color" />
                </button>
              </div>
              <div className="w-[40px] h-[40px]">
                <button className="w-[40px] h-[40px] p-2 relative rounded-full transition-colors duration-300 hover:bg-light-secondary-text-color">
                  <CiMenuKebab className="w-6 h-6 absolute top-2 text-secondary-text-color" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
