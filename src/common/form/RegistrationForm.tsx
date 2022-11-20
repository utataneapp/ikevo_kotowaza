import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Button, Dropdown } from "semantic-ui-react"
import { useDispatch } from "react-redux"
import { signInUser } from "../../store/auth/authReducer"
import ModalWrapper from "../modals/ModalWrapper"
import { closeModal } from "../../store/modal/modalReducer"
import MyTextInput from "./MyTextInput"
import { registerForAuthAndReturnId } from "../../functions/firestore"
import { SyntheticEvent } from "react"
import { ageList, sexList } from "../../../pages/api/dropdownList"
import { writeUserData } from "../../functions/database"
import { translateErrors } from "../../functions/lib"

export default function RegistrationForm() {
  const dispatch = useDispatch()

  return (
    <ModalWrapper size="mini" header="登録する">
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
          sex: "" as "男" | "女" | "無回答",
          age: "" as
            | "10代"
            | "20代"
            | "30代"
            | "40代"
            | "50代"
            | "60代"
            | "70歳以上",
        }}
        validationSchema={Yup.object({
          userName: Yup.string().required(),
          email: Yup.string().required(),
          password: Yup.string().required(),
          sex: Yup.string().required(),
          age: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false)
          let userId = ""
          //auth
          try {
            userId = await registerForAuthAndReturnId(
              values.email,
              values.password
            )
          } catch {
            alert("アカウント登録に失敗しました")
          }
          if (userId) {
            //database
            writeUserData({
              userId,
              userName: values.userName,
              sex: values.sex,
              age: values.age,
              //初期値
              photoUrl: "",
              voiceCnt: 0,
              createdAt: new Date(),
            })
            dispatch(signInUser(values))
            alert("アカウント登録に成功しました")
            dispatch(closeModal())
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, values, setFieldValue }) => (
          <Form className="ui form">
            <label style={{ color: "gray" }}>ユーザー名</label>
            <MyTextInput
              name="userName"
              placeholder="ユーザー名"
              maxLength={20}
            />
            <label style={{ color: "gray" }}>メールアドレス</label>
            <MyTextInput
              name="email"
              placeholder="メールアドレス"
              maxLength={50}
            />
            <label style={{ color: "gray" }}>
              パスワード（7文字以上20文字以下）
            </label>
            <MyTextInput
              name="password"
              placeholder="パスワード"
              type="password"
              maxLength={20}
            />
            <label style={{ color: "gray" }}>性別</label>

            <Dropdown
              placeholder="性別"
              fluid
              onChange={(_: SyntheticEvent<HTMLElement, Event>, data) =>
                setFieldValue("sex", data.value)
              }
              selection
              options={sexList}
            ></Dropdown>
            <div style={{ height: 16 }}></div>
            <label style={{ color: "gray" }}>年代</label>
            <Dropdown
              placeholder="年代"
              fluid
              onChange={(_: SyntheticEvent<HTMLElement, Event>, data) =>
                setFieldValue("age", data.value)
              }
              selection
              options={ageList}
            ></Dropdown>
            <div style={{ height: 16 }}></div>
            <Button
              loading={isSubmitting}
              disabled={
                !isValid || !dirty || isSubmitting || values.password.length < 7
              }
              type="submit"
              size="large"
              color="teal"
              content="登録"
            ></Button>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}
