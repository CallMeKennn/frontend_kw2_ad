'use client';

import React from 'react';
import TableListVideo from './TableListVideo';
import TableListEmail from './TableListEmail';

const DashboardPage = () => {
     return (
          <div className="min-h-screen p-8">
               <TableListVideo />
               <TableListEmail />
          </div>
     );
};

export default DashboardPage;
