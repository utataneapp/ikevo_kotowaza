export const kotowazaData = [
  {
    dataId: "1",
    kotowaza: "犬も歩けば棒に当たる",
    createdAt: new Date("2022-01-01"),
    desc: "渾身の一撃",
    hostedBy: "id",
    //「いいね」は最新5名まで表示予定 「いいね」をした時のID、名前、登録画像を表示（データ通信の節約）
    like: [
      {
        userId: "c",
        userName: "ドトール",
        userPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
      {
        userId: "d",
        userName: "エクセルシオール",
        userPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
    ],
  },

  {
    dataId: "1",
    kotowaza: "犬も歩けば棒に当たる",
    createdAt: new Date("2022-01-01"),
    desc: "渾身の一撃",
    hostedBy: "id",
    //「いいね」は最新5名まで表示予定 「いいね」をした時のID、名前、登録画像を表示（データ通信の節約）
    like: [
      {
        userId: "c",
        userName: "ドトール",
        userPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
      {
        userId: "d",
        userName: "エクセルシオール",
        userPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
    ],
  },
]

export const user = [
  {
    userId: "a",
    userName: "",
  },
]

//id取得のために必要
export const kotowazaCnt = [
  {
    kotowaza: "犬も歩けば棒に当たる",
    idCnt: 5,
  },
  { kotowaza: "失敗は成功の基", idCnt: 1 },
]
