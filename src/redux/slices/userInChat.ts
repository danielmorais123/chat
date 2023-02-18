import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/typing";

interface InitialState {
    userInChat: User | null;
}

const initialState: InitialState = {
    userInChat: null,
};

export const userInChatSlice = createSlice({
    name: "userInChat",
    initialState,
    reducers: {
        setUserInChat: (state, action: PayloadAction<User | null>) => {
            state.userInChat = action.payload;
        },
    },
});

export const { setUserInChat } = userInChatSlice.actions;


export const selectUserInChat = (state: any) => state?.userInChat.userInChat;

export default userInChatSlice.reducer;
