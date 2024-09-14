import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorResponse, User } from './users.types';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: ErrorResponse }
>('users/getAllUsers', async (_, thunkApi) => {
  try {
    const { data } = await instance.get('/users');
    return data;
  } catch (error) {
    const message = (error as Error).message || 'An error occurred';
    return thunkApi.rejectWithValue({ message });
  }
});
