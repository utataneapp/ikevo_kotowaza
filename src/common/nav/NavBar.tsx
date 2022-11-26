import { useDispatch, useSelector } from "react-redux"
import { Menu, Button } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import { RootState } from "../../store"

import { openModal } from "../../store/modal/modalReducer"
import { useRouter } from "next/router"
import LogedInMenu from "./LogedInMenu"
import LogedOutMenu from "./LogedOutMenu"
import { useState } from "react"

export default function NavBar() {
  const { authentificated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <Menu fixed="top">
      <Menu.Item to="/" header>
        <img src="icon.png" alt="logo" style={{ marginRight: 15 }} />
        イケボことわざ
      </Menu.Item>
      <Menu.Item
        content="ホーム"
        onClick={() => router.push("/home")}
      ></Menu.Item>
      {/* <Menu.Item content="投稿完了" onClick={() => router.push("/completed")} /> */}
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
                openModal({
                  modalTypes: "VoicePostForm",
                  modalProps: {},
                })
              )
            }
          />
        </Menu.Item>
      )}
      {authentificated ? <LogedInMenu /> : <LogedOutMenu />}
    </Menu>
  )
}
