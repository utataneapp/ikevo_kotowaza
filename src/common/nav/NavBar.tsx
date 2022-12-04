import { useDispatch, useSelector } from "react-redux"
import { Menu, Button, Grid } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import { RootState } from "../../store"
import { openModal } from "../../store/modal/modalReducer"
import { useRouter } from "next/router"
import LogedInMenu from "./LogedInMenu"
import LogedOutMenu from "./LogedOutMenu"

export default function NavBar() {
  const { authentificated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <Grid>
      <Grid.Row only="mobile">
        <Menu fixed="top">
          <Menu.Item onClick={() => router.push("/home")} header>
            <img src="icon.png" alt="logo" style={{ marginRight: 15 }} />
            イケボことわざ
          </Menu.Item>

          {authentificated ? (
            <LogedInMenu mobile={true} />
          ) : (
            <LogedOutMenu mobile={true} />
          )}
        </Menu>
      </Grid.Row>
      <Grid.Row only="tablet computer">
        <Grid.Column>
          <Menu fixed="top">
            <Menu.Item onClick={() => router.push("/home")} header>
              <img src="icon.png" alt="logo" style={{ marginRight: 15 }} />
              イケボことわざ
            </Menu.Item>
            <Menu.Item
              content="ホーム"
              onClick={() => router.push("/home")}
            ></Menu.Item>
            {/* <Menu.Item content="投稿完了" onClick={() => router.push("/completed")} /> */}
            {authentificated && (
              <Menu.Item
                content="お気に入り"
                onClick={() => router.push("/favorite")}
              />
            )}
            {authentificated && (
              <Menu.Item
                content="マイページ"
                onClick={() => router.push("/mypage")}
              />
            )}
            {authentificated && (
              <Menu.Item>
                <Button
                  inverted
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
            {authentificated ? (
              <LogedInMenu mobile={false} />
            ) : (
              <LogedOutMenu mobile={false} />
            )}
          </Menu>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
