// request.ts
import MSTFetch from '@/core/fetch';
import { CreateVideoRequest } from './videos.interface';
import qs from 'qs';

export const VideoRequest = {
     createVideoRequest(body: CreateVideoRequest) {
          return MSTFetch.post(`/video-requests`, body);
     },

     getAllVideoByUserId(userId: any, filter: any) {
          return MSTFetch.get(`/videos/user/${userId}?${qs.stringify(filter)}`);
     },
};
