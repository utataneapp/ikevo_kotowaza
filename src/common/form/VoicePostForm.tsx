import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Button, Dropdown, Grid, Item } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import { useDispatch, useSelector } from "react-redux"
import ModalWrapper from "../modals/ModalWrapper"
import { closeModal } from "../../store/modal/modalReducer"
import MyTextArea from "./MyTextArea"
import { SyntheticEvent, useState } from "react"
import { uploadDataAndReturnPath } from "../../functions/cloudStorage"
import {
  getKeyCntFromDatabase,
  updateUserDatabase,
  writeDataToDatabase,
  writeFirstKotoKeyCntToDatabase,
  writeKotoKeyCntToDatabase,
} from "../../functions/database"
import { kotowazaList } from "../../../pages/api/dropdownList"
import { RootState } from "../../store"
import { updateUser } from "../../store/auth/authReducer"
import { writeDataToFirestore } from "../../functions/firestore"
import { useRouter } from "next/router"
import NewRecord from "../../components/NewRecord"

type Recording = {
  ts: number
  blobUrl: string
  mimeType: string
  size: number
}

export default function VoicePostForm() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const targetKey = (val: string) =>
    kotowazaList.find((obj) => obj.value === val)!.key
  const targetReading = (val: string) =>
    kotowazaList.map((obj) => obj.value === val && obj.reading)
  // const [file, setFile] = useState<Blob[]>([])
  const [file, setFile] = useState<Recording[]>([])
  const [loadingFlag, setLoadingFlag] = useState(false)
  const router = useRouter()

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
            <NewRecord file={file} setFile={setFile} />
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
                onClick={async () => {
                  setLoadingFlag(true)
                  const pathName = uploadDataAndReturnPath(
                    values.kotowaza,
                    currentUser!.userId,
                    file
                  )
                  const targetKotoKey = targetKey(values.kotowaza)
                  const targetCnt = await getKeyCntFromDatabase(targetKotoKey)
                  if (targetCnt !== 0) {
                    writeKotoKeyCntToDatabase(targetKotoKey, targetCnt)
                  } else {
                    writeFirstKotoKeyCntToDatabase(targetKotoKey)
                  }
                  const newMyVoice = currentUser?.myVoice
                    ? (currentUser?.myVoice.slice() as string[])
                    : []
                  const newCnt = targetCnt + 1
                  newMyVoice.push(targetKotoKey.toString() + "-" + newCnt)
                  const iosFlag = MediaRecorder.isTypeSupported("video/mp4")
                  dispatch(
                    updateUser({
                      ...currentUser!,
                      myVoice: newMyVoice,
                      voiceCnt: currentUser!.voiceCnt + 1,
                    })
                  )
                  updateUserDatabase({
                    ...currentUser!,
                    myVoice: newMyVoice,
                    likeList: [],
                    voiceCnt: currentUser!.voiceCnt + 1,
                  })
                  writeDataToDatabase({
                    userId: currentUser?.userId,
                    userName: currentUser?.userName,
                    photoUrl: currentUser?.photoUrl,
                    kotoKey: targetKotoKey,
                    dataKey: newCnt,
                    voiceUrl: pathName,
                    desc: values.desc,
                    // iosの場合はtrue
                    ios: iosFlag,
                  })

                  writeDataToFirestore({
                    kotoKey: targetKotoKey,
                    dataKey: newCnt,
                  })
                  setTimeout(() => {
                    router.replace("/completed")
                    dispatch(closeModal())
                  }, 10)
                }}
              ></Button>
            )}
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}
