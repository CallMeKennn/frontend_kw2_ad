'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/hook';

import { getAllTopic } from '@/redux/topics/thunk';
import { createVideo } from '@/redux/videos/thunk';

import { ProjectSelector } from '@/redux/countries/selector';
import { TopicSelector } from '@/redux/topics/selector';
import { AppAction } from '@/redux/app/AppSlice';

import { useRouter } from 'next/navigation';

import _ from 'lodash';

interface FormDataItem {
     videoCount: number;
     topicId: string;
     countryId: string;
     startDate?: string;
}

interface Country {
     _id: string;
     name: string;
}

const CreateFormPage = () => {
     const dispatch = useAppDispatch();
     const router = useRouter();

     // State selector
     const topics = useAppSelector(TopicSelector.topics);
     const status = useAppSelector(ProjectSelector.status);
     console.log('🔍 ~  ~ frontend_kw2_ad/src/app/create-form/components/CreateFormPage.tsx:35 ~ status:', status);

     const [formData, setFormData] = useState<FormDataItem[]>([]);
     const [videoCount, setVideoCount] = useState(1);
     const [topicId, setTopicId] = useState('');
     const [startDate, setStartDate] = useState('');
     const [topicCountries, setTopicCountries] = useState<Country[]>([]);
     const [errors, setErrors] = React.useState<any>({});

     useEffect(() => {
          dispatch(getAllTopic({}));
     }, []);

     useEffect(() => {
          switch (status) {
               case 'loading':
                    dispatch(AppAction.showLoading());
                    break;
               case 'succeeded':
                    dispatch(AppAction.hiddenLoading());
                    break;
               case 'failed':
               default:
                    dispatch(AppAction.hiddenLoading());
                    break;
          }
     }, [status]);

     useEffect(() => {
          if (topicId && topics.length > 0) {
               const selectedTopic = topics.find((topic: any) => topic._id === topicId);

               if (selectedTopic) {
                    // Cập nhật số lượng video từ topic
                    if (selectedTopic.countVideo) {
                         setVideoCount(selectedTopic.countVideo);
                    }

                    // Xử lý các ngôn ngữ từ folderLang
                    if (selectedTopic.folderLang && selectedTopic.folderLang.length > 0) {
                         const countries = selectedTopic.folderLang.map((item: any) => ({
                              _id: item.language._id,
                              name: item.language.name,
                         }));
                         setTopicCountries(countries);

                         // Tạo formData mới với tất cả ngôn ngữ được chọn sẵn
                         const newFormData = countries.map((country: any) => ({
                              videoCount: selectedTopic.countVideo || videoCount,
                              topicId,
                              countryId: country._id,
                              ...(startDate.trim() !== '' ? { startDate } : {}),
                         }));

                         setFormData(newFormData);
                    } else {
                         setTopicCountries([]);
                         setFormData([]);
                    }
               } else {
                    setTopicCountries([]);
                    setFormData([]);
               }
          } else {
               setTopicCountries([]);
               setFormData([]);
          }
     }, [topicId, topics]);

     // Cập nhật formData khi videoCount hoặc startDate thay đổi
     useEffect(() => {
          if (formData.length > 0) {
               setFormData((prevFormData) =>
                    prevFormData.map((item) => ({
                         ...item,
                         videoCount,
                         ...(startDate.trim() !== '' ? { startDate } : {}),
                    })),
               );
          }
     }, [videoCount, startDate]);

     const handleCountryChange = (e: any, countryId: string) => {
          const checked = e.target.checked;

          setFormData((prev) => {
               if (checked) {
                    // Kiểm tra xem countryId đã tồn tại trong formData chưa
                    if (!prev.some((item) => item.countryId === countryId)) {
                         const newItem: FormDataItem = {
                              videoCount,
                              topicId,
                              countryId,
                         };

                         if (startDate.trim() !== '') {
                              newItem.startDate = startDate;
                         }

                         return [...prev, newItem];
                    }
                    return prev;
               } else {
                    return prev.filter((item) => item.countryId !== countryId);
               }
          });
     };

     const validateForm = () => {
          const newErrors: any = {};

          if (_.isEmpty(topicId)) newErrors.topicId = 'Phải chọn chủ đề';
          if (_.isEmpty(formData)) newErrors.formData = 'Phải chọn ít nhất một quốc gia';

          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
     };

     const handleSubmit = async (e: any) => {
          e.preventDefault();
          if (validateForm()) {
               // dispatch(AppAction.showLoading());
               const data = await Promise.all(formData.map((videoRequest: any) => dispatch(createVideo(videoRequest))));
               setTimeout(() => {
                    dispatch(AppAction.hiddenLoading());
                    if (data) {
                         router.push('/create-form');
                    }
               }, 2000);
          }
     };

     return (
          <div className="max-w-lg mx-auto p-6 rounded-lg shadow-lg bg-slate-600">
               <h2 className="text-2xl font-semibold text-center ">Biểu mẫu nhập liệu</h2>
               <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                         <label className="block font-medium">Chủ đề *</label>
                         <select
                              value={topicId}
                              onChange={(e) => setTopicId(e.target.value)}
                              className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300 bg-[rgba(255,255,255,0.05)]"
                         >
                              <option className="text-black" value="">
                                   Chọn chủ đề
                              </option>
                              {topics &&
                                   topics.map((item: any) => (
                                        <option className="text-black" key={item._id} value={item._id}>
                                             {item.topic}
                                        </option>
                                   ))}
                         </select>
                         {errors.topicId && <p className="text-red-500 text-sm">{errors.topicId}</p>}
                    </div>

                    <div>
                         <label className="block font-medium">Số lượng video *</label>
                         <input
                              type="number"
                              min="1"
                              value={videoCount === 0 ? '' : videoCount}
                              onChange={(e) => {
                                   const value = e.target.value;
                                   if (value === '' || /^\d*$/.test(value)) {
                                        setVideoCount(value === '' ? 0 : Math.max(1, Number(value)));
                                   }
                              }}
                              onBlur={(e) => {
                                   if (e.target.value === '' || Number(e.target.value) < 1) {
                                        setVideoCount(1);
                                   }
                              }}
                              onKeyDown={(e) => {
                                   if (
                                        !/[0-9]/.test(e.key) &&
                                        e.key !== 'Backspace' &&
                                        e.key !== 'Delete' &&
                                        e.key !== 'ArrowLeft' &&
                                        e.key !== 'ArrowRight' &&
                                        e.key !== 'Tab'
                                   ) {
                                        e.preventDefault();
                                   }
                              }}
                              className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300 bg-[rgba(255,255,255,0.05)]"
                         />
                    </div>

                    {topicId && topicCountries.length > 0 && (
                         <div>
                              <label className="block font-medium">Ngôn ngữ *</label>
                              {topicCountries.map(({ _id, name }: any) => (
                                   <div key={_id} className="mb-2">
                                        <div className="flex items-center space-x-2">
                                             <input
                                                  type="checkbox"
                                                  id={_id}
                                                  value={_id}
                                                  checked={formData.some((item) => item.countryId === _id)}
                                                  onChange={(e) => handleCountryChange(e, _id)}
                                             />
                                             <label htmlFor={_id}>{name}</label>
                                        </div>
                                   </div>
                              ))}
                              {errors.formData && <p className="text-red-500 text-sm">{errors.formData}</p>}
                         </div>
                    )}

                    <div>
                         <label className="block font-medium">Ngày giờ *</label>
                         <input
                              type="datetime-local"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300 bg-[rgba(255,255,255,0.05)]"
                         />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700">
                         Gửi thông tin
                    </button>
               </form>
          </div>
     );
};

export default CreateFormPage;
