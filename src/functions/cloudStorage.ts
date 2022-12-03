import { getDownloadURL, ref, uploadBytes, getBlob } from "firebase/storage"
import { storage } from "../../pages/_app"

type Recording = {
  ts: number
  blobUrl: string
  mimeType: string
  size: number
}

const getFileBlob = function (url: string, cb: any) {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", url)
  xhr.responseType = "blob"
  xhr.addEventListener("load", function () {
    cb(xhr.response)
  })
  xhr.send()
}

export const uploadDataAndReturnPath = (
  kotowaza: string,
  userId: string,
  file: Recording[]
) => {
  const storageRef = ref(
    storage,
    kotowaza + "/" + new Date() + " " + userId + ".mp3"
  )
  file[0]

  const metadata = {
    contentType: "audio/mp3",
  }
  getFileBlob(file[0].blobUrl, (blob: any) => {
    uploadBytes(storageRef, blob, metadata).then(() => {})
  })

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
