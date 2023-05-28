import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/user';
import { User } from '../actions/user';
import { RootState } from '../../store';

interface userState {
  user: IUser | null;
}

export const initialStateUser: userState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialStateUser,
  reducers: {
    [User.SET]: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state.user.user;

export const { SET } = userSlice.actions;
export const userReducer = userSlice.reducer;
