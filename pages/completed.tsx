import { useRouter } from "next/router"
import { Button, Divider, Header, Item, List, Segment } from "semantic-ui-react"
import styles from "../styles/Home.module.css"

export default function completed() {
  const router = useRouter()
  return (
    <>
      <Segment basic textAlign="center">
        <Item>
          <Item.Image size="medium" circular src="icon.png"></Item.Image>
        </Item>
        <Divider horizontal></Divider>
        <Header size="huge">音声の投稿が完了しました</Header>
        <Button
          color="teal"
          content="次へ"
          icon="right chevron"
          labelPosition="left"
          onClick={() => {
            router.replace("/home")
          }}
        />
      </Segment>
    </>
  )
}
