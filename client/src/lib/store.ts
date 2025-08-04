import { configureStore, combineReducers } from "@reduxjs/toolkit";
import phonebookReducers from "./reducers/phonebookReducers.ts";
import messageReducer    from "./reducers/messageReducer.ts";

const reducers = combineReducers({ 
  ...phonebookReducers,
  ...messageReducer
});

const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;