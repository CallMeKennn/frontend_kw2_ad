// request.ts
import MSTFetch from '@/core/fetch';

export const CountryRequest = {
     getAllCountry() {
          return MSTFetch.get(`/countries`);
     },
};
