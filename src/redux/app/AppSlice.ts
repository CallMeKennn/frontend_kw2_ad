import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
     isLoading: false,
};

const AppSlice = createSlice({
     name: 'app',
     initialState,
     reducers: {
          showLoading: (state: any) => {
               state.isLoading = true;
          },

          hiddenLoading: (state: any) => {
               state.isLoading = false;
          },
     },
});

export const AppAction = AppSlice.actions

const AppReducer = AppSlice.reducer;
export default AppReducer;
