import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
    chatid: number;
}

const initialState: InitialState = {
    chatid: 1,
};

export const chatidSlice = createSlice({
    name: "chatid",
    initialState,
    reducers: {
        selectChatId: (state, action: PayloadAction<number>) => {
            state.chatid = action.payload;
        },
    },
});

export const { selectChatId } = chatidSlice.actions;

/* @ts-ignore */
export const selectChatSelected = (state) => state?.chatid.chatid;

export default chatidSlice.reducer;
