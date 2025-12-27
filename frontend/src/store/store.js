import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js"
import { authAPI } from "../services/authAPI.js";
import { adminAPI } from "../services/adminAPI.js";
import { employeAPI } from "../services/employeAPI.js";

const store = configureStore({
    reducer: {
        authSlice: authSlice,
        [authAPI.reducerPath]: authAPI.reducer,
        [adminAPI.reducerPath]: adminAPI.reducer,
        [employeAPI.reducerPath]: employeAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authAPI.middleware, adminAPI.middleware, employeAPI.middleware)
})

export default store;