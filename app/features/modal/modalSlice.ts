import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalKeys = "signupModal" | "isModalOpen" | "passwordModal";

interface ModalState {
  signupModal: boolean;
  isModalOpen: boolean;
  passwordModal: boolean;
}

const initialState: ModalState = {
  signupModal: false,
  isModalOpen: false,
  passwordModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<ModalKeys>) => {
      state[action.payload] = !state[action.payload];
    },
    closeAll: (state) => {
      for (const key in state) {
        state[key as ModalKeys] = false;
      }
    },
  },
});

export const { toggleModal, closeAll } = modalSlice.actions;
export default modalSlice.reducer;