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

export default function Voice() {
  return (
    <>
      <NavBar />
      <Grid>
        <Grid.Column width={16}></Grid.Column>
      </Grid>
      <Grid centered>
        <Grid.Column width={15}>
          <Segment.Group>
            <Segment>
              <Item.Group>
                <Item>
                  <Item.Image size="tiny" circular src="icon.png"></Item.Image>
                  <Item.Content>
                    <Item.Header content="犬も歩けば棒にあたる" />
                    <Item.Description content="仮データ" />
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
            <Segment clearing>
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
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    </>
  )
}
