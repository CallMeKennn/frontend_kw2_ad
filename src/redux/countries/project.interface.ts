export interface CountryState {
     countries: any;
     country: any;
     status: 'idle' | 'loading' | 'succeeded' | 'failed';
     error: string | null;
}
