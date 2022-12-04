import { Button, Grid, Icon, Item, List, Segment } from "semantic-ui-react"
import NavBar from "../src/common/nav/NavBar"
import "semantic-ui-css/semantic.min.css"
import { useSelector } from "react-redux"
import { RootState } from "../src/store"
import { useEffect, useState } from "react"
import { checkOkByDevice, displayId, kotowaza } from "../src/functions/lib"
import { getDataFromDatabase } from "../src/functions/database"
import { DATA_DATABASE } from "../src/types/type"
import "react-h5-audio-player/lib/styles.css"
import { getVoiceUrl } from "../src/functions/cloudStorage"
import DeleteButton from "../src/components/DeleteButton"
import Loading from "../src/components/Loading"
import { useRouter } from "next/router"

export default function MyPage() {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const authentificated = useSelector(
    (state: RootState) => state.auth.authentificated
  )
  const tmpData = useSelector((state: RootState) => state.auth.tmpData)
  const myPageData = currentUser?.myVoice as string[]
  const [data, setData] = useState<DATA_DATABASE[]>([])
  const [targetName, setTargetName] = useState<string>("")
  const [targetVoice, setTargetVoice] = useState<HTMLAudioElement>()
  const [loadingFlag, setLoadingFlag] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      ;(async () => {
        const result = await getDataFromDatabase(myPageData, tmpData)
        setData(result)
      })()
    }
    setLoadingFlag(false)
  }, [])

  // useEffect(() => {
  //   if (!currentUser) {
  //     router.push("/home")
  //   }
  // }, [])

  useEffect(() => {
    if (targetVoice) {
      targetVoice!.addEventListener("ended", () => {
        setTargetName("")
      })

      return () =>
        targetVoice!.removeEventListener("ended", () => {
          setTargetName("")
        })
    }
  }, [targetVoice])

  if (loadingFlag) {
    return (
      <>
        <NavBar />
        <Grid>
          <Grid.Column width={16}></Grid.Column>
        </Grid>
        <Loading />
      </>
    )
  }

  return (
    <>
      <NavBar />
      <Grid>
        <Grid.Column width={16}></Grid.Column>
      </Grid>
      <Grid centered>
        {authentificated ? (
          <Grid.Column width={14}>
            <Segment.Group>
              <Segment>
                <Item.Group>
                  <Item>
                    <Item.Image
                      size="medium"
                      circular
                      src="user.png"
                    ></Item.Image>

                    <List>
                      <List.Item>
                        <List.Content>
                          <List.Header>ユーザーID</List.Header>
                          <List.Description>
                            {currentUser && displayId(currentUser?.userId)}
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header>ユーザー名</List.Header>
                          <List.Description>
                            {currentUser?.userName}
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header>メールアドレス</List.Header>
                          <List.Description>
                            {currentUser?.email}
                          </List.Description>
                        </List.Content>
                      </List.Item>

                      <List.Item>
                        <List.Content>
                          <List.Header>性別</List.Header>
                          <List.Description>
                            {currentUser?.sex}
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header>年齢</List.Header>
                          <List.Description>
                            {currentUser?.age}
                          </List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header>アカウント登録日</List.Header>
                          <List.Description>
                            {currentUser?.createdAt}
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Item>
                </Item.Group>
              </Segment>
            </Segment.Group>
          </Grid.Column>
        ) : (
          <Grid.Column></Grid.Column>
        )}
      </Grid>

      {data &&
        data.map((val) => (
          <Grid
            centered
            key={val.kotoKey + "-" + val.dataKey}
            verticalAlign="middle"
          >
            <Grid.Column width={14}>
              <Segment.Group>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Content verticalAlign="middle">
                        <Item.Header content={kotowaza(val.kotoKey!)!} />
                        <Item.Description content={val.desc} />
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
                <Segment clearing>
                  <span style={{ flexDirection: "row" }}>
                    <Item.Content>
                      <Icon name="clock"></Icon>
                      {val.createdAt}
                    </Item.Content>
                  </span>
                  <DeleteButton val={val} />
                  <Button color="pink" floated="right" onClick={async () => {}}>
                    <i className="heart icon"></i>
                    <label color="pink">{val.like}</label>
                  </Button>
                  {val &&
                    checkOkByDevice(
                      val!.ios!,
                      MediaRecorder.isTypeSupported("video/mp4")
                    ) && (
                      <>
                        {targetName ===
                          val.kotoKey?.toString() +
                            "-" +
                            val.dataKey?.toString() && (
                          <Button
                            color="red"
                            floated="right"
                            onClick={() => {
                              targetVoice!.pause()
                              setTargetName("")
                            }}
                          >
                            <i className="pause icon"></i>
                          </Button>
                        )}
                        {targetName !==
                          val.kotoKey?.toString() +
                            "-" +
                            val.dataKey?.toString() && (
                          <Button
                            color="facebook"
                            floated="right"
                            onClick={async () => {
                              const url = await getVoiceUrl(
                                kotowaza(val.kotoKey!)!,
                                val.voiceUrl
                              )
                              const voice = new Audio(url!)
                              voice.play()
                              setTargetVoice(voice)
                              setTargetName(
                                val.kotoKey?.toString() +
                                  "-" +
                                  val.dataKey?.toString()
                              )
                            }}
                          >
                            <i className="play icon"></i>
                          </Button>
                        )}
                      </>
                    )}
                  {!val.ios && MediaRecorder.isTypeSupported("video/mp4") && (
                    <label>iOS端末では再生できません</label>
                  )}
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid>
        ))}
    </>
  )
}
