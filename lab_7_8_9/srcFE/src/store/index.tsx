import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminSlice, { AdminState } from "./slices/adminSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { ThunkAction, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import studentReducer, { studentState } from "./slices/studentSlide";
import roomReducer, { roomState } from "./slices/roomSlide";
import thingReducer, { thingState } from "./slices/thingSlide";
const persistConfig = {
  key: CONFIG.appName,
  storage,
};
export enum NotificationType {
  ERROR = "error",
  SUCCESS = "success",
}
const rootReducer = combineReducers({
  admin: adminSlice,
  student: studentReducer,
  room: roomReducer,
  thing: thingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type AppUseDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export type RootState = {
  admin: AdminState;
  student: studentState;
  room: roomState;
  thing: thingState;
};
export type AppDispatch = typeof store.dispatch;
