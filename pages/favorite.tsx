import { Button, Grid, Icon, Item, Segment } from "semantic-ui-react"
import NavBar from "../src/common/nav/NavBar"
import "semantic-ui-css/semantic.min.css"
import { checkOkByDevice, displayId, kotowaza } from "../src/functions/lib"
import { LikeComponent } from "../src/components/LikeComponent"
import { getVoiceUrl } from "../src/functions/cloudStorage"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { DATA_DATABASE } from "../src/types/type"
import { RootState } from "../src/store"
import { getDataFromDatabase } from "../src/functions/database"
import Loading from "../src/components/Loading"
import { useRouter } from "next/router"

export default function Favorite() {
  const router = useRouter()
  const [data, setData] = useState<DATA_DATABASE[]>([])
  const [loadingFlag, setLoadingFlag] = useState(true)
  const [targetName, setTargetName] = useState<string>("")
  const [targetVoice, setTargetVoice] = useState<HTMLAudioElement>()
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)
  const tmpData = useSelector((state: RootState) => state.auth.tmpData)
  const [currentLikeList, setCurrentLikeList] = useState<
    { id: string; one: boolean }[]
  >([])
  const likeList = useSelector(
    (state: RootState) => state.auth.currentUser?.likeList
  )

  useEffect(() => {
    if (currentUser?.likeList) {
      ;(async () => {
        const result = await getDataFromDatabase(currentUser!.likeList, tmpData)
        setData(result)
      })()
    }
    setLoadingFlag(false)
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

  useEffect(() => {
    if (!currentUser) {
      router.push("/home")
    }
  }, [])

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
      {data.length !== 0 ? (
        data.map((val) => (
          <Grid
            centered
            key={val.kotoKey + "-" + val.dataKey}
            verticalAlign="middle"
          >
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
                  {checkOkByDevice(
                    val!.ios!,
                    MediaRecorder.isTypeSupported("video/mp4")
                  ) && (
                    <>
                      <LikeComponent
                        val={val}
                        currentLikeList={currentLikeList}
                        setCurrentLikeList={setCurrentLikeList}
                      />

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
                    <label>iOS?????????????????????????????????</label>
                  )}

                  {/* <Button color="pink" floated="right" onClick={() => {}}>
                      <i className="heart icon"></i>
                    </Button> */}
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid>
        ))
      ) : (
        <Grid>
          <Grid.Column textAlign="center" width={16}>
            ???????????????????????????????????????
          </Grid.Column>
        </Grid>
      )}
    </>
  )
}
