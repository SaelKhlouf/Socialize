import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CommonState = {
    showModal: boolean;
    submitting: boolean;
};

const initialState : CommonState = {
    showModal: false,
    submitting: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  // add your non-async reducers here
  reducers: {
    setModalVisibilityReducer: (state, action: PayloadAction<boolean>) => {
        state.showModal = action.payload;
        return state;
    },
    setSubmittingReducer: (state, action: PayloadAction<boolean>) => {
        state.submitting = action.payload;
        return state;
    },
  },
  // add your async reducers in extraReducers
  extraReducers: (builder) => {
  }
});

export const commonReducer = commonSlice.reducer;

export const {setModalVisibilityReducer, setSubmittingReducer} = commonSlice.actions;