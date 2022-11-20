import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Button } from "semantic-ui-react"
import { useDispatch } from "react-redux"
import { signInUser } from "../../store/auth/authReducer"
import ModalWrapper from "../modals/ModalWrapper"
import { closeModal } from "../../store/modal/modalReducer"
import MyTextInput from "./MyTextInput"
import { logInForAuth } from "../../functions/firestore"
import { useRouter } from "next/router"

export default function LoginForm() {
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <ModalWrapper size="mini" header="ログインする">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().required(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const userId = await logInForAuth(values.email, values.password)
          if (userId) {
            alert("ログインに成功しました")
            dispatch(signInUser(values))
            router.push("/voice")
            setSubmitting(false)
            dispatch(closeModal())
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, values }) => (
          <Form className="ui form">
            <MyTextInput name="email" placeholder="メールアドレス" />
            <MyTextInput
              name="password"
              placeholder="パスワード(7文字以上)"
              type="password"
            />
            <Button
              loading={isSubmitting}
              disabled={
                !isValid ||
                !dirty ||
                isSubmitting ||
                values.password.length <= 6
              }
              type="submit"
              size="large"
              color="teal"
              content="ログイン"
            ></Button>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}
