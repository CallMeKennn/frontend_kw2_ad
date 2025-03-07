// selector.ts
import { RootState } from '../store';

export const AuthSelector = {
     auth: (state: RootState) => state.auth.auth,
     status: (state: RootState) => state.auth.status,
     error: (state: RootState) => state.auth.error,
};
