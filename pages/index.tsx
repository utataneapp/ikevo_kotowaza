import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()
  return (
    <Segment inverted textAlign="center" className="masthead">
      <Container>
        <Header as="h1" inverted>
          <Image size="massive" src="/icon.png" style={{ marginBottom: 12 }} />
          イケボことわざ
        </Header>
        <Button size="huge" inverted onClick={() => router.push("/voice")}>
          開始
          <Icon name="arrow right" inverted />
        </Button>
      </Container>
    </Segment>
  )
}
