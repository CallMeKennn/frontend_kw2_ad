// thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { TopicRequest } from './request';

export const getAllTopic = createAsyncThunk('topic/get-all-topic', async (request: any, { rejectWithValue }) => {
     try {
          const response = await TopicRequest.getAllTopic();
          toast.success('Get all topic successfully');
          return response.data;
     } catch (error: any) {
          toast.error(error.response.data.message);
          return rejectWithValue(error.response.data.message);
     }
});
