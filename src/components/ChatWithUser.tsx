import { supabase } from "@/lib/supabase";
import { setChats } from "@/redux/slices/chats";
import { selectChatSelected } from "@/redux/slices/selectedChat";
import { selectUser } from "@/redux/slices/user";
import { Message, User } from "@/types/typing";
import {
  faBars,
  faCircle,
  faFile,
  faImage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInChat } from "@/redux/slices/userInChat";
import Picker from "emoji-picker-react";

const ChatWithUser = ({
  showLeftbar,
  setShowLeftbar,
}: {
  showLeftbar: boolean;
  setShowLeftbar: any;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const selectedChat: number = useSelector(selectChatSelected);
  const user: User = useSelector(selectUser);
  const refMsg = useRef(null);
  const dispatch = useDispatch();
  const userInChat: User = useSelector(selectUserInChat);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const emojiRef = useRef(null);

  console.log({ file });
  function compare(a: any, b: any): number {
    if (a.created_at < b.created_at) {
      return -1;
    }
    if (a.created_at > b.created_at) {
      return 1;
    }
    return 0;
  }

  const scrollToLastMessage = () => {
    /* @ts-ignore */
    refMsg.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const channel = supabase.channel("users");

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        console.log(state);
      })
      .subscribe();
  }, []);

  useEffect(() => {
    scrollToLastMessage();
  }, [messages]);

  useEffect(() => {
    supabase
      .from("message")
      .select()
      .order("created_at", { ascending: false })
      .eq("chatId", selectedChat)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const newMessages = res.data.sort(compare);

          setMessages(newMessages);
        }
      });
  }, [selectedChat]);

  useEffect(() => {
    const channel = supabase.channel("message");

    const sub = channel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
          filter: `chatId=eq.${selectedChat}`,
        },
        (payload) => {
          supabase
            .from("message")
            .select()
            .order("created_at", { ascending: false })
            .eq("chatId", selectedChat)
            .then((res) => {
              if (res.data && res.data.length > 0) {
                const newMessages = res.data.sort(compare);
                setMessages(newMessages);
              }
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
  }, [selectedChat]);

  async function sendMessage() {
    if (!messageText) {
      return;
    }

    await supabase.from("message").insert({
      message: messageText,
      user,
      chatId: selectedChat,
      userIdSender: user?.id,
    });

    await supabase
      .from("chat")
      .update({
        lastMessage: messageText /* @ts-ignore */,
        lastMessageDate: new Date().toISOString().toLocaleString("zh-TW"),
      })
      .eq("id", selectedChat);

    setMessageText("");
    supabase
      .from("chat")
      .select()
      .contains("users", [user?.id])
      .then((res) => {
        /* @ts-ignore */
        dispatch(setChats(res.data));
      });
  }

  function onEmojiClick(event: any, emojiObject: any) {
    console.log({ event, emojiObject });
    setMessageText(messageText + event.emoji);
    setShowEmoji(false);
  }

  return (
    <div className="w-full flex flex-col bg-[#fffafa] dark:bg-[#444444] ">
      {userInChat ? (
        <div className="p-5 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center dark:text-white">
              <div className="md:hidden">
                <FontAwesomeIcon
                  icon={faBars}
                  className="cursor-pointer "
                  onClick={() => setShowLeftbar(true)}
                />
              </div>
              <img
                src={
                  userInChat?.pic ||
                  "https://static.vecteezy.com/system/resources/thumb…motions-user-avatar-for-app-web-design-vector.jpg"
                }
                className="w-[40px] object-contain rounded-lg ml-2"
              />
              <div className="ml-4">
                <p className="font-bold tracking-wide text-sm">
                  {userInChat?.username}
                </p>
                <span className="text-xs flex items-center ">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="w-2 h-2 mr-1 text-green-500"
                  />{" "}
                  Online
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-[#cdcbfc] hover:bg-[#cdcbfc]/80 px-4 py-2 rounded-lg cursor-pointer">
              <FontAwesomeIcon icon={faPhone} className="text-[#615def] " />
              <p className="text-xs text-[#615def] font-semibold tracking-wider">
                Call
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="p-5">Select a chat</p>
      )}
      <hr className="dark:border-white-"/>
      <div className="p-5 w-full h-full space-y-2  overflow-y-auto scrollbar-thin scrollbar-thumb-[#6cb1e9] scrollbar-track-gray-100 bg-[#fffafa] dark:bg-[#505050] ">
        {messages.map((message) => (
          <div
            key={message?.id}
            className={`w-full flex ${
              user?.id === message?.userIdSender
                ? "justify-end "
                : "justify-start"
            }`}
          >
            <div
              className={`flex items-center w-fit  ${
                user?.id === message?.userIdSender ? "" : "flex-row-reverse"
              }`}
            >
              <p
                className={`tracking-wide text-xs ${
                  user?.id === message?.userIdSender ? "mr-2" : " ml-2"
                } bg-yellow-100 p-3 rounded-lg`}
              >
                {message?.message}
              </p>

              <img
                src={
                  message?.user?.pic ||
                  "https://cdn-icons-png.flaticon.com/512/219/219969.png"
                }
                alt="user"
                className="h-[55px] object-contain"
              />
            </div>
          </div>
        ))}
        <div ref={refMsg} />
      </div>
      <hr />
      {userInChat ? (
        <div>
          <div className="flex items-center px-3 py-2  bg-[#fffafa] dark:bg-[#444444] dark:border-[#5a5a5a] dark:border">
            <button
              type="button"
              className="inline-flex justify-center p-2 rounded-lg cursor-pointer  hover:bg-gray-100 text-gray-400 transition-all "
            >
              <label className="cursor-pointer" htmlFor="fileInput">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </label>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length && e.target.files?.length > 0)
                    setFile(e.target.files[0]);
                }}
              />
              <span className="sr-only">Upload image</span>
            </button>
            <div className=" ">
              <button
                onClick={() => setShowEmoji(!showEmoji)}
                type="button"
                className="inline-flex justify-center p-2 rounded-lg cursor-pointer  hover:bg-gray-100 text-gray-400 transition-all  "
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Add emoji</span>
              </button>
              {showEmoji ? (
                <div ref={emojiRef} className="absolute bottom-0 py-10 px-2 ">
                  {" "}
                  <Picker onEmojiClick={onEmojiClick} />{" "}
                </div>
              ) : null}
            </div>

            <textarea
              id="chat"
              rows={1}
              className="block mx-4 p-2.5 w-full text-sm text-gray-900  bg-white rounded-lg border-2 placeholder-gray-700 outline-none focus:border-blue-500"
              placeholder="Your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            ></textarea>
            <div>
              {file?.type.split("/")[1] === "png" ? (
                <FontAwesomeIcon
                  icon={faImage}
                  className={`bg-[#ddfce6] text-[#72cc97] cursor-pointer p-2 rounded-lg !w-5 !h-5 transition-all`}
                />
              ) : null}
            </div>
            <button
              onClick={sendMessage}
              className="inline-flex justify-center p-2 !z-0 text-blue-600 rounded-full cursor-pointer "
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ChatWithUser;
