import { faAmazon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faCat,
  faCommentDots,
  faGear,
  faHouse,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

const LeftSideBar = ({ setUser, user }: { setUser: any; user: any }) => {
  async function signOutUser() {
    setUser(null);
    await supabase.auth.signOut();
  }

  return (
    <div className="h-full w-fit bg-white min-w-[70px] 2xl:flex  flex-col items-center justify-between shadow-2xl hidden dark:bg-[#383838]">
      <div className="h-full flex flex-col ">
        <FontAwesomeIcon
          icon={faCat}
          className="w-4 h-4 text-white bg-[#615EF0] p-3 rounded-lg mt-3"
        />
      </div>
      <div className="mb-3 ">
        <img
          onClick={signOutUser}
          src="https://static.vecteezy.com/system/resources/thumbnails/004/607/806/small/man-face-emotive-icon-smiling-bearded-male-character-in-yellow-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
          className="!w-[48] h-[50px] rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default LeftSideBar;
