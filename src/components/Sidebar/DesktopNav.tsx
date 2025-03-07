'use client';

import Sidebar from './Sidebar';

interface DesktopNavProps {
  children: React.ReactNode;
}

export default function DesktopNav({ children }: DesktopNavProps) {
  return (
    <div className="relative min-h-screen bg-cyber-dark text-white">
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 w-[280px] z-40">
        <Sidebar />
      </div>

      {/* Main Content with padding */}
      <main className="pl-[280px] min-h-screen">
        {children}
      </main>
    </div>
  );
}