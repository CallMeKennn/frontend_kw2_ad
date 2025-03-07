'use client';

import { Button } from '@/components/ui/button';
import { ChevronsRight } from 'lucide-react';
import { useState } from 'react';
import Sidebar from './Sidebar';

interface MobileNavProps {
  children: React.ReactNode;
}

export default function MobileNav({ children }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-cyber-dark text-white">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-[50%] -translate-y-1/2
          w-5 h-10
          bg-[#CE640C] hover:bg-[#CE640C]/90
          rounded-r-md
          flex items-center justify-center
          transition-all duration-300
          z-50
          ${ isOpen ? 'left-[280px]' : 'left-0' }
        `}
      >
        <ChevronsRight
          className={` text-white transition-transform duration-300 ${ isOpen ? 'rotate-180' : '' }`} />
      </Button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 bottom-0
          w-[280px] 
          transform 
          transition-transform duration-300 ease-in-out
          ${ isOpen ? 'translate-x-0' : '-translate-x-full' }
          z-40
        `}
      >
        <Sidebar />
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 left-[280px] bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={`
        min-h-screen
        transition-[padding] duration-300
        ${ isOpen ? 'pl-[280px]' : 'pl-0' }
      `}>
        {children}
      </main>
    </div>
  );
}