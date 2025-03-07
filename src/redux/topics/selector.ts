// selector.ts
import { RootState } from '../store';

export const TopicSelector = {
     topic: (state: RootState) => state.topics.topic,
     topics: (state: RootState) => state.topics.topics,
     status: (state: RootState) => state.topics.status,
     error: (state: RootState) => state.topics.error,
};
