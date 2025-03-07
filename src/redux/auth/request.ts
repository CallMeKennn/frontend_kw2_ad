// request.ts
import MSTFetch from '@/core/fetch';
import { LoginRequest } from './auth.interface';

export const AuthRequest = {
     login(body: LoginRequest) {
          return MSTFetch.post(`/auth/login`, body);
     },
};
