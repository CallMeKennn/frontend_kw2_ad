// request.ts
import MSTFetch from '@/core/fetch';

export const TopicRequest = {
     getAllTopic() {
          return MSTFetch.get(`/stories`);
     },
};
