import { IoAttachOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { BsTelegram } from "react-icons/bs";
import { MessagesContext } from "@/context/messages.contex";

export default function Footer() {
  const messagesContext = useContext(MessagesContext);
  if (!messagesContext) return null;

  const { updateMessageInfo, messageInfo, sendMessage } = messagesContext;

  const [text, setText] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setText("");
    sendMessage(text);
  };

  return (
    <div className="w-full h-[58px] flex items-end justify-center items-center">
      <div className="xl:w-full w-[540px] w-full h-[58px] flex pb-2 px-[13px] justify-center">
        <form
          onSubmit={handleSubmit}
          className="xl:w-full w-[540px] w-full h-[58px] flex pb-2 px-[13px] justify-center"
        >
          <div className="xl:w-[728px] w-[514px] w-full h-full flex justify-center">
            <div className="xl:w-full xl:max-w-[672px] h-full w-[460px] justify-between bg-input-search-background-color rounded-2xl">
              <div className="w-full h-full flex items-center">
                <div className="min-w-[34px] h-[34px] flex justify-center items-center relative">
                  <button className="w-full h-full absolute"></button>
                  {/* <FaRegSmile className={`w-6 h-6 ml-1 text-secondary-text-color `} /> */}
                </div>
                <input
                  className="w-full bg-transparent h-full focus:outline-none"
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="min-w-[34px] h-[34px] flex justify-center items-center relative">
                  <button className="w-full h-full absolute"></button>
                  <IoAttachOutline className="w-6 h-6 text-secondary-text-color" />
                </div>
              </div>
            </div>
            <div className="min-w-[46px] h-[46px] ml-[10px] relative justify-center items-center bg-message-out-background-color rounded-[50%] flex">
              <button
                type="submit"
                className="absolute w-full h-full justify-center flex items-center"
              >
                <BsTelegram className="w-full h-full text-message-out-background-color bg-primary-text-color rounded-[50%]" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
