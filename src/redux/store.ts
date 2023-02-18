import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/users";
import userReducer from "./slices/user"
import chatidReducer from "./slices/selectedChat";
import chatReducer from "./slices/chats"
import userInChatReducer from "./slices/userInChat";
import themeReducer from "./slices/theme";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    chatid: chatidReducer,
    chats: chatReducer,
    userInChat: userInChatReducer,
    theme: themeReducer,
  },
});
