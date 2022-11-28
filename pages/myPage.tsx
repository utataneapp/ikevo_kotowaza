import {
  Button,
  Grid,
  GridColumn,
  Icon,
  Item,
  List,
  Segment,
} from "semantic-ui-react"
import NavBar from "../src/common/nav/NavBar"
import "semantic-ui-css/semantic.min.css"
import { useSelector } from "react-redux"
import { RootState } from "../src/store"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { displayId, kotowaza } from "../src/functions/lib"
import { getDataFromDatabase } from "../src/functions/database"
import { DATA_DATABASE } from "../src/types/type"
import "react-h5-audio-player/lib/styles.css"
import { getVoiceUrl } from "../src/functions/cloudStorage"
import DeleteButton from "../src/components/DeleteButton"

export default function MyPage() {
  const router = useRouter()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const authentificated = useSelector(
    (state: RootState) => state.auth.authentificated
  )
  const myPageData = currentUser?.myVoice as string[]
  const [data, setData] = useState<DATA_DATABASE[]>([])
  const [targetName, setTargetName] = useState<string>("")
  const [targetVoice, setTargetVoice] = useState<HTMLAudioElement>()

  useEffect(() => {
    if (currentUser) {
      ;(async () => {
        const result = await getDataFromDatabase(myPageData)
        console.log(result)
        setData(result)
      })()
    }
  }, [currentUser?.myVoice])

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

  return (
    <>
      <NavBar />
      <Grid>
        <Grid.Column width={16}></Grid.Column>
      </Grid>
      <Grid centered>
        {authentificated ? (
          <Grid.Column width={12}>
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
          <Grid centered key={val.kotoKey + "-" + val.dataKey}>
            <Grid.Column width={15}>
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
                  {targetName ===
                    val.kotoKey?.toString() + "-" + val.dataKey?.toString() && (
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
                    val.kotoKey?.toString() + "-" + val.dataKey?.toString() && (
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
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid>
        ))}
    </>
  )
}
