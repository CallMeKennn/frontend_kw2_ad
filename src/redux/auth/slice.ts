// slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './auth.interface';
import { login } from './thunk';

const initialState: AuthState = {
     auth: null,
     error: null,
     status: 'idle',
};

const AuthSlice = createSlice({
     name: 'auth',
     initialState,
     reducers: {
          resetStatus: (state: AuthState) => {
               state.status = 'idle';
               state.error = null;
          },
          resetAuth: (state: AuthState) => {
               state.auth = null;
          },
     },
     extraReducers: (builder) => {
          builder
               //Login
               .addCase(login.pending, (state: AuthState) => {
                    state.status = 'loading';
                    state.error = null;
               })
               .addCase(login.fulfilled, (state: AuthState, { payload }: PayloadAction<any>) => {
                    state.status = 'succeeded';
                    state.auth = payload;
               })
               .addCase(login.rejected, (state: AuthState, { payload }: PayloadAction<any>) => {
                    state.status = 'failed';
                    state.error = payload as string;
               });
     },
});

export const { resetStatus, resetAuth } = AuthSlice.actions;

const AuthReducer = AuthSlice.reducer;
export default AuthReducer;
