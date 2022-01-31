import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BaseApis, UsersApis } from '../../app/api/agent';
import { URLS } from '../../app/api/constants';
import { LOCAL_STORAGE_KEYS } from '../../common/constants';
import { UserLoginResult, User, UserLoginRequest, UserRegisterRequest } from './models';
import { UploadUserImageService } from './services';

export type UsersState = {
  currentUser: User;
  photos: {
    addPhotoMode: boolean;
  },
  fetchedUserDetails: User | null;
};

const initialState : UsersState = {
  currentUser: {
    id: '',
    userName: '',
    displayName: '',
    email: '',
    photos: []
  },
  photos: {
    addPhotoMode: false,
  },
  fetchedUserDetails: null,
};

export const login = createAsyncThunk<UserLoginResult, UserLoginRequest, {rejectValue: any}>(
  'users/login',
 async (body: UserLoginRequest, thunkApi) => {
  try{
    return await UsersApis.login(body);
  }catch(err: any){
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const register = createAsyncThunk<User, UserRegisterRequest, {rejectValue: any}>(
  'users/register',
 async (body: UserRegisterRequest, thunkApi) => {
  try{
    return await UsersApis.register(body);
  }catch(err: any){
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const uploadUserImage = createAsyncThunk('users/uploadUserImage', UploadUserImageService);
export const fetchCurrentUserInfo = createAsyncThunk('users/fetchCurrentUserInfo', UsersApis.info);
export const fetchUserDetails = createAsyncThunk('users/fetchUserDetails', UsersApis.fetchUserDetails);
export const selectUserThumbnail = createAsyncThunk('users/selectUserThumbnail', UsersApis.setThumbnail);
export const deleteUserImage = createAsyncThunk('users/deleteUserImage', UsersApis.delete);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  // add your non-async reducers here
  reducers: {
    logoutReducer: (state) => {
      state = initialState;
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS.JWT);
      return state;
    },
    enableAddPhotoMode: (state, action: PayloadAction<boolean>) => {
      state.photos.addPhotoMode = action.payload;
      return state;
    },
  },
  // add your async reducers in extraReducers
  extraReducers: (builder) => {
    builder
    .addCase(uploadUserImage.fulfilled, (state, action) => {
      const image = `${URLS.AWS_S3_PRESIGNED}/users-profiles-images/${state.currentUser.id}/${action.payload.image}`;
      state.fetchedUserDetails?.photos?.push(image);
      
      state.photos.addPhotoMode = false;
      return state;
    });

    builder
    .addCase(deleteUserImage.fulfilled, (state, action) => {
      const image = `${URLS.AWS_S3_PRESIGNED}/users-profiles-images/${state.currentUser.id}/${action.payload}`;
      if(state.fetchedUserDetails){
        state.fetchedUserDetails.photos = state.fetchedUserDetails.photos.filter(p => p !== image);
      }

      state.photos.addPhotoMode = false;
      return state;
    });

    builder
    .addCase(selectUserThumbnail.fulfilled, (state, action) => {
        state.currentUser.thumbnail = action.payload.thumbnail;
        return state;
    });

    builder
    .addCase(fetchUserDetails.fulfilled, (state, action) => {
      const data = action.payload;
      state.fetchedUserDetails = data;
      return state;
    });

    builder
    .addCase(fetchCurrentUserInfo.fulfilled, (state, action) => {
      const data = action.payload;
      state.currentUser = data;
      return state;
    });
  
  }
});

export const usersReducer = usersSlice.reducer;

export const {logoutReducer, enableAddPhotoMode} = usersSlice.actions;