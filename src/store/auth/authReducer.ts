import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { DATA_DATABASE } from "../../types/type"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authentificated: false,
    tmpData: [],
    currentUser: null as null | {
      userId: string
      userName: string
      email: string
      sex: "男" | "女" | "無回答"
      age: "10代" | "20代" | "30代" | "40代" | "50代" | "60代" | "70歳以上"
      //初期値
      photoUrl: string
      myVoice: string[]
      likeList: string[]
      voiceCnt: number
      createdAt: string
    },
  },

  reducers: {
    signInUser: (
      state,
      action: PayloadAction<{
        userId: string
        userName: string
        email: string
        sex: "男" | "女" | "無回答"
        age: "10代" | "20代" | "30代" | "40代" | "50代" | "60代" | "70歳以上"
        //初期値
        photoUrl: string
        myVoice: string[]
        voiceCnt: number
        likeList: string[]
        createdAt: string
      }>
    ) => {
      return {
        ...state,
        authentificated: true,
        currentUser: {
          ...action.payload,
        },
      }
    },
    logInUser: (state, action) => {
      return {
        ...state,
        authentificated: true,
        currentUser: {
          ...action.payload,
        },
      }
    },
    logOutUser: (state) => {
      return {
        ...state,
        authentificated: false,
        currentUser: null,
      }
    },
    updateUser: (
      state,
      action: PayloadAction<{
        userId: string
        userName: string
        email: string
        sex: "男" | "女" | "無回答"
        age: "10代" | "20代" | "30代" | "40代" | "50代" | "60代" | "70歳以上"
        photoUrl: string
        myVoice: string[]
        voiceCnt: number
        likeList: string[]
        createdAt: string
      }>
    ) => {
      return {
        ...state,
        currentUser: {
          ...action.payload,
        },
      }
    },
    refrectInTmpData: (state, aciton: PayloadAction<DATA_DATABASE[]>) => {
      return {
        ...state,
      }
    },
  },
})

export const {
  signInUser,
  logInUser,
  logOutUser,
  updateUser,
  refrectInTmpData,
} = authSlice.actions
export default authSlice.reducer
