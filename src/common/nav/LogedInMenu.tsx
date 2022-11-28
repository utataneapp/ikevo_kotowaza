import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { Dropdown, Image, Menu } from "semantic-ui-react"
import { RootState } from "../../store"
import { logOutUser } from "../../store/auth/authReducer"
import { openModal } from "../../store/modal/modalReducer"

export default function LogedInMenu({ mobile }: { mobile: boolean }) {
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
            onClick={() => router.push("/mypage")}
            text="マイページ"
            icon="user circle"
          />

          {mobile && (
            <Dropdown.Item
              onClick={() => router.push("/like")}
              text="お気に入り"
              icon="star outline"
            />
          )}
          {mobile && (
            <Dropdown.Item
              onClick={() => router.push("/home")}
              text="ホーム"
              icon="home"
            />
          )}
          <Dropdown.Item
            onClick={() => {
              const result = confirm("ログアウトしますか？")
              if (result) {
                dispatch(logOutUser())
                router.replace("/home")
              }
            }}
            text="ログアウト"
            icon="sign out alternate"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}
