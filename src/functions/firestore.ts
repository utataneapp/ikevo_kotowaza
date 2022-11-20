import { auth } from "../../pages/_app"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { useRouter } from "next/router"
import { translateErrors } from "./lib"

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
