import { ReactNode } from "react"
import { useDispatch } from "react-redux"
import { Modal } from "semantic-ui-react"
import { closeModal } from "../../store/modal/modalReducer"

type Props = {
  children: ReactNode
  size: "mini" | "tiny" | "small" | "large" | "fullscreen" | undefined
  header: string
}

export default function ModalWrapper({ children, size, header }: Props) {
  const dispatch = useDispatch()

  return (
    <Modal open={true} onClose={() => dispatch(closeModal())} size={size}>
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  )
}
