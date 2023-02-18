import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatType } from "@/types/typing";

interface InitialState {
  chats: ChatType[];
}

const initialState: InitialState = {
  chats: [],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<ChatType[]>) => {
      state.chats = [...action.payload];
    },
    addChat: (state, action: PayloadAction<ChatType>) => {
      const newChats = [...state.chats, action.payload];
      state.chats = newChats;
    },
  },
});

export const { setChats, addChat } = chatsSlice.actions;

/* @ts-ignore */
export const selectChats = (state) => state.chats.chats;

export default chatsSlice.reducer;
