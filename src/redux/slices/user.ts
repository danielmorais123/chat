import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/typing";

interface InitialState {
    user: User | null;
}

const initialState: InitialState = {
    user: null,
};

export const authUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {

            state.user = action.payload;

        },
    },
});

export const { setUser } = authUserSlice.actions;


export const selectUser = (state: any) => state?.user.user;

export default authUserSlice.reducer;
