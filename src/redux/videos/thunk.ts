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
               const response = await VideoRequest.getAllVideoByUserId(request);
               return response.data;
          } catch (error: any) {
               toast.error(error.response.data.message);
               return rejectWithValue(error.response.data.message);
          }
     },
);

export const getAllEmailManageByUserId = createAsyncThunk(
     'video/get-All-Email-Manage-By-UserId',
     async (request: any, { rejectWithValue }) => {
          try {
               const response = await VideoRequest.getAllEmailManageByUserId(request);
               return response.data;
          } catch (error: any) {
               toast.error(error.response.data.message);
               return rejectWithValue(error.response.data.message);
          }
     },
);
