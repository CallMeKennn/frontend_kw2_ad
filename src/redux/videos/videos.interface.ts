export interface VideoState {
     //Paginantion of video
     total: any;
     page: any;
     limit: any;
     totalPages: any;
     video: any;
     videos: any;

     //Pagination of email
     totalEmail: any;
     pageEmail: any;
     limitEmail: any;
     totalPagesEmail: any;
     email: any;
     emails: any;

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
