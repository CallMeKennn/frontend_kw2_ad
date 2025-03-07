// thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CountryRequest } from '../countries/request';

export const getAllCountry = createAsyncThunk('country/get-all-country', async (request: any, { rejectWithValue }) => {
     try {
          const response = await CountryRequest.getAllCountry();
          toast.success('Get all country successfully');
          return response.data;
     } catch (error: any) {
          toast.error(error.response.data.message);
          return rejectWithValue(error.response.data.message);
     }
});
