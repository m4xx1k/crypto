import {configureStore} from "@reduxjs/toolkit";
import tableReducer from './table/tableSlice'
import userReducer from "./user/userSlice";
import groupsReducer from './groups/groupsSlice'
import {apiSlice} from "./apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,

        table: tableReducer,
        user: userReducer,
        groups: groupsReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    //devTools: true
})