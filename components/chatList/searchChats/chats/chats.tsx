import { Chat } from "@/context/chat.context";
import { useContext } from "react";
import { FaUser } from "react-icons/fa";

export default function Chats() {
  const chat = useContext(Chat);
  if (!chat) return;
  const { chatList, findUser, findUserChat } = chat;
  return (
    <div>
      {findUser?.map((user, key) => {
        return (
          <div
            key={key}
            className="w-full h-[72px]  pr-2 flex items-center sm:hover:rounded-[0px]
          rounded-[10px] hover:bg-light-filled-secondary-text-color relative"
          >
            <button
              className="w-full h-full absolute z-10 "
              onClick={() => findUserChat(user)}
            ></button>
            <div className="w-full relative flex items-center">
              <div className="w-[54px] h-[54px] bg-profile-color rounded-full left-2 absolute sm:ml-[9px] flex justify-center items-center">
                {(user.picture && (
                  <img
                    className="w-[54px] h-[54px] rounded-full"
                    src={`data:image/jpeg;base64,${user?.picture}`}
                    alt="User Profile"
                  />
                )) ||
                  (user.firstName && (
                    <h1 className="font-medium text-[1.25rem] text-primary-text-color">
                      {user.firstName?.charAt(0) + user.lastName?.charAt(0)}
                    </h1>
                  )) || <FaUser />}
              </div>
              <div className="w-full pl-[72px] mr-3 sm:pl-[80px]">
                <div className="w-full flex justify-between">
                  <div className="font-medium text-primary-text-color">
                    {(user.firstName && user.firstName + " " + user.lastName) ||
                      user.lastName ||
                      user.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
