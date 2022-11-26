import { Button, Grid, Icon, Item, Segment } from "semantic-ui-react"
import NavBar from "../src/common/nav/NavBar"
import "semantic-ui-css/semantic.min.css"
import { displayId, kotowaza } from "../src/functions/lib"
import { LikeComponent } from "../src/components/LikeComponent"
import { getVoiceUrl } from "../src/functions/cloudStorage"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { DATA_DATABASE } from "../src/types/type"
import { RootState } from "../src/store"
import { getDataFromDatabase } from "../src/functions/database"

export default function Like() {
  const [data, setData] = useState<DATA_DATABASE[]>([])
  const [targetName, setTargetName] = useState<string>("")
  const [targetVoice, setTargetVoice] = useState<HTMLAudioElement>()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const [currentLikeList, setCurrentLikeList] = useState<
    { id: string; one: boolean }[]
  >([])
  const likeList = useSelector(
    (state: RootState) => state.auth.currentUser?.likeList
  )

  useEffect(() => {
    if (currentUser?.likeList) {
      ;(async () => {
        const result = await getDataFromDatabase(currentUser?.likeList)
        console.log(result)
        setData(result)
      })()
    }
  }, [likeList])

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
      {data &&
        data.map((val) => (
          <Grid centered key={val.kotoKey + "-" + val.dataKey}>
            <Grid.Column width={15}>
              <Segment.Group>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Image
                        size="tiny"
                        circular
                        src="icon.png"
                      ></Item.Image>
                      <Item.Content verticalAlign="middle">
                        <Item.Header content={kotowaza(val.kotoKey!)!} />
                        <Item.Content>
                          <Icon name="user"></Icon>
                          {`${val.userName} ${displayId(val.byUserId!)}`}
                        </Item.Content>
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
                  <LikeComponent
                    val={val}
                    currentLikeList={currentLikeList}
                    setCurrentLikeList={setCurrentLikeList}
                  />

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

                  {/* <Button color="pink" floated="right" onClick={() => {}}>
                      <i className="heart icon"></i>
                    </Button> */}
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid>
        ))}
    </>
  )
}
