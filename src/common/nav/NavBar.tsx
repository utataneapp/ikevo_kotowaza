import { useDispatch, useSelector } from "react-redux"
import { Menu, Button } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import { RootState } from "../../store"
import SignedInMenu from "./SignedInMenu"
import SignedOutMenu from "./SignedOutMenu"
import { openModal } from "../../store/modal/modalReducer"
import { useRouter } from "next/router"

export default function NavBar() {
  const { authentificated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <Menu fixed="top">
      <Menu.Item exact to="/" header>
        <img src="icon.png" alt="logo" style={{ marginRight: 15 }} />
        イケボことわざ
      </Menu.Item>
      <Menu.Item
        content="ホーム"
        onClick={() => router.push("/voice")}
      ></Menu.Item>
      <Menu.Item content="ランキング" onClick={() => router.push("/ranking")} />
      {authentificated && (
        <Menu.Item content="お気に入り" onClick={() => router.push("/like")} />
      )}
      {authentificated && (
        <Menu.Item
          content="マイページ"
          onClick={() => router.push("/myPage")}
        />
      )}
      {authentificated && (
        <Menu.Item>
          <Button
            color="black"
            content="音声を投稿"
            onClick={() =>
              dispatch(
                openModal({ modalTypes: "VoicePostForm", modalProps: {} })
              )
            }
          />
        </Menu.Item>
      )}
      {authentificated ? <SignedInMenu /> : <SignedOutMenu />}
    </Menu>
  )
}
