import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsersApis } from '../../app/api/agent';
import { decodeJwtAsUser } from '../../common/helpers';
import { UserLoginResult, User, UserLoginRequest, UserRegisterRequest } from './models';

export type UsersState = {
  currentUser: User; 
};

const initialState : UsersState = {
  currentUser: {
    id: '',
    userName: '',
    displayName: '',
    email: '',
  },
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
  },
  // add your async reducers in extraReducers
  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
        const {token} = action.payload;
        state.currentUser = decodeJwtAsUser(token);
        return state;
    });
  }
});

export const usersReducer = usersSlice.reducer;

export const {logoutReducer, loginReducer} = usersSlice.actions;