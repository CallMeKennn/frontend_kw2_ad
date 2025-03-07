// thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AuthRequest } from './request';
import { LoginRequest } from './auth.interface';

export const login = createAsyncThunk('auth/login', async (body: LoginRequest, { rejectWithValue }) => {
     try {
          const response = await AuthRequest.login(body);
          toast.success('Login Success');
          return response.data;
     } catch (error: any) {
          toast.error(error.response.data.message);
          return rejectWithValue(error.response.data.message);
     }
});
