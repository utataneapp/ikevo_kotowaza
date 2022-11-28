import { useRouter } from "next/router"
import { SetStateAction } from "react"
import { useDispatch } from "react-redux"
import { Button, Dropdown, Menu } from "semantic-ui-react"
import { logInUser } from "../../store/auth/authReducer"
import { openModal } from "../../store/modal/modalReducer"

export default function LogedOutMenu({ mobile }: { mobile: boolean }) {
  const router = useRouter()
  const dispatch = useDispatch()
  return mobile ? (
    <Menu.Item position="right">
      <Dropdown pointing="top right" icon="bars">
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() =>
              dispatch(openModal({ modalTypes: "LoginForm", modalProps: {} }))
            }
            text="ログイン"
            icon="sign in alternate"
          />
          <Dropdown.Item
            onClick={() =>
              dispatch(
                openModal({ modalTypes: "RegistrationForm", modalProps: {} })
              )
            }
            text="登録"
            icon="user"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  ) : (
    <Menu.Item position="right">
      <Button
        onClick={() =>
          dispatch(openModal({ modalTypes: "LoginForm", modalProps: {} }))
        }
        basic
        inverted
        content="ログイン"
      />
      <Button
        basic
        inverted
        content="登録"
        style={{ marginLeft: "0.5em" }}
        onClick={() =>
          dispatch(
            openModal({ modalTypes: "RegistrationForm", modalProps: {} })
          )
        }
      />
    </Menu.Item>
  )
}
