import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsersApis } from '../../app/api/agent';
import { decodeJwtAsUser } from '../../common/helpers';
import { UserLoginResult, User, UserLoginRequest, UserRegisterRequest, UploadUserImageParameters, SetUserThumbnailRequest } from './models';
import { UploadUserImageService } from './services';

export type UsersState = {
  currentUser: User; 
  addPhotoMode: boolean;
};

const initialState : UsersState = {
  currentUser: {
    id: '',
    userName: '',
    displayName: '',
    email: '',
  },
  addPhotoMode: false
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

export const uploadUserImage = createAsyncThunk<{fileName: string}, UploadUserImageParameters, {rejectValue: any}>(
  'users/uploadUserImage',
 async (data: UploadUserImageParameters, thunkApi) => {
  try{
    const {base64, publicRead} = data;
    return await UploadUserImageService(base64, publicRead);
  }catch(err: any){
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const selectUserThumbnail = createAsyncThunk<User, SetUserThumbnailRequest, {rejectValue: any}>(
  'users/selectUserThumbnail',
 async (data: SetUserThumbnailRequest, thunkApi) => {
  try{
    const {ImageName} = data;
    return await UsersApis.setThumbnail({
      ImageName
    });
  }catch(err: any){
    return thunkApi.rejectWithValue(err.response.data);
  }
});


const usersSlice = createSlice({
  name: 'users',
  initialState,
  // add your non-async reducers here
  reducers: {
    logoutReducer: (state) => {
      state = initialState;
      return state;
    },
    loginReducer: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      return state;
    },
    enableAddPhotoMode: (state, action: PayloadAction<boolean>) => {
      state.addPhotoMode = action.payload;
      return state;
    },
  },
  // add your async reducers in extraReducers
  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
        const {token} = action.payload;
        state.currentUser = decodeJwtAsUser(token);
        return state;
    });

    builder
    .addCase(uploadUserImage.fulfilled, (state, action) => {
        return state;
    });

    builder
    .addCase(selectUserThumbnail.fulfilled, (state, action) => {
        state.currentUser.thumbnail = action.payload.thumbnail;
        return state;
    });
  }
});

export const usersReducer = usersSlice.reducer;

export const {logoutReducer, loginReducer, enableAddPhotoMode} = usersSlice.actions;