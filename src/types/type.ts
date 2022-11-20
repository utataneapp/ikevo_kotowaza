export type USER_DATABASE = {
  userId: string
  userName: string
  sex: "男" | "女" | "無回答"
  age: "10代" | "20代" | "30代" | "40代" | "50代" | "60代" | "70歳以上"
  photoUrl: string
  voiceCnt: number
  createdAt: Date
  like?: string[]
}

export type KOTOWAZA_LIST = {
  key: Number
  text: String
  value: String
  reading: String
}[]
