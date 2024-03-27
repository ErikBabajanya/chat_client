import { useState } from "react";
import Content from "./content/content";
import Header from "./header/header";
import Profile from "./profile/profile";

export default function Settings() {
  const [profile, setProfile] = useState<boolean>(true);
  return (
    <div className="w-full h-full relative">
      {profile ? (
        <Profile />
      ) : (
        <div>
          <div className="absolute w-full z-10">
            <Header />
          </div>
          <div className="w-full h-full overflow-x-auto">
            <Content />
          </div>
        </div>
      )}
    </div>
  );
}
