import { Dispatch, SetStateAction } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "semantic-ui-react"
import { changeLikeToDatabase, updateUserDatabase } from "../functions/database"
import { RootState } from "../store"
import { deleteTmpData, updateUser } from "../store/auth/authReducer"
import { DATA_DATABASE } from "../types/type"

export const LikeComponent = ({
  val,
  currentLikeList,
  setCurrentLikeList,
}: {
  val: DATA_DATABASE
  currentLikeList: { id: string; one: boolean }[]
  setCurrentLikeList: Dispatch<SetStateAction<{ id: string; one: boolean }[]>>
}) => {
  const dispath = useDispatch()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const checkObj = (
    arr: { id: string; one: boolean }[],
    key: "id" | "one",
    val: string | boolean
  ) => arr.find((obj) => obj[key] === val)

  const likeCnt = (val: DATA_DATABASE) => {
    const obj = checkObj(
      currentLikeList,
      "id",
      val.kotoKey + "-" + val.dataKey
    ) as undefined | { id: string; one: boolean }
    if (obj) {
      if (obj["one"]) {
        return 1
      } else {
        return -1
      }
    } else {
      return 0
    }
  }

  return (
    <Button
      color="pink"
      floated="right"
      onClick={async () => {
        if (currentUser) {
          if (currentUser.userId !== val.byUserId) {
            dispath(deleteTmpData(val))
            let newList = [] as string[]
            const key = val.kotoKey + "-" + val.dataKey
            if (currentUser.likeList) {
              newList = currentUser.likeList.slice()
              if (currentUser.likeList.includes(key)) {
                if (checkObj(currentLikeList, "one", true)) {
                  newList = newList.filter((val) => val !== key)
                  dispath(updateUser({ ...currentUser, likeList: newList }))
                  updateUserDatabase({ ...currentUser, likeList: newList })
                  changeLikeToDatabase(val.kotoKey!, val.dataKey!, val.like!)
                  setCurrentLikeList((prev) =>
                    prev.filter((val) => val.id !== key)
                  )
                } else {
                  newList = newList.filter((val) => val !== key)
                  dispath(updateUser({ ...currentUser, likeList: newList }))
                  updateUserDatabase({ ...currentUser, likeList: newList })
                  changeLikeToDatabase(
                    val.kotoKey!,
                    val.dataKey!,
                    val.like! - 1
                  )
                  setCurrentLikeList((prev) => {
                    prev.push({ id: key, one: false })
                    return prev
                  })
                }
              } else {
                if (checkObj(currentLikeList, "one", false)) {
                  newList.push(key)
                  dispath(updateUser({ ...currentUser, likeList: newList }))
                  updateUserDatabase({ ...currentUser, likeList: newList })
                  changeLikeToDatabase(val.kotoKey!, val.dataKey!, val.like!)
                  setCurrentLikeList((prev) =>
                    prev.filter((val) => val.id !== key)
                  )
                } else {
                  newList.push(key)
                  dispath(updateUser({ ...currentUser, likeList: newList }))
                  updateUserDatabase({ ...currentUser, likeList: newList })
                  changeLikeToDatabase(
                    val.kotoKey!,
                    val.dataKey!,
                    val.like! + 1
                  )
                  setCurrentLikeList((prev) => {
                    prev.push({ id: key, one: true })
                    return prev
                  })
                }
              }
            } else {
              newList.push(key)
              dispath(updateUser({ ...currentUser, likeList: newList }))
              updateUserDatabase({ ...currentUser, likeList: newList })
              changeLikeToDatabase(val.kotoKey!, val.dataKey!, val.like! + 1)
              setCurrentLikeList((prev) => {
                prev.push({ id: key, one: true })
                return prev
              })
            }
          }
        } else {
          alert("ユーザー登録が必要です")
        }
      }}
    >
      <i
        className="heart icon"
        style={{
          color:
            currentUser?.likeList &&
            currentUser.likeList.includes(val.kotoKey + "-" + val.dataKey)
              ? "#c4302b"
              : "white",
        }}
      ></i>
      <label color="pink">{(val.like! + likeCnt(val)) as number}</label>
    </Button>
  )
}
