import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { Route } from "react-router-dom"
import { Dropdown, Image, Menu } from "semantic-ui-react"
import { displayId } from "../../functions/lib"
import { RootState } from "../../store"
import { logOutUser } from "../../store/auth/authReducer"
import { openModal } from "../../store/modal/modalReducer"

export default function LogedInMenu() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { currentUser } = useSelector((state: RootState) => state.auth)
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={"user.png"} />
      <Dropdown pointing="top left" text={currentUser?.email}>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() =>
              dispatch(
                openModal({ modalTypes: "VoicePostForm", modalProps: {} })
              )
            }
            text="音声を投稿"
            icon="plus"
          />
          <Dropdown.Item
            onClick={() => router.push("/myPage")}
            text="マイページ"
            icon="user"
          />
          <Dropdown.Item
            onClick={() => {
              dispatch(logOutUser())
              router.replace("/home")
            }}
            text="ログアウト"
            icon="power"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}
