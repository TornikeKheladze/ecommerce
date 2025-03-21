import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import favouritesSlice from "./favouritesSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { mmkvStorage } from "./storage";

const persistConfig = {
  key: "root",
  storage: mmkvStorage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);
const persistedProductReducer = persistReducer(persistConfig, productSlice);
const persistedFavReducer = persistReducer(persistConfig, favouritesSlice);

export const store = configureStore({
  reducer: {
    users: persistedUserReducer,
    products: persistedProductReducer,
    favourites: persistedFavReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
