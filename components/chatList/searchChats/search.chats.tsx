import Header from "./searchHeader/search.header";
import Chats from "./chats/chats";
import Media from "./media/media";
import Links from "./links/links";
import Music from "./music/music";
import { useState } from "react";

export default function SearchChats() {
  const [search, setSearch] = useState({
    chats: true,
    media: false,
    links: false,
    music: false,
  });

  const find = (name: string) => {
    const updatedSearch: { [key: string]: boolean } = { ...search };
    for (const key in updatedSearch) {
      if (updatedSearch.hasOwnProperty(key)) {
        updatedSearch[key] = false;
      }
    }

    if (updatedSearch.hasOwnProperty(name)) {
      updatedSearch[name] = true;
      setSearch(
        updatedSearch as {
          chats: boolean;
          media: boolean;
          links: boolean;
          music: boolean;
        }
      );
    } else {
      console.error("Invalid property name:", name);
    }
  };

  return (
    <div>
      <div className="flex justify-around h-[48px] items-center px-2">
        <button
          onClick={() => find("chats")}
          className="w-full h-full relative radius transition-colors duration-300 hover:bg-light-secondary-text-color"
        >
          <div
            className={` ${
              search.chats
                ? "text-message-out-background-color"
                : "text-gray-400"
            }`}
          >
            Chats
          </div>
          {search.chats ? (
            <div className="w-[41px] h-[3px] bg-message-out-background-color absolute rounded-[30px] left-[13.5px]"></div>
          ) : null}
        </button>
        <button
          onClick={() => find("media")}
          className="w-full h-full relative radius transition-colors duration-300 hover:bg-light-secondary-text-color"
        >
          <div
            className={` ${
              search.media
                ? "text-message-out-background-color"
                : "text-gray-400"
            }`}
          >
            Media
          </div>
          {search.media ? (
            <div className="w-[41px] h-[3px] bg-message-out-background-color absolute rounded-[30px] left-[13.5px]"></div>
          ) : null}
        </button>
        <button
          onClick={() => find("links")}
          className="w-full h-full radius relative transition-colors duration-300 hover:bg-light-secondary-text-color"
        >
          <div
            className={` ${
              search.links
                ? "text-message-out-background-color"
                : "text-gray-400"
            }`}
          >
            Links
          </div>
          {search.links ? (
            <div className="w-[41px] h-[3px] bg-message-out-background-color absolute rounded-[30px] left-[13.5px]"></div>
          ) : null}
        </button>
        <button className="w-full h-full radius transition-colors duration-300 hover:bg-light-secondary-text-color">
          <div className="text-gray-400">Files</div>
        </button>
        <button className="w-full h-full radius transition-colors duration-300 hover:bg-light-secondary-text-color">
          <div className="text-gray-400">Music</div>
        </button>
        <button className="w-full h-full radius transition-colors duration-300 hover:bg-light-secondary-text-color">
          <div className="text-gray-400">Voice</div>
        </button>
      </div>
      {search.chats && <Chats />}
      {search.media && <Media />}
      {search.links && <Links />}
      {search.music && <Music />}
    </div>
  );
}
