import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import { persistor, rootReducer, store } from "../store"; // Import the store components

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(),
}));

jest.mock("./slices/postsApi", () => ({
  postsApi: {
    reducerPath: "postsApi",
    reducer: jest.fn(),
    middleware: jest.fn(),
  },
}));

jest.mock("./slices/commentsApi", () => ({
  commentsApi: {
    reducerPath: "commentsApi",
    reducer: jest.fn(),
    middleware: jest.fn(),
  },
}));

jest.mock("./slices/authSlice", () => jest.fn(() => ({})));
jest.mock("./slices/postDataSlice", () => jest.fn(() => ({})));

jest.mock("@reduxjs/toolkit", () => ({
  ...jest.requireActual("@reduxjs/toolkit"),
  configureStore: jest.fn(
    jest.requireActual("@reduxjs/toolkit").configureStore
  ),
  combineReducers: jest.fn(
    jest.requireActual("@reduxjs/toolkit").combineReducers
  ),
}));

jest.mock("redux-persist", () => ({
  persistReducer: jest.fn((config, reducer) => reducer), // Mock persistReducer to return the base reducer for simplicity in tests
  persistStore: jest.fn(() => ({})), // Mock persistStore
}));

jest.mock("@reduxjs/toolkit/query", () => ({
  setupListeners: jest.fn(),
}));

describe("Redux Store Configuration", () => {
  it("configures the root reducer correctly with all slices and APIs", () => {
    const combinedReducersResult = rootReducer({});
    expect(combinedReducersResult).toHaveProperty("postsData");
    expect(combinedReducersResult).toHaveProperty("authData");
    expect(combinedReducersResult).toHaveProperty("postsApi");
    expect(combinedReducersResult).toHaveProperty("commentsApi");
  });

  it("uses AsyncStorage for persistence configuration", () => {
    expect(persistReducer).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "root",
        storage: AsyncStorage,
        whitelist: expect.arrayContaining([
          "postsApi",
          "commentsApi",
          "postsData",
          "authData",
        ]),
      }),
      expect.any(Function) // the rootReducer
    );
  });

  it("configures the store with correct middleware and serializability checks", () => {
    const storeConfig = (configureStore as jest.Mock).mock.calls[0][0];

    expect(store).toBeDefined();

    expect(setupListeners).toHaveBeenCalledWith(store.dispatch);
  });

  it("exports the persistor instance", () => {
    expect(persistor).toBeDefined();
    expect(persistStore).toHaveBeenCalledWith(store);
  });
});
