import { IoCloseOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { Chat } from "@/context/chat.context";
import { useContext } from "react";
import { MessagesContext } from "@/context/messages.contex";

const Header = () => {
  const messagesContext = useContext(MessagesContext);
  const chatContext = useContext(Chat);
  if (!messagesContext || !chatContext) return;
  const {} = messagesContext;
  //const { closeChatInfo } = chats;
  return (
    <div className="w-full pl-[16px] h-[56px] flex items-center">
      <div className="w-[40px] h-[40px]">
        <button
          //onClick={closeChatInfo}
          className="w-[40px] h-[40px] p-2 relative rounded-[50%] transition-colors duration-300 hover:bg-light-secondary-text-color"
        >
          <IoCloseOutline className="w-6 h-6 absolute top-2 text-secondary-text-color" />
        </button>
      </div>

      {/* <div className="w-full pl-[24px] font-medium text-primary-text-color text-[1.25rem]">
        User Info
      </div>
      <div className="w-[40px] h-[40px]">
        <button className="w-[40px] h-[40px] p-2 relative rounded-[50%] transition-colors duration-300 hover:bg-light-secondary-text-color">
          <GoPencil className="w-6 h-6 absolute top-2 text-secondary-text-color" />
        </button>
      </div> */}
    </div>
  );
};

export default Header;
