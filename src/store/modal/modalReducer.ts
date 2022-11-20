import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Modal = {
  modalTypes: "LoginForm" | "RegistrationForm" | "VoicePostForm"
  modalProps: {}
}

export const modalSlice = createSlice({
  name: "modal",
  initialState: null as null | Modal,
  reducers: {
    openModal: (state, action: PayloadAction<Modal>) => {
      return {
        ...state,
        modalTypes: action.payload.modalTypes,
        modalProps: action.payload.modalProps,
      }
    },
    closeModal: () => {
      return null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
