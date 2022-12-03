import { number } from "yup"

export type USER_DATABASE = {
  userId?: string
  userName: string
  email: string
  sex: "男" | "女" | "無回答"
  age: "10代" | "20代" | "30代" | "40代" | "50代" | "60代" | "70歳以上"
  photoUrl: string
  // kotowazaKey + dataKey
  myVoice: string[]
  voiceCnt: number
  // kotowazaKey + dataKey
  likeList: string[]
  createdAt: string
  updatedAt?: string
}

export type DATA_DATABASE = {
  kotoKey?: number
  dataKey?: number
  userId?: string
  userName?: string
  photoUrl?: string
  byUserId?: string
  voiceUrl: string
  desc: string
  createdAt?: string
  updatedAt?: string
  like?: number
  ios?: boolean
}

export type KOTOWAZA_DATABASE = {
  key?: number
  content: string
  cnt: number
}

export type USER_FIRESTORE = {
  userId?: string
  likeKey: string[]
  myVoice: string[]
}

export type DATA_FIRESTORE = {
  id: string
  kotoKey: number
}

export type TO_DATA_FIRESTORE = {
  kotoKey: number
  dataKey: number
}

export type KOTOWAZA_LIST = {
  key: Number
  text: String
  value: String
  reading: String
}
