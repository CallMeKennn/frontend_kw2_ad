import React from 'react';
import CreateFormPage from './components/CreateFormPage';

const page = () => {
     console.log('GỌi lại');

     return (
          <div className="bg-slate-950 min-h-screen flex justify-center items-center">
               <div className="w-full max-w-lg">
                    <CreateFormPage />
               </div>
          </div>
     );
};

export default page;
