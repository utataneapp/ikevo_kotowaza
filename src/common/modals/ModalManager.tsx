import { useSelector } from "react-redux"
import { RootState } from "../../store"
import LoginForm from "../form/LoginForm"
import RegistrationForm from "../form/RegistrationForm"
import VoicePostForm from "../form/VoicePostForm"

export default function ModalManager() {
  const modalLookup = {
    LoginForm: LoginForm,
    RegistrationForm: RegistrationForm,
    VoicePostForm: VoicePostForm,
  }
  const currentModal = useSelector((state: RootState) => state.modals)
  let renderedModal
  if (currentModal) {
    const { modalTypes, modalProps } = currentModal
    const ModalComponent = modalLookup[modalTypes]
    renderedModal = <ModalComponent {...modalProps} />
  }
  return <span>{renderedModal}</span>
}
