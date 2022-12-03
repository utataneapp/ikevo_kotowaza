import RecorderService from "../functions/record/RecorderService"
import { useState, useEffect, SetStateAction, Dispatch } from "react"
import { Button } from "semantic-ui-react"
import CountUpLabel from "./CountUpLabel"

type Recording = {
  ts: number
  blobUrl: string
  mimeType: string
  size: number
}

type RECORDING_SERVICE = {
  baseUrl: string

  em: DocumentFragment

  state: string

  chunks: any[]
  chunkType: string
  encoderMimeType: string
  config: {
    broadcastAudioProcessEvents: boolean
    createAnalyserNode: boolean
    createDynamicsCompressorNode: boolean
    forceScriptProcessor: boolean
    manualEncoderId: string
    micGain: number
    processorBufferSize: number
    stopTracksAndCloseCtxWhenFinished: boolean
    usingMediaRecorder: typeof window.MediaRecorder
    enableEchoCancellation: true
  }
  startRecording: any
  stopRecording: any
} | null

export default function Record3({
  file,
  setFile,
}: {
  file: Recording[]
  setFile: Dispatch<SetStateAction<Recording[]>>
}) {
  const [recorderService, setRecorderService] =
    useState<RECORDING_SERVICE>(null)
  const [recordingInProgress, setRecordingInProgress] = useState<boolean>(false)
  const [tenCntFlag, setTenCntFlag] = useState(false)
  const encoders = [
    { id: "wav", name: "audio/wav - custom - mono" },
    { id: "mp3", name: "audio/mpeg - zhuker/lamejs - mono/128kbps" },
    { id: "ogg", name: "audio/ogg - higuma/oggjs - mono/~128kps" },
  ]

  useEffect(() => {
    if (recorderService) {
      window.addEventListener("keypress", handleKeypress)
      return
    }

    setRecorderService(new RecorderService() as any)
  }, [recorderService])

  useEffect(() => {
    if (recordingInProgress) {
      window.addEventListener("keypress", handleKeypress)
    }
  }, [recordingInProgress])

  useEffect(() => {
    if (!file.length) {
      return
    }
    window.addEventListener("keypress", handleKeypress)
    console.log(file)
  }, [file])

  function handleRecording(evt: Event) {
    onNewRecording(evt)
  }

  // 録音の時間制限
  useEffect(() => {
    if (tenCntFlag) {
      handleClickBtnRecording()
    }
  }, [tenCntFlag])

  function handleKeypress() {
    window.removeEventListener("keypress", handleKeypress)
    handleClickBtnRecording()
  }

  function handleClickBtnRecording() {
    if (recordingInProgress) {
      stopRecording()
      recorderService!.em.removeEventListener("recording", handleRecording)
    } else {
      recorderService!.em.addEventListener("recording", handleRecording)
      startRecording()
    }
  }

  function startRecording() {
    recorderService!.config.stopTracksAndCloseCtxWhenFinished = true
    recorderService!.config.createDynamicsCompressorNode = false
    recorderService!.config.enableEchoCancellation = true
    recorderService!.config.manualEncoderId = encoders[2].id
    console.log(recorderService!.config.manualEncoderId)
    recorderService!
      .startRecording()
      .then(() => {
        setRecordingInProgress(true)
      })
      .catch((err: any) => {
        console.error(err)
      })
  }

  function stopRecording() {
    recorderService!.stopRecording()
    setRecordingInProgress(false)
    setTenCntFlag(false)
  }

  function onNewRecording(evt: any) {
    setFile([...file, evt.detail.recording])
  }

  const handleRemove = () => {
    setFile([])
  }

  return (
    <>
      <>
        {!file.length ? (
          <>
            <Button
              onClick={handleClickBtnRecording}
              disabled={recordingInProgress}
            >
              録音
            </Button>
            <Button onClick={handleClickBtnRecording}>停止</Button>
          </>
        ) : (
          <Button onClick={handleRemove}>削除</Button>
        )}
        {!file.length ? (
          <div
            style={{
              marginTop: 16,
              textAlign: "center",
            }}
          >
            <CountUpLabel
              cntFlag={recordingInProgress}
              setTenCntFlag={setTenCntFlag}
            />
          </div>
        ) : (
          <div className="inner">
            {file.map((recording) => {
              if (!recording.ts) {
                return <div />
              }

              return (
                <>
                  <audio
                    style={{ marginTop: "16px" }}
                    src={recording.blobUrl}
                    controls
                  />
                </>
              )
            })}
          </div>
        )}
      </>
    </>
  )
}
