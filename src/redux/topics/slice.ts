// slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TopicState } from './topics.interface';
import { getAllTopic } from './thunk';

const initialState: TopicState = {
     topic: null,
     topics: null,
     error: null,
     status: 'idle',
};

const TopicSlice = createSlice({
     name: 'topic',
     initialState,
     reducers: {
          resetStatus: (state: TopicState) => {
               state.status = 'idle';
               state.error = null;
          },
          resetTopic: (state: TopicState) => {
               state.topic = null;
          },
          resetAllTopic: (state: TopicState) => {
               state.topics = null;
          },
     },
     extraReducers: (builder) => {
          builder
               // Get Project By Id
               .addCase(getAllTopic.pending, (state: TopicState) => {
                    state.status = 'loading';
                    state.error = null;
               })
               .addCase(getAllTopic.fulfilled, (state: TopicState, { payload }: PayloadAction<any>) => {
                    state.status = 'succeeded';
                    state.topics = payload;
               })
               .addCase(getAllTopic.rejected, (state: TopicState, { payload }: PayloadAction<any>) => {
                    state.status = 'failed';
                    state.error = payload as string;
               });
     },
});

export const { resetStatus, resetTopic, resetAllTopic } = TopicSlice.actions;

const TopicReducer = TopicSlice.reducer;
export default TopicReducer;
