import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    theme: string;
}

const initialState: InitialState = {
    theme: "",
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
        },
        setOpositeTheme: (state) => {
            if (state.theme === "") {
                state.theme = "dark";
            }
            else {
                state.theme = ""
            }
        }
    },
});

export const { setTheme, setOpositeTheme } = themeSlice.actions;

/* @ts-ignore */
export const selectTheme = (state) => state.theme.theme;

export default themeSlice.reducer;
