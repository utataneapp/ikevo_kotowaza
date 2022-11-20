import { ref, set } from "firebase/database"
import { database } from "../../pages/_app"
import { USER_DATABASE } from "../types/type"

export const writeUserData = ({
  userId,
  userName,
  sex,
  age,
  photoUrl,
  voiceCnt,
  like,
  createdAt,
}: USER_DATABASE) => {
  alert(userId)
  set(ref(database, "users/" + userId + "/"), {
    userName,
    sex,
    age,
    photoUrl,
    voiceCnt,
    like,
    createdAt,
  })
}
