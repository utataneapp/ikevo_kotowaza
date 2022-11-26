import { auth, firestore } from "../../pages/_app"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { translateErrors } from "./lib"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { DATA_FIRESTORE, TO_DATA_FIRESTORE } from "../types/type"

//auth

export const registerForAuthAndReturnId = async (
  email: string,
  password: string
) => {
  let userId = ""
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((err) => {
      const msg = translateErrors(err.code).description
      alert(msg)
      return
    })
    const user = userCredential!.user
    userId = user.uid
  } catch {}
  return userId
}

export const logInForAuth = async (email: string, password: string) => {
  let userId = ""
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((err) => {
      const msg = translateErrors(err.code).description
      alert(msg)
      return
    })
    const user = userCredential!.user
    userId = user.uid
  } catch {}
  return userId
}

//firestore

export const getDataFromFirestore = async () => {
  let displayed = [{}] as DATA_FIRESTORE[]
  const docRef = doc(firestore, "data", "data")
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    displayed = (await docSnap.data()["displayed"]) as DATA_FIRESTORE[]
  }
  return displayed
}

export const writeDataToFirestore = async ({
  kotoKey,
  dataKey,
}: TO_DATA_FIRESTORE) => {
  let nowData = await getDataFromFirestore().catch(() => [] as DATA_FIRESTORE[])
  const collectionRef = collection(firestore, "data")
  const newData = { id: kotoKey + "-" + dataKey, kotoKey }
  if (nowData) {
    nowData.push(newData)
  }
  await setDoc(
    doc(collectionRef, `data`),
    {
      displayed: nowData,
    },
    { merge: true }
  )
}

export const deleteDataToFirestore = async ({
  kotoKey,
  dataKey,
}: TO_DATA_FIRESTORE) => {
  let nowData = await getDataFromFirestore().catch(() => [] as DATA_FIRESTORE[])
  let newData = [] as DATA_FIRESTORE[]
  const collectionRef = collection(firestore, "data")
  newData = nowData.filter((val) => val.id !== kotoKey + "-" + dataKey)
  await setDoc(
    doc(collectionRef, `data`),
    {
      displayed: newData,
    },
    { merge: true }
  )
}
