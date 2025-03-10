'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
     const callbackRef = useRef(callback);
     const timeoutRef = useRef<number | undefined>(0);
     useEffect(() => {
          callbackRef.current = callback;
     }, [callback]);

     const debouncedCallback = useCallback(
          (...args: Parameters<T>) => {
               if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
               }
               timeoutRef.current = window.setTimeout(() => {
                    callbackRef.current(...args);
               }, delay);
          },
          [delay],
     );

     // Cleanup on unmount
     useEffect(() => {
          return () => {
               if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
               }
          };
     }, []);

     return debouncedCallback;
}
