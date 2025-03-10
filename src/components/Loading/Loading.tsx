'use client';

import React from 'react';
import './style.css';
import { useAppSelector } from '@/core/hook';
import { AppSelector } from '@/redux/app/AppSelector';

const FullPageLoading = () => {
     const isLoading = useAppSelector(AppSelector.isLoading);
     return isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="loader">
                    <div className="loader_cube loader_cube--color"></div>
                    <div className="loader_cube loader_cube--glowing"></div>
               </div>
          </div>
     ) : (
          <></>
     );
};

export default FullPageLoading;
