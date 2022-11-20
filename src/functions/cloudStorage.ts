import { ref, uploadBytes } from "firebase/storage"
import { storage } from "../../pages/_app"

export const uploadDataAndReturnPath = (
  kotowaza: string,
  userId: string,
  file: Blob[]
) => {
  const storageRef = ref(storage, kotowaza + "/" + new Date() + userId + ".mp3")

  const metadata = {
    contentType: "audio/mp3",
  }
  uploadBytes(storageRef, new Blob(file), metadata).then((snapshot) => {
    alert("音声の投稿が完了しました")
  })
  return storageRef.name
}
