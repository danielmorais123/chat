import { selectUser } from "@/redux/slices/user";
import { User } from "@/types/typing";
import { useSelector } from "react-redux";

const Chat = ({
  chat,
  isTheSelectedChat,
  onChange,
}: {
  chat: any;
  isTheSelectedChat: boolean;
  onChange: any;
}) => {
  const { lastMessageDate, usersjson, lastMessage } = chat;
  const user = useSelector(selectUser);
  const chatUser: User =
    usersjson[0]?.id === user?.id ? usersjson[1] : usersjson[0];


   
  return (
    <div
      onClick={onChange}
      className={`rounded-lg hover:bg-[#f3f0f0] dark:hover:bg-gray-50 dark:hover:text-[#292929] flex justify-between items-start cursor-pointer py-3 px-2 transition-all ${
        isTheSelectedChat ? "bg-[#f3f0f0] dark:bg-gray-50  dark:text-[#292929]" : ""
      }`}
    >
      <div className="flex items-start">
        <img
          src={
            chatUser?.pic
              ? chatUser?.pic
              : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"
          }
          className="w-[48px] object-contain rounded-md"
        />
        <div className="ml-2">
          <p className="font-bold text-sm tracking-wide">
            {chatUser?.username}
          </p>
          <p className="text-xs text-[#8d8d8d]">{lastMessage}</p>
          <div className="space-x-1 mt-1">
            {["Question", "Help wanted"].map((need: string, idx: number) => (
              <span
                key={idx}
                className={`${
                  idx === 0
                    ? "text-[#e08642] bg-[#efba85]"
                    : "text-[#62bb89] bg-[#b7eac8]"
                }  font-bold text-[11px] px-3 py-0.5 rounded-full`}
              >
                {need}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <span className="text-[10px] text-[#8d8d8d]">12 min</span>
      </div>
    </div>
  );
};

export default Chat;
