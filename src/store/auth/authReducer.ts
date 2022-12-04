import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { DATA_DATABASE } from "../../types/type"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authentificated: false,
    tmpData: [] as DATA_DATABASE[],
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
    reflectInTmpData: (state, aciton: PayloadAction<DATA_DATABASE[]>) => {
      const newTemData = [
        ...aciton.payload,
        ...state.tmpData,
      ] as DATA_DATABASE[]
      // 重複を削除(インデックスが若い値を残す)
      const result = newTemData.filter(
        (val, i, self) =>
          self.findIndex(
            (e) => e.kotoKey === val.kotoKey && e.dataKey === val.dataKey
          ) === i
      )
      return {
        ...state,
        tmpData: result,
      }
    },
    deleteTmpData: (state, aciton: PayloadAction<DATA_DATABASE>) => {
      return {
        ...state,
        tmpData: state.tmpData.filter(
          (obj) =>
            obj.kotoKey + "-" + obj.dataKey !==
              aciton.payload.kotoKey + "-" + aciton.payload.dataKey && obj
        ),
      }
    },
  },
})

export const {
  signInUser,
  logInUser,
  logOutUser,
  updateUser,
  reflectInTmpData,
  deleteTmpData,
} = authSlice.actions
export default authSlice.reducer
