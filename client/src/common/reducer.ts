import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CropperInfo, DropZoneInfo, ModalInfo, ModalTypes } from './models';

export type CommonState = {
    submitting: boolean;
    modalInfo: ModalInfo;
    dropZoneInfo: DropZoneInfo;
    cropperInfo: CropperInfo;
};

const initialState : CommonState = {
    submitting: false,
    modalInfo: {
      showModal: false,
      submissionErrors: null,
      type: ModalTypes.login
    },
    dropZoneInfo: {
      files: null,
      submissionErrors: null
    },
    cropperInfo: {
      cropped: false,
      base64: null
    }
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  // add your non-async reducers here
  reducers: {
    setSubmittingReducer: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
      return state;
    },
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
    setDropZoneInfoReducer: (state, action: PayloadAction<Partial<DropZoneInfo>>) => {
      const {files, submissionErrors} = action.payload;

      if(files && files.length > 0){
        state.dropZoneInfo.files = files;
        state.dropZoneInfo.submissionErrors = [];
      }
      else if(submissionErrors){
        state.dropZoneInfo.submissionErrors = submissionErrors;
        state.dropZoneInfo.files = [];
      }
      return state;
    },
    setCropperInfoReducer: (state, action: PayloadAction<Partial<CropperInfo>>) => {
      const {cropped, base64} = action.payload;

      if(cropped != null){
        state.cropperInfo.cropped = cropped;
      }
      if(base64){
        state.cropperInfo.base64 = base64;
      }
      return state;
    },
  },
  // add your async reducers in extraReducers
  extraReducers: (builder) => {}
});

export const commonReducer = commonSlice.reducer;

export const {setModalInfoReducer, setSubmittingReducer, setDropZoneInfoReducer, setCropperInfoReducer} = commonSlice.actions;