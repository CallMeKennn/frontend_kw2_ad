'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingLogin from '@/components/ui/loading-login';
import { PasswordInput } from '@/components/ui/password-input';
// import { loginUserThunk } from '@/redux/auth/thunk';
import { AppDispatch } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, LockKeyholeIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/core/hook';
import { AuthSelector } from '@/redux/auth/selector';
import { login } from '@/redux/auth/thunk';
import { z } from 'zod';
import { AppAction } from '@/redux/app/AppSlice';
import './auth.style.css';

const formSchema = z.object({
     email: z.string().min(4, {
          message: 'Please enter email correctly.',
     }),
     password: z.string().min(4, {
          message: 'Password must be at least 4 characters.',
     }),
});

// Create particles function
function createParticles() {
     if (typeof window !== 'undefined') {
          const container = document.getElementById('particles');
          if (!container) return;

          // Cleanup existing particles
          container.innerHTML = '';

          const particleCount = 50;
          for (let i = 0; i < particleCount; i++) {
               const particle = document.createElement('div');
               particle.className = 'particle';
               particle.style.left = `${Math.random() * 100}vw`;
               particle.style.animationDelay = `${Math.random() * 10}s`;
               particle.style.animationDuration = `${5 + Math.random() * 10}s`; // Random duration
               container.appendChild(particle);
          }
     }
}

export default function LoginPage() {
     const dispatch = useAppDispatch();
     const router = useRouter();

     //State selector
     const loading = useAppSelector(AuthSelector.status);

     //Ref
     const formRef = useRef<HTMLDivElement>(null);
     const containerRef = useRef<HTMLDivElement>(null);

     const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
               email: 'hken@gmail.com',
               password: '123456',
          },
     });

     useEffect(() => {
          // Create particles
          createParticles();

          // Add parallax effect to container
          const container = containerRef.current;
          if (container) {
               const handleMouseMove = (e: MouseEvent) => {
                    const { clientX, clientY } = e;
                    const { innerWidth, innerHeight } = window;

                    const moveX = ((clientX - innerWidth / 2) / innerWidth) * 20;
                    const moveY = ((clientY - innerHeight / 2) / innerHeight) * 20;

                    container.style.transform = `translate(${moveX}px, ${moveY}px)`;
               };

               document.addEventListener('mousemove', handleMouseMove);
               return () => document.removeEventListener('mousemove', handleMouseMove);
          }
     }, []);

     useEffect(() => {
          // Add hover effect to form
          const form = formRef.current;
          if (form) {
               const handleMouseMove = (e: MouseEvent) => {
                    const { left, top, width, height } = form.getBoundingClientRect();
                    const x = (e.clientX - left) / width;
                    const y = (e.clientY - top) / height;

                    const rotateX = (y - 0.5) * 10;
                    const rotateY = (x - 0.5) * 10;

                    form.style.transform = `
          perspective(1000px)
          rotateX(${-rotateX}deg)
          rotateY(${rotateY}deg)
          translateZ(10px)
        `;

                    // Dynamic shadow
                    const shadowX = (x - 0.5) * 20;
                    const shadowY = (y - 0.5) * 20;
                    form.style.boxShadow = `
          ${shadowX}px ${shadowY}px 30px rgba(0,245,255,0.2),
          ${shadowX * 2}px ${shadowY * 2}px 60px rgba(157,78,221,0.1)
        `;
               };

               const handleMouseLeave = () => {
                    form.style.transform = '';
                    form.style.boxShadow = '';
                    setTimeout(() => {
                         form.style.animation = 'boxFloat 3s ease-in-out infinite';
                    }, 100);
               };

               form.addEventListener('mousemove', handleMouseMove);
               form.addEventListener('mouseleave', handleMouseLeave);

               return () => {
                    form.removeEventListener('mousemove', handleMouseMove);
                    form.removeEventListener('mouseleave', handleMouseLeave);
               };
          }
     }, []);

     // Prefetch routes
     useEffect(() => {
          router.prefetch('/dashboard');
          router.prefetch('/create-form');
     }, [router]);

     async function onSubmit(values: z.infer<typeof formSchema>) {
          try {
               dispatch(AppAction.showLoading());
               const dataLogin = await dispatch(login({ email: values.email, password: values.password })).unwrap();
               localStorage.setItem('ACCESS_TOKEN', dataLogin.accessToken);
               localStorage.setItem('USER_INFO', JSON.stringify(dataLogin.user));
               setTimeout(() => {
                    if (dataLogin) {
                         dispatch(AppAction.hiddenLoading());
                         router.push(`/create-form`);
                    }
               }, 2000);
          } catch (error: unknown) {
               dispatch(AppAction.hiddenLoading());
               const toastId = toast.error(error as string);
               toast.dismiss(toastId);
          }
     }

     return (
          <div className="relative min-h-screen w-full overflow-hidden bg-cyber-dark text-white font-space-grotesk">
               <div
                    ref={containerRef}
                    className="relative min-h-screen w-full transition-transform duration-300 ease-out"
               >
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                         <div ref={formRef} className="neon-box w-full max-w-md p-8 mx-auto relative">
                              <div className="text-center mb-8">
                                   <div className="flex items-center justify-center mb-6">
                                        <div
                                             className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 
                              flex items-center justify-center transform hover:scale-110 transition-transform"
                                        >
                                             <i className="fas fa-brain text-2xl"></i>
                                        </div>
                                   </div>
                                   <h1 className="glitch-text text-3xl font-bold mb-2">CreativeAI</h1>
                                   <p className="text-blue-300 opacity-80">Truy cập vào vũ trụ sáng tạo của bạn</p>
                              </div>
                              <Form {...form}>
                                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        {/* Email Field */}
                                        <FormField
                                             control={form.control}
                                             name="email"
                                             render={({ field }) => (
                                                  <FormItem>
                                                       <FormLabel className="form-label block mb-2">Email</FormLabel>
                                                       <FormControl>
                                                            <div className="relative group">
                                                                 <Input
                                                                      className="cyber-input pl-10"
                                                                      placeholder="Nhập email của bạn"
                                                                      type="email"
                                                                      {...field}
                                                                 />
                                                            </div>
                                                       </FormControl>
                                                       <FormMessage className="form-message mt-1" />
                                                  </FormItem>
                                             )}
                                        />

                                        {/* Password Field */}
                                        <FormField
                                             control={form.control}
                                             name="password"
                                             render={({ field }) => (
                                                  <FormItem>
                                                       <FormLabel className="form-label block mb-2">Mật khẩu</FormLabel>
                                                       <FormControl>
                                                            <div className="relative group">
                                                                 <PasswordInput
                                                                      className="cyber-input pl-10"
                                                                      placeholder="Nhập mật khẩu"
                                                                      {...field}
                                                                 />
                                                            </div>
                                                       </FormControl>
                                                       <FormMessage className="form-message mt-1" />
                                                       <div className="text-right mt-2">
                                                            <Link
                                                                 href="/auth/forgot-password"
                                                                 className="cyber-link text-sm inline-block hover:translate-y-px transition-transform relative z-10 pointer-events-auto"
                                                            >
                                                                 Quên mật khẩu?
                                                            </Link>
                                                       </div>
                                                  </FormItem>
                                             )}
                                        />

                                        {/* Submit Button */}
                                        <Button type="submit" className="cyber-button w-full h-12 mt-6">
                                             <span className="relative z-[2] flex items-center">
                                                  Đăng nhập
                                                  <LoaderCircle className="animate-spin" />
                                             </span>
                                        </Button>
                                   </form>
                              </Form>
                         </div>
                    </div>
               </div>
          </div>
     );
}
