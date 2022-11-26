import { useDispatch, useSelector } from "react-redux"
import { Button } from "semantic-ui-react"
import { deleteDataToDatabase, updateUserDatabase } from "../functions/database"
import { deleteDataToFirestore } from "../functions/firestore"
import { RootState } from "../store"
import { updateUser } from "../store/auth/authReducer"
import { DATA_DATABASE } from "../types/type"

export default function DeleteButton({ val }: { val: DATA_DATABASE }) {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  return (
    <Button
      floated="right"
      onClick={async () => {
        const result = window.confirm("削除しますか？")
        if (result) {
          await deleteDataToDatabase({
            userId: currentUser!.userId,
            kotoKey: val.kotoKey!,
            dataKey: val.dataKey!,
          })
          let newMyVoice = [] as string[]
          if (newMyVoice) {
            newMyVoice = currentUser!.myVoice.filter(
              (str) => str !== val.kotoKey + "-" + val.dataKey
            )
          }
          let newLikeList = [] as string[]
          if (currentUser?.likeList) {
            newLikeList = currentUser!.likeList.filter(
              (str) => str !== val.kotoKey + "-" + val.dataKey
            )
          }
          const voiceCnt = currentUser!.voiceCnt
          await deleteDataToFirestore({
            kotoKey: val.kotoKey!,
            dataKey: val.dataKey!,
          })
          updateUserDatabase({
            ...currentUser!,
            voiceCnt: voiceCnt - 1,
            myVoice: newMyVoice!,
            likeList: newLikeList,
          })

          dispatch(
            updateUser({
              ...currentUser!,
              voiceCnt: voiceCnt - 1,
              likeList: newLikeList!,
              myVoice: newMyVoice!,
            })
          )
        }
      }}
    >
      <i className="trash icon"></i>
    </Button>
  )
}
