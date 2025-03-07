// selector.ts
import { RootState } from '../store';

export const ProjectSelector = {
     countries: (state: RootState) => state.countries.countries,
     country: (state: RootState) => state.countries.country,
     status: (state: RootState) => state.countries.status,
     error: (state: RootState) => state.countries.error,
};
