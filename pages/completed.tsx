import { useRouter } from "next/router"
import { Button, Divider, Header, Item, Segment } from "semantic-ui-react"

export default function Completed() {
  const router = useRouter()
  return (
    <>
      <Segment basic textAlign="center">
        <Item>
          <Item.Image size="medium" circular src="completed.png"></Item.Image>
        </Item>
        <Divider horizontal></Divider>
        <Header size="huge">音声の投稿が完了しました</Header>
        <Button
          color="teal"
          content="次へ"
          size="big"
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
