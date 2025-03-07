export interface AuthState {
     auth: any;
     status: 'idle' | 'loading' | 'succeeded' | 'failed';
     error: string | null;
}

export interface LoginRequest {
     email: any;
     password: any;
}
