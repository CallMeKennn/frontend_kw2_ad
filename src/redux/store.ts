import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // Kích hoạt Redux Thunk (mặc định đã bật)
    }).concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
