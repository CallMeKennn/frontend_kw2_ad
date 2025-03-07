// selector.ts
import { RootState } from '../store';

export const VideoSelector = {
     limit: (state: RootState) => state.videos.limit,
     page: (state: RootState) => state.videos.page,
     total: (state: RootState) => state.videos.total,
     totalPages: (state: RootState) => state.videos.totalPages,
     video: (state: RootState) => state.videos.video,
     videos: (state: RootState) => state.videos.videos,
     status: (state: RootState) => state.videos.status,
     error: (state: RootState) => state.videos.error,
};
