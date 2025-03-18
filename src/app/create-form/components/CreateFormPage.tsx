'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/hook';

import { getAllCountry } from '@/redux/countries/thunk';
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
     email?: string;
}

const CreateFormPage = () => {
     const dispatch = useAppDispatch();
     const router = useRouter();

     // State selector
     const topics = useAppSelector(TopicSelector.topics);
     const countries = useAppSelector(ProjectSelector.countries);
     const status = useAppSelector(ProjectSelector.status);

     const [formData, setFormData] = useState<FormDataItem[]>([]);
     const [videoCount, setVideoCount] = useState(1);
     const [topicId, setTopicId] = useState('');
     const [startDate, setStartDate] = useState('');
     const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
     const [errors, setErrors] = React.useState<any>({});

     useEffect(() => {
          dispatch(getAllCountry({}));
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

               //Gán video count
               if (selectedTopic && selectedTopic.countVideo) {
                    setVideoCount(selectedTopic.countVideo);
               }

               //Gán Language và Email
               if (selectedTopic && selectedTopic.language) {
                    const languageIds = selectedTopic.language.map((lang: any) => lang._id);

                    setAvailableLanguages(languageIds);

                    const newFormData = languageIds.map((countryId: any) => {
                         const item: FormDataItem = {
                              videoCount,
                              topicId,
                              countryId,
                         };

                         if (startDate.trim() !== '') {
                              item.startDate = startDate;
                         }

                         return item;
                    });

                    setFormData(newFormData);
               } else {
                    setAvailableLanguages([]);
                    setFormData([]);
                    setVideoCount(1);
               }
          } else {
               setAvailableLanguages([]);
               setFormData([]);
               setVideoCount(1);
          }
     }, [topicId, topics, startDate]);

     const handleCountryChange = (e: any, countryId: string) => {
          const checked = e.target.checked;

          setFormData((prev) => {
               if (checked) {
                    const newItem: FormDataItem = {
                         videoCount,
                         topicId,
                         countryId,
                    };

                    if (startDate.trim() !== '') {
                         newItem.startDate = startDate;
                    }

                    return [...prev, newItem];
               } else {
                    return prev.filter((item) => item.countryId !== countryId);
               }
          });
     };

     const handleEmailChange = (e: any, countryId: string) => {
          const email = e.target.value;
          setFormData((prev) =>
               prev.map((item) =>
                    item.countryId === countryId
                         ? email.trim() !== ''
                              ? { ...item, email }
                              : _.omit(item, 'email')
                         : item,
               ),
          );
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
               dispatch(AppAction.showLoading());
               const data = await Promise.all(formData.map((videoRequest: any) => dispatch(createVideo(videoRequest))));
               setTimeout(() => {
                    dispatch(AppAction.hiddenLoading());
                    if (data) {
                         router.push('/create-form');
                    }
               }, 2000);
          }
     };

     // Kiểm tra xem một quốc gia có khả dụng không
     const isCountryAvailable = (countryId: string) => {
          return availableLanguages.includes(countryId);
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
                              value={videoCount}
                              onChange={(e) => setVideoCount(Number(e.target.value))}
                              className="w-full border p-2 rounded-md focus:ring focus:ring-blue-300 bg-[rgba(255,255,255,0.05)]"
                         />
                    </div>

                    <div>
                         <label className="block font-medium">Ngôn ngữ và Email *</label>
                         {countries &&
                              countries.map(({ _id, name }: any) => (
                                   <div key={_id} className="mb-2">
                                        <div className="flex items-center space-x-2">
                                             <input
                                                  type="checkbox"
                                                  id={_id}
                                                  value={_id}
                                                  disabled={!isCountryAvailable(_id)}
                                                  checked={formData.some((item) => item.countryId === _id)}
                                                  onChange={(e) => handleCountryChange(e, _id)}
                                                  className={!isCountryAvailable(_id) ? 'opacity-50' : ''}
                                             />
                                             <label
                                                  htmlFor={_id}
                                                  className={!isCountryAvailable(_id) ? 'text-gray-400' : ''}
                                             >
                                                  {name}
                                             </label>
                                        </div>
                                        {formData.some((item) => item.countryId === _id) && (
                                             <input
                                                  type="email"
                                                  value={formData.find((item) => item.countryId === _id)?.email || ''}
                                                  onChange={(e) => handleEmailChange(e, _id)}
                                                  placeholder={`Email cho ${name}`}
                                                  className="w-full mt-2 border p-2 rounded-md focus:ring focus:ring-blue-300 text-black"
                                             />
                                        )}
                                   </div>
                              ))}
                         {errors.formData && <p className="text-red-500 text-sm">{errors.formData}</p>}
                    </div>

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
