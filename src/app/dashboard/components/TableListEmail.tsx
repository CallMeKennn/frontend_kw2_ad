//React
import React from 'react';
import { useEffect, useState, useMemo } from 'react';

//Antd
import {
     EyeOutlined,
     EditOutlined,
     DeleteOutlined,
     SearchOutlined,
     CheckOutlined,
     CheckCircleOutlined,
     ClockCircleOutlined,
     CloseCircleOutlined,
     FilterOutlined,
     CalendarOutlined,
     SortDescendingOutlined,
} from '@ant-design/icons';
import { ConfigProvider, ProgressProps } from 'antd';
import { Button, Dropdown, Input, Progress, Table, Avatar, Steps, Popover, DatePicker } from 'antd';

import type { ColumnsType } from 'antd/es/table';

//API Thunk
import { getAllEmailManageByUserId } from '@/redux/videos/thunk';
import { getAllCountry } from '@/redux/countries/thunk';
import { getAllTopic } from '@/redux/topics/thunk';
import ModalScript from './ModalScript';

//Functions
import { getRandomColor } from '@/units/units';
import { useAppDispatch, useAppSelector } from '@/core/hook';
import { useDebounce } from '@/hooks/hook';

//Libraries
import moment from 'moment';
import _ from 'lodash';
import dayjs from 'dayjs';

//Selector
import { VideoSelector } from '@/redux/videos/selector';
import { TopicSelector } from '@/redux/topics/selector';
import { ProjectSelector } from '@/redux/countries/selector';

import '@ant-design/v5-patch-for-react-19';
import { AppAction } from '@/redux/app/AppSlice';

const TableListEmail = () => {
     const dispatch = useAppDispatch();

     const [userID, setUserID] = useState<string>('');

     useEffect(() => {
          // Check if window is defined (meaning we're on client side)
          if (typeof window !== 'undefined') {
               try {
                    const userInfo = localStorage.getItem('USER_INFO');
                    if (userInfo) {
                         const parsedUserInfo = JSON.parse(userInfo);
                         setUserID(parsedUserInfo._id);
                    }
               } catch (error) {
                    console.error('Error parsing user info:', error);
               }
          }
     }, []);

     const limit = useAppSelector(VideoSelector.limit);
     const page = useAppSelector(VideoSelector.page);
     const total = useAppSelector(VideoSelector.total);

     const topics = useAppSelector(TopicSelector.topics);
     const countries = useAppSelector(ProjectSelector.countries);
     const emails = useAppSelector(VideoSelector.emails);

     useEffect(() => {
          if (userID) {
               dispatch(getAllEmailManageByUserId({ page, limit }));
               dispatch(getAllCountry({}));
               dispatch(getAllTopic({}));
          }
     }, [dispatch, userID]);

     const [searchText, setSearchText] = useState('');
     const [countriesFilter, setCountriesFilter] = useState('');
     const [topicsFilter, setTopicsFilter] = useState('');

     const handleSearchWithDebounce = useDebounce(() => {
          if (!userID) return;
          dispatch(
               getAllEmailManageByUserId({
                    page,
                    limit,
                    countryId: countriesFilter,
                    topicId: topicsFilter,
                    email: searchText,
               }),
          );
     }, 700);

     const columns = useMemo(() => {
          return [
               {
                    title: 'STT',
                    dataIndex: 'key',
                    render: (key: any) => <div className="w-5 truncate flex justify-center">{key}</div>,
               },
               {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                    render: (_: any, record: any) => (
                         <div className="flex items-center gap-2 w-30">
                              <Avatar
                                   shape="circle"
                                   style={{
                                        backgroundColor: getRandomColor(),
                                        width: '40px',
                                        height: '40px',
                                        lineHeight: '40px',
                                   }}
                                   size={40}
                              >
                                   {record.email.charAt(0).toUpperCase()}
                              </Avatar>
                              <div className="text-sm text-gray-400">{record.email}</div>
                         </div>
                    ),
               },
               {
                    title: 'Chủ đề',
                    dataIndex: 'topicId',
                    key: 'topicId',
                    render: (_: any, record: any) => <div className="truncate">{record.topicId.topic}</div>,
               },
               {
                    title: 'Quốc gia',
                    dataIndex: 'country',
                    key: 'country',
                    render: (_: any, record: any) => <div className="truncate">{record.countryId.nation}</div>,
               },
               {
                    title: 'Ngôn ngữ',
                    dataIndex: 'language',
                    key: 'language',
                    render: (_: any, record: any) => <div className="truncate">{record.countryId.name}</div>,
               },
               {
                    title: 'Số Kịch Bản Đã Hoàn Thành',
                    render: (_: any, record: any) => (
                         <div className="truncate">{`${record.scriptVideoCount}/${record.videoCount}`}</div>
                    ),
               },
          ] as ColumnsType<any>;
     }, [emails]);

     //Search by country
     const onClickCountriesFilter = ({ key }: any) => {
          setCountriesFilter(key);
          dispatch(
               getAllEmailManageByUserId({
                    page,
                    limit,
                    countryId: key,
                    topicId: topicsFilter,
                    email: searchText,
               }),
          );
     };

     //Search by topic
     const onClickTopicFilter = ({ key }: any) => {
          setTopicsFilter(key);
          dispatch(
               getAllEmailManageByUserId({
                    page,
                    limit,
                    countryId: countriesFilter,
                    topicId: key,
                    email: searchText,
               }),
          );
     };

     const handleChangePage = async (page: any, limit: any) => {
          dispatch(AppAction.showLoading());
          await dispatch(getAllEmailManageByUserId({ page, limit, countryId: countriesFilter, topicId: topicsFilter }));
          dispatch(AppAction.hiddenLoading());
     };

     return (
          <>
               <div className="text-4xl my-5">Bảng DEF</div>
               <div className="bg-glass-bg bg-transparent backdrop-blur-xl border border-glass-border rounded-2xl p-6 mb-8">
                    <div className="flex gap-4 items-center">
                         <ConfigProvider
                              theme={{
                                   token: {
                                        /* here is your global tokens */
                                   },
                                   components: {
                                        Input: {
                                             hoverBg: 'transparent',
                                             colorBgContainer: 'rgba(255,255,255,0.01)',
                                             colorTextPlaceholder: '#FFFFFF',
                                             colorIcon: '#FFFFFF',
                                        },
                                        DatePicker: {
                                             /* here is your component tokens */
                                             colorTextPlaceholder: '#FFFFFF',
                                             colorIcon: '#FFD700',
                                             colorIconHover: '#FFFFFF',
                                             colorBgTextHover: '#000000',
                                        },
                                   },
                              }}
                         >
                              <Input
                                   value={searchText}
                                   onChange={(e: any) => {
                                        setSearchText(e.target.value);
                                        handleSearchWithDebounce();
                                   }}
                                   prefix={<SearchOutlined />}
                                   placeholder="Tìm kiếm dự án..."
                                   className="w-72 bg-transparent text-white"
                              />

                              {!_.isEmpty(countries) && (
                                   <Dropdown
                                        menu={{
                                             items: [{ _id: '', name: 'Tất cả', nation: 'Tất cả' }, ...countries].map(
                                                  (item: any) => ({
                                                       _id: item._id,
                                                       label: (
                                                            <div className="flex justify-between items-center w-40">
                                                                 <div className="flex items-center gap-2">
                                                                      <ClockCircleOutlined className="text-cyan-400" />
                                                                      {item.name}
                                                                 </div>
                                                                 {countriesFilter === item._id && (
                                                                      <CheckOutlined className="text-blue-500" />
                                                                 )}
                                                            </div>
                                                       ),
                                                       key: item._id,
                                                  }),
                                             ),
                                             onClick: onClickCountriesFilter,
                                        }}
                                   >
                                        <Button className="bg-transparent text-white" icon={<CalendarOutlined />}>
                                             Quốc gia
                                        </Button>
                                   </Dropdown>
                              )}

                              {!_.isEmpty(topics) && (
                                   <Dropdown
                                        menu={{
                                             items: topics.map((item: any) => ({
                                                  _id: item._id,
                                                  label: (
                                                       <div className="flex justify-between items-center w-40">
                                                            <div className="flex items-center gap-2">
                                                                 <ClockCircleOutlined className="text-cyan-400" />
                                                                 {item.topic}
                                                            </div>
                                                            {topicsFilter === item._id && (
                                                                 <CheckOutlined className="text-blue-500" />
                                                            )}
                                                       </div>
                                                  ),
                                                  key: item._id,
                                             })),
                                             onClick: onClickTopicFilter,
                                        }}
                                   >
                                        <Button className="bg-transparent text-white" icon={<SortDescendingOutlined />}>
                                             Chủ đề
                                        </Button>
                                   </Dropdown>
                              )}
                         </ConfigProvider>
                    </div>
               </div>

               {/* Table */}
               {!_.isEmpty(emails) && (
                    <ConfigProvider
                         theme={{
                              components: {
                                   Table: {
                                        /* here is your component tokens */
                                        colorBgContainer: 'transparent',
                                        colorText: 'white',
                                        colorTextHeading: 'white',
                                        headerBg: 'rgba(255,255,255,0.05)',
                                        rowHoverBg: 'rgba(255,255,255,0.01)',
                                        rowSelectedBg: 'rgba(255,255,255,0.05)',
                                        rowSelectedHoverBg: 'rgba(255,255,255,0.05)',
                                   },
                              },
                         }}
                    >
                         <Table
                              columns={columns}
                              dataSource={emails.map((item: any, index: number) => ({
                                   key: (page - 1) * 10 + index + 1,
                                   ...item,
                              }))}
                              className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl"
                              pagination={{
                                   total: total,
                                   pageSize: limit,
                                   showSizeChanger: true,
                                   showTotal: (total, range) => {
                                        return (
                                             <div className="text-white">{`Hiển thị ${range[0]}-${range[1]} của ${total} dự án`}</div>
                                        );
                                   },
                                   onChange: handleChangePage,
                              }}
                         />
                    </ConfigProvider>
               )}
          </>
     );
};

export default TableListEmail;
