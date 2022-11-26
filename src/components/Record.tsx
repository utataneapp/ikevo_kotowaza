import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import ReactAudioPlayer from "react-audio-player"
import { Button, Label } from "semantic-ui-react"
import CountUpLabel from "./CountUpLabel"

export default function Record({
  file,
  setFile,
}: {
  file: Blob[]
  setFile: Dispatch<SetStateAction<Blob[]>>
}) {
  const [audioState, setAudioState] = useState(true)
  const [cntFlag, setCntFlag] = useState(false)
  const [tenCntFlag, setTenCntFlag] = useState(false)
  const audioRef = useRef<MediaRecorder | null>(null)

  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(handleSuccess)
        .catch(handleError)
    } else {
      alert("音声の録音ができません")
    }
  }, [])

  // 録音の時間制限
  useEffect(() => {
    if (tenCntFlag) {
      handleStop()
    }
  }, [tenCntFlag])

  const handleSuccess = (stream: MediaStream) => {
    audioRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9",
    })
    var chunks = [] as Blob[]
    audioRef.current.addEventListener("dataavailable", (ele) => {
      if (ele.data.size > 0) {
        chunks.push(ele.data)
      }
      setFile(chunks)
    })

    audioRef.current.addEventListener("start", () => setAudioState(false))
    audioRef.current.addEventListener("stop", () => {
      setAudioState(true)
      chunks = []
    })
  }

  const handleError = () => {
    alert("エラーが発生しました")
  }

  const handleStart = () => {
    setCntFlag(true)
    audioRef.current!.start()
  }

  const handleStop = () => {
    setCntFlag(false)
    setTenCntFlag(false)
    audioRef.current!.stop()
  }

  const handleRemove = () => {
    setAudioState(true)
    setFile([])
  }

  return (
    <>
      {file.length === 0 ? (
        <Button onClick={handleStart} disabled={cntFlag}>
          録音
        </Button>
      ) : (
        <Button onClick={handleRemove}>削除</Button>
      )}
      <Button onClick={handleStop} disabled={audioState}>
        停止
      </Button>

      {file.length === 0 ? (
        <div
          style={{
            marginTop: 16,
            textAlign: "center",
          }}
        >
          <CountUpLabel cntFlag={cntFlag} setTenCntFlag={setTenCntFlag} />
        </div>
      ) : (
        <ReactAudioPlayer
          style={{ marginTop: "16px" }}
          src={URL.createObjectURL(new Blob(file))}
          controls
        />
      )}
    </>
  )
}
