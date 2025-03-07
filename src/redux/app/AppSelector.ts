import { RootState } from '../store';

export const AppSelector = {
     isLoading: (state: RootState) => state.app.isLoading,
};
