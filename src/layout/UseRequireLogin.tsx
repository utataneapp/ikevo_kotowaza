import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { logInUser } from "../store/auth/authReducer"
import { openModal } from "../store/modal/modalReducer"

export default function UseRequireLogin() {
  const router = useRouter()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const authentificated = useSelector(
    (state: RootState) => state.auth.authentificated
  )
  const dispatch = useDispatch()

  //   useEffect(() => {
  //     if (authentificated) {
  //       dispatch(logInUser({ ...currentUser }))
  //       router.push("/home")
  //     } else {
  //       dispatch(openModal({ modalTypes: "LoginForm", modalProps: {} }))
  //       router.push("/home")
  //     }
  //   }, [])

  return null
}
