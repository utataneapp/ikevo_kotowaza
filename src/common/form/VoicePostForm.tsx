import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Button, Dropdown, Grid, Item } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import { useDispatch } from "react-redux"
import ModalWrapper from "../modals/ModalWrapper"
import { closeModal } from "../../store/modal/modalReducer"
import Record from "../../components/Record"
import MyTextArea from "./MyTextArea"
import { SyntheticEvent, useState } from "react"
import { uploadDataAndReturnPath } from "../../functions/cloudStorage"
import { kotowazaList } from "../../../pages/api/dropDownList"

export default function VoicePostForm() {
  const dispatch = useDispatch()
  const targetReading = (val: string) =>
    kotowazaList.map((obj) => obj.value == val && obj.reading)
  const [file, setFile] = useState<Blob[]>([])
  const [loadingFlag, setLoadingFlag] = useState(false)

  return (
    <ModalWrapper size="mini" header="音声を投稿する（最大9秒）">
      <Formik
        initialValues={{ kotowaza: "", desc: "", pathName: "" }}
        validationSchema={Yup.object({
          kotowaza: Yup.string().required(),
        })}
        onSubmit={() => {}}
        //　Record内のonClickに反応してsubmitされてしまう

        // onSubmit={(values, { setSubmitting, setFieldValue }) => {
        //   setSubmitting(true)
        //   const pathName = uploadDataAndReturnPath(
        //     values.kotowaza,
        //     "userId",
        //     file
        //   )
        //   setFieldValue("pathName", pathName)
        //   console.log(values)
        //   dispatch(closeModal())
        // }}
      >
        {({ isSubmitting, isValid, dirty, values, setFieldValue }) => (
          <Form className="ui form">
            <Dropdown
              placeholder="ことわざ"
              fluid
              onChange={(_: SyntheticEvent<HTMLElement, Event>, data) =>
                setFieldValue("kotowaza", data.value)
              }
              selection
              options={kotowazaList}
            ></Dropdown>
            {values.kotowaza && (
              <Item.Group>
                <Item>
                  <Item.Header content="読み方:" />
                  <Item.Content content={targetReading(values.kotowaza)} />
                </Item>
              </Item.Group>
            )}
            <MyTextArea
              name="desc"
              placeholder="説明（最大140文字）"
              maxLength={140}
            />
            <Record file={file} setFile={setFile} />
            <Grid>
              <Grid.Column width={16}></Grid.Column>
              <Grid.Column width={16}></Grid.Column>
            </Grid>
            {file.length !== 0 && (
              <Button
                disabled={!isValid || !dirty || loadingFlag}
                // type="submit"
                size="large"
                color="teal"
                content="送信する"
                onClick={() => {
                  setLoadingFlag(true)
                  const pathName = uploadDataAndReturnPath(
                    values.kotowaza,
                    "userId",
                    file
                  )
                  console.log({ ...values, pathName })
                  dispatch(closeModal())
                }}
              ></Button>
            )}
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}
