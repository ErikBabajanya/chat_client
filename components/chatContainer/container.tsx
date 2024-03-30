import Footer from "./footer/footer";
import MessagesHeader from "./header/header";
import Messages from "./messages/messages";

export default function Container() {
  return (
    <div className="w-full h-full flex">
      <div className={`w-full h-full `}>
        <MessagesHeader />
        <div className="h-[calc(100%-114px)] w-full overflow-x-auto xl:px-[25px] flex justify-center">
          <div className={`h-full w-[510px] xl:w-[728px]`}>
            <Messages />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
