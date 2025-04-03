// slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoState } from './videos.interface';
import { createVideo, getAllVideoByUserId, getAllEmailManageByUserId, getVideoStorageByUserId } from './thunk';
import { toast } from 'react-toastify';

const initialState: VideoState = {
     //Paginantion of video
     total: null,
     page: 1,
     limit: 10,
     totalPages: null,
     videos: [],
     video: null,
     videoStorages: [],

     //Pagination of email
     totalEmail: null,
     pageEmail: 1,
     limitEmail: 10,
     totalPagesEmail: null,
     email: null,
     emails: null,

     //Pagination of videoStorages
     totalVideoStorages: null,
     pageVideoStorages: 1,
     limitVideoStorages: 10,
     totalPagesVideoStorages: null,

     //error and status
     error: null,
     status: 'idle',
};

const VideoSlice = createSlice({
     name: 'videos',
     initialState,
     reducers: {
          resetStatus: (state: VideoState) => {
               state.status = 'idle';
               state.error = null;
          },
          resetVideo: (state: VideoState) => {
               state.video = null;
          },
          resetAllVideo: (state: VideoState) => {
               state.videos = null;
          },
     },
     extraReducers: (builder) => {
          builder
               //Create video
               .addCase(createVideo.pending, (state: VideoState) => {
                    state.status = 'loading';
                    state.error = null;
               })
               .addCase(createVideo.fulfilled, (state: VideoState, { payload }: PayloadAction<any>) => {
                    state.status = 'succeeded';
               })
               .addCase(createVideo.rejected, (state: VideoState, { payload }: PayloadAction<any>) => {
                    state.status = 'failed';
                    state.error = payload as string;
               })
               //Get all video by user id
               .addCase(getAllVideoByUserId.pending, (state: VideoState) => {
                    state.status = 'loading';
                    state.error = null;
               })
               .addCase(getAllVideoByUserId.fulfilled, (state: VideoState, { payload }: PayloadAction<any>) => {
                    const { videos, total, page, limit, totalPages } = payload.data;
                    state.status = 'succeeded';
                    state.videos = videos;
                    state.limit = limit;
                    state.page = page;
                    state.totalPages = totalPages;
                    state.total = total;
               })
               .addCase(getAllVideoByUserId.rejected, (state: VideoState, { payload }: PayloadAction<any>) => {
                    state.status = 'failed';
                    state.error = payload as string;
               })
               //Get all email manage by user id
               .addCase(getAllEmailManageByUserId.pending, (state: VideoState) => {
                    state.status = 'loading';
                    state.error = null;
               })
               .addCase(getAllEmailManageByUserId.fulfilled, (state: VideoState, { payload }: PayloadAction<any>) => {
                    console.log({ payload });
                    const { videoRequests, total, page, limit, totalPages } = payload.data;
                    state.status = 'succeeded';
                    state.emails = videoRequests;
                    state.limitEmail = limit;
                    state.pageEmail = page;
                    state.totalPagesEmail = totalPages;
                    state.totalEmail = total;
               })
               .addCase(getAllEmailManageByUserId.rejected, (state: VideoState, { payload }: PayloadAction<any>) => {
                    state.status = 'failed';
                    state.error = payload as string;
               })

               //Get video storage
               .addCase(getVideoStorageByUserId.pending, (state: VideoState) => {
                    state.status = 'loading';
                    state.error = null;
               })
               .addCase(getVideoStorageByUserId.fulfilled, (state: VideoState, { payload }: PayloadAction<any>) => {
                    const { videoStorages, total, page, limit, totalPages } = payload;
                    state.status = 'succeeded';
                    state.videoStorages = videoStorages;
                    state.limitVideoStorages = limit;
                    state.pageVideoStorages = page;
                    state.totalPagesVideoStorages = totalPages;
                    state.totalVideoStorages = total;
               })
               .addCase(getVideoStorageByUserId.rejected, (state: VideoState, { payload }: PayloadAction<any>) => {
                    state.status = 'failed';
                    state.error = payload as string;
               });
     },
});

export const { resetStatus, resetVideo, resetAllVideo } = VideoSlice.actions;

const VideoReducer = VideoSlice.reducer;
export default VideoReducer;
