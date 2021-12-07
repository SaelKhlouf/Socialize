import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode';
import { UsersApis } from '../../app/api/agent';
import { User } from './models';

export type UsersState = {
    loggedInUser: User | null; 
};

const initialState : UsersState = {
    loggedInUser: null,
};

export const login = createAsyncThunk('users/login', UsersApis.login);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  // add your non-async reducers here
  reducers: {
  },
  // add your async reducers in extraReducers
  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
        const {token} = action.payload;
        state.loggedInUser = jwtDecode<User>(token);
        return state;
    });
  }
});

export const usersReducer = usersSlice.reducer;

export const {} = usersSlice.actions;