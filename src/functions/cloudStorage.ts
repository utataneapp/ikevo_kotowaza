import { PayloadAction } from "@reduxjs/toolkit"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { SetStateAction } from "react"
import { storage } from "../../pages/_app"
import { nowDate } from "./lib"

export const uploadDataAndReturnPath = (
  kotowaza: string,
  userId: string,
  file: Blob[]
) => {
  const storageRef = ref(
    storage,
    kotowaza + "/" + new Date() + " " + userId + ".mp3"
  )

  const metadata = {
    contentType: "audio/mp3",
  }
  uploadBytes(storageRef, new Blob(file), metadata).then((snapshot) => {})
  return storageRef.name
}

export const getVoiceUrl = async (kotowaza: string, fileName: string) => {
  let targetUrl = ""
  const storageRef = ref(storage, kotowaza + "/" + fileName)
  await getDownloadURL(storageRef).then((url) => {
    targetUrl = url
  })
  return targetUrl
}
