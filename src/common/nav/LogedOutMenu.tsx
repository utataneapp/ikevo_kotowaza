import { SetStateAction } from "react"
import { useDispatch } from "react-redux"
import { Button, Menu } from "semantic-ui-react"
import { openModal } from "../../store/modal/modalReducer"

export default function LogedOutMenu() {
  const dispatch = useDispatch()
  return (
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
