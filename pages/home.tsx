import { Button, Grid, Icon, Item, Segment } from "semantic-ui-react"
import NavBar from "../src/common/nav/NavBar"
import "semantic-ui-css/semantic.min.css"
import { useEffect, useState } from "react"
import { getDataFromFirestore } from "../src/functions/firestore"
import { DATA_DATABASE } from "../src/types/type"
import { getDataFromDatabase } from "../src/functions/database"
import { displayId, kotowaza } from "../src/functions/lib"
import { getVoiceUrl } from "../src/functions/cloudStorage"
import { LikeComponent } from "../src/components/LikeComponent"
import { useSelector } from "react-redux"
import { RootState } from "../src/store"
import DeleteButton from "../src/components/DeleteButton"

export default function Home() {
  const [data, setData] = useState<DATA_DATABASE[]>([])
  const [targetName, setTargetName] = useState<string>("")
  const [targetVoice, setTargetVoice] = useState<HTMLAudioElement>()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const [currentLikeList, setCurrentLikeList] = useState<
    { id: string; one: boolean }[]
  >([])

  useEffect(() => {
    let displayed = [{}] as DATA_DATABASE[]
    ;(async () => {
      const data = await getDataFromFirestore()
      if (data) {
        const idList = await Promise.all(data.map((obj) => obj.id))
        displayed = await getDataFromDatabase(idList)
        setData(displayed)
      }
    })()
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
      {data &&
        data.map((val) => (
          <Grid centered key={val.kotoKey + "-" + val.dataKey}>
            <Grid.Column width={15} verticalAlign="middle">
              <Segment.Group>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Image
                        size="tiny"
                        circular
                        src="icon.png"
                      ></Item.Image>
                      <Item.Content>
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
                  <DeleteButton val={val} />
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
