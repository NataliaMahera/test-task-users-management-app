import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from './usersApi';
import { ErrorDetails, SetSearchTermPayload, UserState } from './users.types';

const initialState: UserState = {
  users: [],
  searchTerm: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },

  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<SetSearchTermPayload>) => {
      const field = action.payload.field;
      state.searchTerm[field] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.users = payload;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as ErrorDetails;
      });
  },
});

export const { setSearchTerm } = userSlice.actions;

export default userSlice.reducer;
