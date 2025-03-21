'use client';

import React from 'react';
import { Button, ConfigProvider, Result } from 'antd';
import { useRouter } from 'next/navigation';

const NotFound = () => {
     const router = useRouter();

     return (
          <div className="min-h-screen flex items-center justify-center">
               <ConfigProvider
                    theme={{
                         token: {
                              colorText: '#FFFFFF',
                              colorTextDescription: '#FFFFFF',
                         },
                    }}
               >
                    <Result
                         status="404"
                         title="404"
                         subTitle="Sorry, the page you visited does not exist."
                         extra={
                              <Button
                                   onClick={() => {
                                        router.push(`/dashboard`);
                                   }}
                                   type="primary"
                              >
                                   Back Home
                              </Button>
                         }
                    />
               </ConfigProvider>
          </div>
     );
};

export default NotFound;
