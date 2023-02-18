import { Modal } from "antd";
import { useState } from "react";
import { icons } from "@/lib/icons";
import { Poppins } from "@next/font/google";
import { User } from "@/types/typing";
import { selectUsers } from "@/redux/slices/users";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/user";
import { supabase } from "@/lib/supabase";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const ModalAddChat = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const [email, setEmail] = useState("");
  const users: User[] = useSelector(selectUsers);
  const user: User = useSelector(selectUser);

  async function createChat(id: number, userChat: User) {
    const res = await supabase
      .from("chat")
      .select()
      .contains("users", [user?.id, id]);

    if (res?.data && res?.data?.length > 0) {
      return;
    } else {
      await supabase.from("chat").insert({
        users: [user?.id, id],
        usersjson: [user, userChat],
      });
    }
  }
  return (
    <div className={`${poppins.className}`}>
      <Modal
        title="Create a chat with someone"
        centered
        open={open}
        okText="Create"
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{ className: "bg-blue-500 hidden" }}
        onCancel={() => setOpen(false)}
      >
        <div className="w-full ">
          <div className="relative w-full mt-5">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {email && users ? (
            <div className="flex flex-col  rounded-xl mt-3 space-y-2">
              {users
                .filter((userFilter) => userFilter?.email?.includes(email))
                .map((userMap: User) => (
                  <>
                    {userMap?.id !== user?.id ? (
                      <div
                        key={userMap?.id}
                        className="p-2 cursor-pointer  hover:bg-gray-20 transition-all rounded-lg "
                        onClick={() => createChat(userMap?.id, userMap)}
                      >
                        <div className="flex items-center">
                          <img
                            src={
                              userMap?.pic
                                ? userMap.pic
                                : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png"
                            }
                            className="w-[40px] object-contain rounded-full"
                            alt=""
                          />
                          <div className="ml-4 ">
                            <p>{userMap?.email}</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ))}
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default ModalAddChat;
