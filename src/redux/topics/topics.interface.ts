// project.interface.ts
export interface TopicState {
     topic: any;
     topics: any;
     status: 'idle' | 'loading' | 'succeeded' | 'failed';
     error: string | null;
}
