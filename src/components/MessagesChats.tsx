import {
  faAngleDown,
  faClose,
  faMoon,
  faPlus,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "@/lib/supabase";
import { setUserInChat } from "@/redux/slices/userInChat";
import { ChatType, User } from "@/types/typing";
import { selectChatSelected, selectChatId } from "../redux/slices/selectedChat";
import { selectChats, setChats } from "@/redux/slices/chats";
import { setOpositeTheme } from "@/redux/slices/theme";

const MessagesChats = ({
  user,
  open,
  setOpen,
  showLeftbar,
  setShowLeftbar,
}: {
  user: User;
  open: boolean;
  setOpen: any;
  showLeftbar: boolean;
  setShowLeftbar: any;
}) => {
  const chats = useSelector(selectChats);
  const [chatsFiltered, setChatsFiltered] = useState<ChatType[]>([]);
  const selectedChat = useSelector(selectChatSelected);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    supabase
      .from("chat")
      .select()
      .contains("users", [user?.id])
      .then((response) => {
        if (response.data) {
          console.log({ chats: response.data });
          dispatch(selectChatId(response.data[0].id));
          const userChatter =
            response.data[0]?.usersjson[0]?.id === user?.id
              ? response.data[0]?.usersjson[1]
              : response.data[0]?.usersjson[0];
          dispatch(setUserInChat(userChatter));
        }
      });
  }, [user]);

  useEffect(() => {
    if (search === "") {
      supabase
        .from("chat")
        .select()
        .contains("users", [user?.id])
        .then((res) => {
          if (res.data) {
            dispatch(setChats(res.data));
            setChatsFiltered(res.data);
          }
        });
      return;
    }

    setTimeout(() => {
      const copy = [...chats];

      const newChats = copy.filter((chat) =>
        chat.usersjson[0]?.id === user?.id
          ? chat.usersjson[1]?.email
              ?.toLowerCase()
              .includes(search.toLowerCase()) ||
            chat.usersjson[1]?.username
              ?.toLowerCase()
              .includes(search.toLowerCase())
          : chat.usersjson[0]?.email
              ?.toLowerCase()
              .includes(search.toLowerCase()) ||
            chat.usersjson[0]?.username
              ?.toLowerCase()
              .includes(search.toLowerCase())
      );

      setChatsFiltered(newChats);
    }, 800);
  }, [search]);

  useEffect(() => {
    const copy = [...chats];
    setChatsFiltered(copy);
  }, [chats]);

  function refreshChats() {
    supabase
      .from("chat")
      .select()
      .contains("users", [user?.id])
      .then((res) => {
        if (res.data) {
          dispatch(setChats(res.data));
          setChatsFiltered(res.data);
        }
      });
  }

  return (
    <div
      className={`bg-[#fffafa] h-full md:flex flex-col dark:bg-[#444444] ${
        showLeftbar ? "absolute top-0 left-0 w-full sm:max-w-[320px]" : "hidden"
      } md:relative md:min-w-[300px] lg:min-w-[320px] border-r dark:border-[#5a5a5a] dark:text-white`}
    >
      <div className="absolute right-2 flex md:hidden">
        <FontAwesomeIcon
          icon={faClose}
          className="text-[#615EF0] p-1 rounded-full text-sm cursor-pointer"
          onClick={() => setShowLeftbar(false)}
        />{" "}
      </div>
      <div className="p-5 flex justify-between items-center ">
        <div className=" flex items-center space-x-2">
          <p className="font-bold tracking-wide">Messages</p>
          <FontAwesomeIcon icon={faAngleDown} />
          <span className="text-xs bg-gray-100 dark:text-[#292929] px-2 rounded-full">12</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faMoon}
            onClick={() => dispatch(setOpositeTheme())}
            className=" py-2 px-1 rounded-full text-sm  cursor-pointer  text-[#3a3a3a] dark:text-white "
          />
          <FontAwesomeIcon
            icon={faRefresh}
            onClick={refreshChats}
            className="text-[#615EF0] dark:text-white p-2 rounded-full text-sm  cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => setOpen(!open)}
            className="bg-[#615EF0] p-2 rounded-full text-sm text-white cursor-pointer"
          />
        </div>
      </div>
      <hr className="dark:border-[#727272]" />
      <div className="p-3 w-full">
        <div className="relative w-full ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            autoComplete="off"
            type="text"
            id="voice-search"
            className="bg-gray-50 !border-2 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5 outline-none focus:border-blue-500 dark:placeholder-gray-400  "
            placeholder="Search..."
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-gray-400  hover:text-gray-900 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mt-3 space-y-1">
          {chatsFiltered.map((chat: ChatType, id: number) => (
            <Chat
              chat={chat}
              key={chat?.id}
              isTheSelectedChat={chat?.id === selectedChat}
              onChange={() => {
                dispatch(selectChatId(chat?.id));
                const userChatter =
                  chat?.usersjson[0]?.id === user?.id
                    ? chat?.usersjson[1]
                    : chat?.usersjson[0];
                dispatch(setUserInChat(userChatter));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesChats;
