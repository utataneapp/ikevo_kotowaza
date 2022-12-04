import { Dispatch, SetStateAction, use, useEffect, useState } from "react"
import { Label, Segment } from "semantic-ui-react"

export default function CountUpLabel({
  cntFlag,
  setTenCntFlag,
}: {
  cntFlag: boolean
  setTenCntFlag: Dispatch<SetStateAction<boolean>>
}) {
  const [cnt, setCnt] = useState(0)

  useEffect(() => {
    if (cntFlag) {
      setInterval(() => {
        setCnt((prev) => prev + 1)
      }, 1000)
    } else {
      setCnt(0)
    }
  }, [cntFlag])

  useEffect(() => {
    if (cnt === 10) {
      setCnt(0)
      setTenCntFlag(true)
    }
  }, [cnt])

  return <Label size="huge">{`0:0${cnt}`}</Label>
}
