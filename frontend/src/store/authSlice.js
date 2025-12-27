import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: null,
        isAuthenticated: false
    },
    reducers: {
        LoginUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true;
        },

        LogoutUser: (state, action) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
});

export const { LoginUser, LogoutUser } = authSlice.actions;
export default authSlice.reducer