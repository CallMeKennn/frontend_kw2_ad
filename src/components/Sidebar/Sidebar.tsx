import { useState } from 'react';
import { BiBrain, BiMovie, BiPieChartAlt2, BiPencil, BiHeading, BiAlignLeft, BiGift, BiStar, BiSave } from 'react-icons/bi';
import './style.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface MenuItem {
     id: string;
     icon: React.ElementType;
     text: string;
     link?: string;
}

const MainMenu: MenuItem[] = [
     { id: 'dashboard', icon: BiMovie, text: 'Trang chủ', link: '/dashboard' },
     { id: 'create-form', icon: BiGift, text: 'Tạo theo chủ đề', link: '/create-form' },
     { id: 'channels-dashboard', icon: BiPencil, text: 'Channels Dashboard', link: '/channels-dashboard' },
     { id: 'video-storage', icon: BiSave, text: 'Video Storage', link: '/video-storage' },
];

// const FreeServices: MenuItem[] = [
//      { id: 'language', icon: BiMovie, text: 'Chuyển Đổi Ngôn Ngữ' },
//      { id: 'video-ideas', icon: BiMovie, text: 'Tạo Ý Tưởng Video' },
//      { id: 'analytics', icon: BiPieChartAlt2, text: 'Phân Tích Video' },
//      { id: 'content', icon: BiPencil, text: 'Tạo Nội Dung Video' },
//      { id: 'title', icon: BiHeading, text: 'Tạo Tiêu Đề Video' },
//      { id: 'description', icon: BiAlignLeft, text: 'Tạo Mô Tả Video' },
// ];

const Sidebar = () => {
     const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
     const route = useRouter();

     const handleMenuClick = (menuId: string) => (e: React.MouseEvent) => {
          setActiveMenuItem(menuId);
     };

     const handleLogout = () => {
          route.push('/auth/login');
          localStorage.removeItem('ACCESS_TOKEN');
          localStorage.removeItem('USER_INFO');
     };

     const MenuItem = ({ id, icon: Icon, text, link = '' }: MenuItem) => (
          <Link
               href={link}
               onClick={handleMenuClick(id)}
               className={`flex items-center px-5 cursor-pointer py-3 text-opacity-70 text-white transition-all duration-300 relative overflow-hidden hover:bg-gradient-to-r hover:from-neon-blue/10 hover:to-transparent hover:text-neon-blue
                    ${
                         activeMenuItem === id
                              ? 'bg-gradient-to-r from-neon-blue/20 to-transparent border-l-3 border-neon-blue text-white'
                              : ''
                    }`}
          >
               <Icon className="w-5 h-5 mr-3 transition-transform duration-300 hover:scale-120 hover:text-neon-blue" />
               {text}
          </Link>
     );

     return (
          <div className="fixed left-0 top-0 w-70 h-screen bg-cyber-light z-10">
               {/* Logo */}
               <div className="neon-border p-5 cursor-pointer" onClick={() => route.push('/')}>
                    <div className="flex items-center space-x-3 cursor-pointer">
                         <BiBrain className="text-2xl text-blue-400" />
                         <span className="neon-text font-syncopate">CreativeAI</span>
                    </div>
               </div>

               {/* Main Menu */}
               <div className="mt-8 ">
                    <div className="text-xs text-blue-400 px-6 mb-2">
                         <BiStar className="inline mr-2" />
                         Menu Chính
                    </div>
                    {MainMenu.map((item) => (
                         <MenuItem key={item.id} {...item} />
                    ))}
               </div>

               {/* Free Services */}
               {/* <div className="mt-8">
                    <div className="text-xs text-blue-400 px-6 mb-2">
                         <BiGift className="inline mr-2" />
                         Dịch vụ miễn phí
                    </div>
                    {FreeServices.map((item) => (
                         <MenuItem key={item.id} {...item} />
                    ))}
               </div> */}
               {/* Auth Buttons */}

               <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                    <button
                         onClick={handleLogout}
                         className="neon-button w-full flex items-center justify-center gap-2 text-sm"
                    >
                         <BiStar className="w-4 h-4" />
                         Đăng xuất
                    </button>
               </div>
          </div>
     );
};

export default Sidebar;
