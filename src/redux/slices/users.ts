import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/typing";
interface InitialState {
    users: User[];
}

const initialState: InitialState = {
    users: [],
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = [...action.payload];
        },
        addUser: (state, action: PayloadAction<User>) => {
            const newUsers = [...state.users, action.payload];
            state.users = newUsers;
        },
    },
});

export const { setUsers, addUser } = usersSlice.actions;

/* @ts-ignore */
export const selectUsers = (state) => state.users.users;

export default usersSlice.reducer;
