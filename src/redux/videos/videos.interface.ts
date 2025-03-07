export interface VideoState {
     total: any;
     page: any;
     limit: any;
     totalPages: any;
     video: any;
     videos: any;
     status: 'idle' | 'loading' | 'succeeded' | 'failed';
     error: string | null;
}

export interface CreateVideoRequest {
     videoCount: number;
     topicId: string;
     countryId: string;
     startDate: string;
     email: string;
}
