'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const Layouts = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const fullPageRoutes = ['/login', '/register', '/forgot-password'];
  const isFullPage = fullPageRoutes.includes(path);

  if (isFullPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <>
      {/* Background Effects */}
      <div className="cyber-grid" />
      <div className="abstract-bg" />
      <div className="grid-pattern" />

      {/* Main Layout */}
      {children}
    </>
  );
};

export default Layouts;