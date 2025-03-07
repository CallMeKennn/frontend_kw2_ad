// thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { VideoRequest } from './request';
import { CreateVideoRequest } from './videos.interface';

export const createVideo = createAsyncThunk(
     'video/create-video',
     async (body: CreateVideoRequest, { rejectWithValue }) => {
          try {
               const response = await VideoRequest.createVideoRequest(body);
               toast.success('Create video successfully');
               return response.data;
          } catch (error: any) {
               toast.error(error.response.data.message);
               return rejectWithValue(error.response.data.message);
          }
     },
);

export const getAllVideoByUserId = createAsyncThunk(
     'video/get-All-Video-By-UserId',
     async (request: any, { rejectWithValue }) => {
          try {
               const { userId, filter }: any = request;
               const response = await VideoRequest.getAllVideoByUserId(userId, filter);
               return response.data;
          } catch (error: any) {
               toast.error(error.response.data.message);
               return rejectWithValue(error.response.data.message);
          }
     },
);
