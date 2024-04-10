import { IoAttachOutline } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { BsTelegram } from "react-icons/bs";
import { MessagesContext } from "@/context/messages.contex";
import { useForm } from "react-hook-form";
import { MdKeyboardVoice } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineClear } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { Chat } from "@/context/chat.context";
import { FaUser } from "react-icons/fa";
import { User } from "@/interface/user.interface";
import { text } from "body-parser";

export default function Footer() {
  const messagesContext = useContext(MessagesContext);
  const chatContext = useContext(Chat);
  if (!messagesContext || !chatContext) return null;

  const {
    sendMessage,
    unSelectAllMessage,
    deleteMessages,
    closePopup,
    openPopup,
    popupChat,
    selected,
    forwarded,
    forwardMessage,
  } = messagesContext;

  const { chatUser, chatList, findUserChat, writing, stopWriting } =
    chatContext;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      text: "",
    },
  });
  const { isDirty } = formState;
  useEffect(() => {
    if (isDirty) {
      writing();
    } else {
      stopWriting();
    }
  }, [isDirty]);
  const onSubmit = (data: any) => {
    sendMessage(data.text);
    reset();
  };

  const [forward, setForward] = useState<boolean>(false);

  const forwardMsg = (user: User) => {
    forwardMessage();
    setForward(false);
    findUserChat(user);
  };

  return (
    <div className="w-full h-[58px] flex items-end justify-center items-center">
      {forward && (
        <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-[#0000004d]">
          <div
            onClick={() => setForward(false)}
            className="w-full h-full absolute top-0 left-0 z-30"
          ></div>
          <div className="w-[420px] h-[calc(100%-60px)] rounded-[10px] z-50 absolute bg-surface-color px-[8px] py-[12px]">
            <div className="w-full h-[40px] flex mb-4">
              <div className="w-[40px] h-[40px]">
                <button
                  type="button"
                  onClick={() => setForward(false)}
                  className="rounded-full flex items-center justify-center h-full w-full transition-colors duration-300 hover:bg-light-secondary-text-color "
                >
                  <MdOutlineClear className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              <div className="w-full h-full">
                <input
                  className="bg-transparent w-full h-full focus:outline-none text-primary-text-color"
                  placeholder="Froward to..."
                />
              </div>
            </div>
            {chatList?.map((user, key) => {
              return (
                <button
                  key={key}
                  onClick={() => forwardMsg(user.user)}
                  className="w-full h-[56px] flex flex-col justify-center hover:bg-light-filled-secondary-text-color rounded-[10px]"
                >
                  <div className="w-full h-full flex flex-col justify-center">
                    <div className="w-[42px] h-[42px] rounded-full left-4 absolute sm:ml-[9px] flex justify-center items-center">
                      {(user.user.picture && (
                        <img
                          className="w-full h-full rounded-full"
                          src={`data:image/jpeg;base64,${user.user?.picture}`}
                          alt="User Profile"
                        />
                      )) ||
                        (user.user.firstName && (
                          <h1 className="font-medium text-[1.25rem] text-primary-text-color bg-profile-color">
                            {user.user.firstName?.charAt(0) +
                              user.user.lastName?.charAt(0)}
                          </h1>
                        )) || (
                          <div className="w-full h-full rounded-full flex items-center justify-center bg-profile-color">
                            <FaUser />
                          </div>
                        )}
                    </div>
                    <div className="w-full pl-[72px] mr-3 sm:pl-[80px]">
                      <div className="w-full flex justify-between">
                        <div className="font-medium text-primary-text-color">
                          {(user.user.firstName &&
                            user.user.firstName + " " + user.user.lastName) ||
                            user.user.lastName ||
                            user.user.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {popupChat && (
        <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-[#0000004d]">
          <div
            onClick={closePopup}
            className="w-full h-full absolute top-0 left-0 z-30"
          ></div>
          <div className="w-[312px] h-[220px] rounded-[10px] z-50 absolute bg-surface-color px-[8px] py-[12px]">
            <div className="w-full h-[40px] flex items-center">
              <div className="w-[32px] h-[32px] bg-profile-color rounded-full left-2 absolute sm:ml-[9px] flex justify-center items-center">
                {(chatUser?.picture && (
                  <img
                    className="w-[32px] h-[32px] rounded-full"
                    src={`data:image/jpeg;base64,${chatUser?.picture}`}
                    alt="User Profile"
                  />
                )) ||
                  (chatUser?.firstName && (
                    <h1 className="font-medium text-[1.25rem] text-primary-text-color">
                      {chatUser.firstName?.charAt(0) +
                        chatUser.lastName?.charAt(0)}
                    </h1>
                  )) || <FaUser />}
              </div>
              <div className="ml-[50px] text-[1.25rem] font-medium text-primary-text-color">
                <span>Delete</span>
                <span className="ml-1 mr-1">
                  {Object.keys(selected).length}
                </span>
                <span>Messages</span>
              </div>
            </div>
            <div className="w-full px-[16px] py-[10px] text-primary-text-color select-none">
              <span>Are you sure you want to delete these messages?</span>
            </div>
            <div className="px-[16px] text-primary-text-color select-none">
              <span>Also delete for</span>
              <span className="ml-[6px]">
                {chatUser?.firstName || chatUser?.phone}
              </span>
            </div>
            <div className="px-[16px] mt-[6px]">
              <button
                onClick={closePopup}
                className="text-message-out-background-color rounded-[10px] w-[92px] h-[40px] hover:bg-light-primary-color"
              >
                CANCEL
              </button>
              <button
                onClick={deleteMessages}
                className="text-danger-color rounded-[10px] w-[92px] h-[40px] hover:bg-light-danger-color"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="xl:w-full w-[540px] w-full h-[58px] flex pb-2 px-[13px] justify-center">
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={`xl:w-full w-[540px] w-full flex pb-2 px-[13px] justify-center ${
            forwarded ? "h-[86px] mb-2" : "h-[58px]"
          }`}
        >
          <div className="xl:w-[728px] w-[514px] w-full h-full flex justify-center">
            <div className="xl:w-full xl:max-w-[672px] h-full w-[460px] justify-between bg-input-search-background-color rounded-2xl">
              <div className="w-full h-full flex items-center">
                {Object.keys(selected).filter((key) => selected[key]).length ? (
                  <div className="w-full h-full flex justify-between items-center ml-[30px]">
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={unSelectAllMessage}
                        className="rounded-full flex items-center justify-center h-[40px] w-[40px] transition-colors duration-300 hover:bg-light-secondary-text-color "
                      >
                        <MdOutlineClear className="w-6 h-6 text-gray-400" />
                      </button>
                      <span className="select-none text-primary-text-color">
                        {Object.keys(selected).filter((key) => selected[key])
                          .length + " "}
                        Messages
                      </span>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => setForward(true)}
                        type="button"
                        className="rounded-[10px] flex items-center justify-center justify-around h-[40px] w-[108px] transition-colors duration-300 hover:bg-light-secondary-text-color "
                      >
                        <RiShareForwardFill className="w-6 h-6 text-gray-400" />
                        <span className="text-primary-text-color">Forward</span>
                      </button>
                    </div>
                    <div className="flex items-center mr-[10px]">
                      <button
                        type="button"
                        onClick={openPopup}
                        className="rounded-[10px] hover:bg-light-danger-color flex items-center justify-center  justify-evenly h-[40px] w-[108px] transition-colors duration-300"
                      >
                        <MdDeleteForever className="w-6 h-6 text-danger-color" />
                        <span className="text-danger-color">Delete</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full">
                    {forwarded ? (
                      <div className="w-full h-full">
                        <div>{forwarded}</div>
                        <input
                          className="w-full bg-transparent h-[58px] focus:outline-none p-2 text-primary-text-color"
                          required
                          {...register("text")}
                        />
                      </div>
                    ) : (
                      <input
                        className="w-full bg-transparent h-full focus:outline-none p-2 text-primary-text-color"
                        required
                        {...register("text")}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="min-w-[46px] h-[46px] ml-[10px] relative justify-center items-center bg-message-out-background-color rounded-full flex">
              {isDirty ? (
                <button
                  type="submit"
                  className="absolute w-full h-full justify-center flex items-center"
                >
                  <BsTelegram className="w-full h-full text-message-out-background-color bg-primary-text-color rounded-full" />
                </button>
              ) : (
                <button
                  type="button"
                  className="absolute w-full h-full justify-center flex items-center"
                >
                  <MdKeyboardVoice className="w-full h-full text-primary-text-color rounded-full" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
