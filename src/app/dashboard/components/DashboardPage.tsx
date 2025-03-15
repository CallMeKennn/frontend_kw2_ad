'use client';

import React, { useCallback, useState } from 'react';
import TableListVideo from './TableListVideo';
import TableListEmail from './TableListEmail';

const DashboardPage = () => {
     const [searchText, setSearchText] = useState('');

     const [triggerSearch, setTriggerSearch] = useState(false);

     const handleSearchTextUpdate = useCallback((text: string) => {
          setSearchText(text);
          setTriggerSearch((prev) => !prev);
     }, []);

     return (
          <div className="min-h-screen p-8">
               <TableListVideo searchText={searchText} onSearchText={setSearchText} triggerSearch={triggerSearch} />
               <TableListEmail onSearchText={handleSearchTextUpdate} />
          </div>
     );
};

export default DashboardPage;
