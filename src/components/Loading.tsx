import React from "react"
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react"

export default function Loading() {
  return (
    <div>
      <Dimmer active inverted>
        <Loader inverted>読み込み中</Loader>
      </Dimmer>
      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    </div>
  )
}
