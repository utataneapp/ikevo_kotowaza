import {
  Button,
  Grid,
  Icon,
  Image,
  Item,
  List,
  Segment,
} from "semantic-ui-react"
import NavBar from "../src/common/nav/NavBar"
import "semantic-ui-css/semantic.min.css"

export default function like() {
  return (
    <>
      <NavBar />
      <Grid>
        <Grid.Column width={16}></Grid.Column>
      </Grid>
      <Grid centered>
        <Grid.Column width={7}>
          <Segment.Group>
            <Segment clearing>
              <Item.Group>
                <Item>
                  <Item.Content>
                    <Item.Header content="犬も歩けば棒にあたる" />
                    <Item.Description content="息子がonlineゲーム中毒になった。" />
                  </Item.Content>
                </Item>
                <span>
                  <Icon name="clock">2022/01/01/12:00</Icon>
                </span>
                <Button color="red" floated="right">
                  <i className="play icon"></i>
                </Button>
                <Button color="teal" floated="right">
                  <i className="pause icon"></i>
                </Button>
                <Button color="pink" floated="right">
                  <i className="heart icon"></i>
                </Button>
                <Button color="pink" floated="right">
                  <i className="trash"></i>
                </Button>
              </Item.Group>
            </Segment>
          </Segment.Group>
        </Grid.Column>
        <Grid.Column width={7}>
          <Segment.Group>
            <Segment clearing>
              <Item.Group>
                <Item>
                  <Item.Content>
                    <Item.Header content="犬も歩けば棒にあたる" />
                    <Item.Description content="140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字140文字" />
                  </Item.Content>
                </Item>
                <span>
                  <Icon name="clock">2022/01/01/12:00</Icon>
                </span>
                <Button color="red" floated="right">
                  <i className="play icon"></i>
                </Button>
                <Button color="teal" floated="right">
                  <i className="pause icon"></i>
                </Button>
                <Button color="pink" floated="right">
                  <i className="heart icon"></i>
                </Button>
                <Button color="pink" floated="right">
                  <i className="trash"></i>
                </Button>
              </Item.Group>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    </>
  )
}
