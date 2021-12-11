import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalInfo, ModalTypes } from './models';

export type CommonState = {
    submitting: boolean;
    modalInfo: Partial<ModalInfo>;
};

const initialState : CommonState = {
    modalInfo: {
      showModal: false,
      submissionErrors: null,
      type: ModalTypes.login
    },
    submitting: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  // add your non-async reducers here
  reducers: {
    setModalInfoReducer: (state, action: PayloadAction<Partial<ModalInfo>>) => {
      const {showModal, submissionErrors, type} = action.payload;

      if(showModal === false){
        state.modalInfo.showModal = false;
        state.modalInfo.submissionErrors = null;
      }
      else if(showModal !== undefined){
        state.modalInfo.showModal = showModal;
      }

      if(submissionErrors){
        state.modalInfo.submissionErrors = submissionErrors;
      }
      if(type !== undefined){
        state.modalInfo.type = type;
      }

      return state;
    },
    setSubmittingReducer: (state, action: PayloadAction<boolean>) => {
        state.submitting = action.payload;
        return state;
    },
  },
  // add your async reducers in extraReducers
  extraReducers: (builder) => {}
});

export const commonReducer = commonSlice.reducer;

export const {setModalInfoReducer, setSubmittingReducer} = commonSlice.actions;