import { configureStore } from "@reduxjs/toolkit"
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import AuthReducer from "./auth/authReducer"
import ModalReducer from "./modal/modalReducer"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    modals: ModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignoredPaths: [``],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
