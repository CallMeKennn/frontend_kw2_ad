// request.ts
import MSTFetch from '@/core/fetch';
import { CreateVideoRequest } from './videos.interface';
import qs from 'qs';

export const VideoRequest = {
     createVideoRequest(body: CreateVideoRequest) {
          return MSTFetch.post(`/video-requests`, body);
     },

     getAllVideoByUserId(filter: any) {
          return MSTFetch.get(`/videos/user/me?${qs.stringify(filter)}`);
     },

     getAllEmailManageByUserId(filter: any) {
          return MSTFetch.get(`/video-requests/user/me?${qs.stringify(filter)}`);
     },

     getVideoStorageByUserId(filter: any) {
          return MSTFetch.get(`/video-requests/storage/me?${qs.stringify(filter)}`);
     }
};
