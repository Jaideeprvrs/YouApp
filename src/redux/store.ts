import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import authSliceReducer from "./slices/authSlice";
import { commentsApi } from "./slices/commentsApi";
import { postsApi } from "./slices/postsApi";
import userDataReducer from "./slices/userDataSlice";

const rootReducer = combineReducers({
  userData: userDataReducer,
  authData: authSliceReducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
});
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [postsApi.reducerPath, commentsApi.reducerPath, "userData"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }).concat(postsApi.middleware, commentsApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
