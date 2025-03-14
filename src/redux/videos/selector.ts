// selector.ts
import { RootState } from '../store';

export const VideoSelector = {
     //Paginantion of video
     limit: (state: RootState) => state.videos.limit,
     page: (state: RootState) => state.videos.page,
     total: (state: RootState) => state.videos.total,
     totalPages: (state: RootState) => state.videos.totalPages,
     video: (state: RootState) => state.videos.video,
     videos: (state: RootState) => state.videos.videos,

     //Pagination of email
     limitEmail: (state: RootState) => state.videos.limitEmail,
     pageEmail: (state: RootState) => state.videos.pageEmail,
     totalEmail: (state: RootState) => state.videos.totalEmail,
     totalPagesEmail: (state: RootState) => state.videos.totalPagesEmail,
     email: (state: RootState) => state.videos.email,
     emails: (state: RootState) => state.videos.emails,

     //error and status
     status: (state: RootState) => state.videos.status,
     error: (state: RootState) => state.videos.error,
};
