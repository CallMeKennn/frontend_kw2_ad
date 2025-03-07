'use client';

import DesktopNav from '@/components/Sidebar/DesktopNav';
import MobileNav from '@/components/Sidebar/MobileNav';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fullPagePaths = ['/auth', '/en/auth', '/vi/auth'];
  const homePaths = ['/', '/en', '/vi'];
  const isFullPage = fullPagePaths.some(path => pathname.startsWith(path)) || 
                    homePaths.some(path => pathname === path);

  if (!mounted || isFullPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  return isMobile ? (
    <MobileNav>{children}</MobileNav>
  ) : (
    <DesktopNav>{children}</DesktopNav>
  );
}