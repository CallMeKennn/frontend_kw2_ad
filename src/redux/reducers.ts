import { combineReducers } from '@reduxjs/toolkit';
import AppReducer from './app/AppSlice';
import CountryReducer from './countries/slice';
import TopicReducer from './topics/slice';
import VideoReducer from './videos/slice';
import AuthReducer from './auth/slice';

export const rootReducer = combineReducers({
     app: AppReducer,
     auth: AuthReducer,
     countries: CountryReducer,
     topics: TopicReducer,
     videos: VideoReducer,
});
