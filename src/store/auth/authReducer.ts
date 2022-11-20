import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authentificated: false,
    currentUser: null as null | { email: string; photoUrl: string },
  },

  reducers: {
    signInUser: (
      state,
      action: PayloadAction<{
        email: string
        password: string
      }>
    ) => {
      return {
        ...state,
        authentificated: true,
        currentUser: {
          email: action.payload.email,
          photoUrl: "./assets/user.png",
        },
      }
    },
    signOutUser: (state) => {
      return {
        ...state,
        authentificated: false,
        currentUser: null,
      }
    },
  },
})

export const { signInUser, signOutUser } = authSlice.actions
export default authSlice.reducer
