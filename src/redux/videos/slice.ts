// slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoState } from './videos.interface';
import { createVideo, getAllVideoByUserId, getAllEmailManageByUserId } from './thunk';
import { toast } from 'react-toastify';

const initialState: VideoState = {
     //Paginantion of video
     total: null,
     page: 1,
     limit: 10,
     totalPages: null,
     videos: [],
     video: null,

     //Pagination of email
     totalEmail: null,
     pageEmail: 1,
     limitEmail: 10,
     totalPagesEmail: null,
     email: null,
     emails: null,

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
                    const { processedCount, totalSuccess } = payload;
                    state.status = 'succeeded';
                    totalSuccess == 0
                         ? toast.error(`Lỗi tạo video`)
                         : toast.success(`Tạo thành công ${totalSuccess}/${processedCount}`);
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
                    toast.success('Lấy list video thành công');
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
                    const { videoRequests, total, page, limit, totalPages } = payload.data;
                    state.status = 'succeeded';
                    state.emails = videoRequests;
                    state.limitEmail = limit;
                    state.pageEmail = page;
                    state.totalPagesEmail = totalPages;
                    state.totalEmail = total;
                    toast.success('Lấy list email thành công');
               })
               .addCase(getAllEmailManageByUserId.rejected, (state: VideoState, { payload }: PayloadAction<any>) => {
                    state.status = 'failed';
                    state.error = payload as string;
               });
     },
});

export const { resetStatus, resetVideo, resetAllVideo } = VideoSlice.actions;

const VideoReducer = VideoSlice.reducer;
export default VideoReducer;
