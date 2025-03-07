// slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllCountry } from './thunk';
import { CountryState } from '../countries/project.interface';

const initialState: CountryState = {
     countries: null,
     country: null,
     error: null,
     status: 'idle',
};

const CountrySlice = createSlice({
     name: 'countries',
     initialState,
     reducers: {
          resetStatus: (state: CountryState) => {
               state.status = 'idle';
               state.error = null;
          },
          resetCountry: (state: CountryState) => {
               state.country = null;
          },
          resetAllCountry: (state: CountryState) => {
               state.countries = null;
          },
     },
     extraReducers: (builder) => {
          builder
               // Get Project By Id
               .addCase(getAllCountry.pending, (state: CountryState) => {
                    state.status = 'loading';
                    state.error = null;
               })
               .addCase(getAllCountry.fulfilled, (state: CountryState, { payload }: PayloadAction<any>) => {
                    state.status = 'succeeded';
                    state.countries = payload;
               })
               .addCase(getAllCountry.rejected, (state: CountryState, { payload }: PayloadAction<any>) => {
                    state.status = 'failed';
                    state.error = payload as string;
               });
     },
});

export const { resetStatus, resetCountry, resetAllCountry } = CountrySlice.actions;

const CountryReducer = CountrySlice.reducer;
export default CountryReducer;
