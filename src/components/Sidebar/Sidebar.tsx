import { useEffect, useState } from 'react';
import { BiBrain, BiMovie, BiPieChartAlt2, BiPencil, BiHeading, BiAlignLeft, BiGift, BiStar } from 'react-icons/bi';
import './style.css';
import { useRouter } from 'next/navigation';

interface MenuItem {
     id: string;
     icon: React.ElementType;
     text: string;
     link?: string;
}

const MainMenu: MenuItem[] = [
     { id: 'dashboard', icon: BiMovie, text: 'Trang chủ', link: '/dashboard' },
     { id: 'create-form', icon: BiGift, text: 'Tạo theo chủ đề', link: '/create-form' },
     // { id: 'manage-account', icon: BiPencil, text: 'Quản lý account', link: '/manage-account' },
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
     const [activeMenuItem, setActiveMenuItem] = useState('create-form');
     const route = useRouter();

     useEffect(() => {
          const handleMouseMove = (e: MouseEvent) => {
               const hologramElements = document.querySelectorAll('.hologram');
               const { clientX, clientY } = e;
               const centerX = window.innerWidth / 2;
               const centerY = window.innerHeight / 2;

               hologramElements.forEach((element) => {
                    const moveX = (clientX - centerX) / 50;
                    const moveY = (clientY - centerY) / 50;
                    if (element instanceof HTMLElement) {
                         element.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
                    }
               });
          };

          document.addEventListener('mousemove', handleMouseMove);
          return () => document.removeEventListener('mousemove', handleMouseMove);
     }, []);

     const handleMenuClick = (menuId: string, link: string) => (e: React.MouseEvent) => {
          e.preventDefault();
          setActiveMenuItem(menuId);
          route.push(link);
     };

     const handleLogout = () => {
          route.push('/auth/login');
          localStorage.removeItem('ACCESS_TOKEN');
          localStorage.removeItem('USER_INFO');
     };

     const MenuItem = ({ id, icon: Icon, text, link = '' }: MenuItem) => (
          <div
               onClick={handleMenuClick(id, link)}
               className={`flex items-center px-5 cursor-pointer py-3 text-opacity-70 text-white transition-all duration-300 relative overflow-hidden hover:bg-gradient-to-r hover:from-neon-blue/10 hover:to-transparent hover:text-neon-blue
                    ${
                         activeMenuItem === id
                              ? 'bg-gradient-to-r from-neon-blue/20 to-transparent border-l-3 border-neon-blue text-white'
                              : ''
                    }`}
          >
               <Icon className="w-5 h-5 mr-3 transition-transform duration-300 hover:scale-120 hover:text-neon-blue" />
               {text}
          </div>
     );

     return (
          <div className="neon-box fixed left-0 top-0 w-70 h-screen bg-cyber-light z-10">
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
