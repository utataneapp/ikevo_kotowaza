import { child, ref, set, get, update, remove } from "firebase/database"
import moment from "moment"
import { number, string } from "yup"
import { database } from "../../pages/_app"
import { DATA_DATABASE, USER_DATABASE } from "../types/type"
import { nowDate } from "./lib"

export const writeUserToDatabase = ({
  userId,
  userName,
  email,
  sex,
  age,
  photoUrl,
  voiceCnt,
  myVoice: [],
  likeList: [],
  createdAt,
}: USER_DATABASE) => {
  set(ref(database, "users/" + userId + "/"), {
    userName,
    email,
    sex,
    age,
    photoUrl,
    voiceCnt,
    myVoice: [],
    likeList: [],
    createdAt,
  })
}

export const updateUserDatabase = ({
  userId,
  userName,
  email,
  sex,
  age,
  photoUrl,
  voiceCnt,
  myVoice,
  likeList,
  createdAt,
}: USER_DATABASE) => {
  // undefinedの可能性があるため
  const newMyVoice = myVoice ? myVoice : []
  set(ref(database, "users/" + userId + "/"), {
    userName,
    email,
    sex,
    age,
    photoUrl,
    voiceCnt,
    myVoice: newMyVoice,
    likeList,
    createdAt,
  })
}

export const getUserFromDatabase = async (userId: string) => {
  let data = null as USER_DATABASE | null
  const dbRef = ref(database)
  await get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val()
      } else {
      }
    })
    .catch(() => {
      alert("予期せぬエラーが発生しました")
    })
  return data
}

export const writeDataToDatabase = ({
  userId,
  userName,
  kotoKey,
  dataKey,
  voiceUrl,
  desc,
  ios,
}: DATA_DATABASE) => {
  set(ref(database, `data/${kotoKey}/${dataKey}`), {
    voiceUrl,
    userName,
    kotoKey,
    desc,
    dataKey,
    createdAt: nowDate(),
    like: 0,
    byUserId: userId,
    ios,
  })
}

export const writeDataToDatabaseForDelete = ({
  byUserId,
  voiceUrl,
  kotoKey,
  dataKey,
  desc,
  like,
  createdAt,
}: DATA_DATABASE) => {
  set(ref(database, `deletedData/${kotoKey}/${dataKey}`), {
    byUserId,
    voiceUrl,
    kotoKey,
    dataKey,
    desc,
    like,
    createdAt,
    deletedAt: nowDate(),
  })
}

export const getDataFromDatabase = async (
  keyArray: string[],
  tmpData: DATA_DATABASE[]
) => {
  const dbRef = ref(database)
  let dataArray = [] as DATA_DATABASE[]
  keyArray &&
    (await Promise.all(
      keyArray.map(async (val) => {
        if (val) {
          const kotoKey = val.substring(0, val.indexOf("-"))
          const dataKey = val.substring(val.indexOf("-") + 1)
          // tmpDataにある場合はそちらから取得する
          const isTmpData = tmpData.find(
            (obj) => obj.kotoKey + "-" + obj.dataKey === val
          )
          if (isTmpData) {
            dataArray.unshift(isTmpData)
          } else {
            await get(child(dbRef, `data/${kotoKey}/${dataKey}`)).then(
              (snapshot) => {
                if (snapshot.exists()) {
                  dataArray.unshift(snapshot.val())
                }
              }
            )
          }
        }
      })
    ))
  return dataArray
}

export const getOneDataFromDatabase = async ({
  kotoKey,
  dataKey,
}: {
  kotoKey: number
  dataKey: number
}) => {
  const dbRef = ref(database)
  const data = await get(child(dbRef, `data/${kotoKey}/${dataKey}`)).then(
    (snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      }
    }
  )
  return data
}

export const deleteDataToDatabase = async ({
  userId,
  kotoKey,
  dataKey,
}: {
  userId: string
  kotoKey: number
  dataKey: number
}) => {
  // 削除するデータの中身を取得
  const deletedData = (await getOneDataFromDatabase({
    kotoKey,
    dataKey,
  })) as DATA_DATABASE
  console.log(deletedData)
  const { byUserId, voiceUrl, desc, like, createdAt } = deletedData
  const kotoKeyFromDatabase = deletedData.kotoKey
  const dataKeyFromDatabase = deletedData.dataKey
  // 削除するデータを削除用データベースに追加
  writeDataToDatabaseForDelete({
    byUserId,
    voiceUrl,
    kotoKey: kotoKeyFromDatabase,
    dataKey: dataKeyFromDatabase,
    desc,
    like,
    createdAt,
  })
  // データベースから削除
  remove(ref(database, `data/${kotoKey}/${dataKey}`))
}

export const getKeyCntFromDatabase = async (key: number) => {
  const dbRef = ref(database)
  let cnt = 0
  await get(child(dbRef, `kotowazaKeyCnt/${key}`)).then((snapshot) => {
    if (snapshot.exists()) {
      cnt = snapshot.val()
    } else {
    }
  })
  return cnt
}

export const writeFirstKotoKeyCntToDatabase = (key: number) => {
  set(ref(database, `kotowazaKeyCnt/${key}/`), 1)
}

export const writeKotoKeyCntToDatabase = (key: number, cnt: number) => {
  set(ref(database, `kotowazaKeyCnt/${key}/`), cnt + 1)
}

export const changeLikeToDatabase = (
  kotoKey: number,
  dataKey: number,
  newLike: number
) => {
  update(ref(database, "data/" + kotoKey + "/" + dataKey + "/"), {
    like: newLike,
  })
}
