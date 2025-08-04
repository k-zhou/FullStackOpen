import { configureStore, combineReducers } from "@reduxjs/toolkit";
import phonebookReducers from "./reducers/phonebookReducers.ts";

const reducers = combineReducers({ 
  ...phonebookReducers 
});

const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;