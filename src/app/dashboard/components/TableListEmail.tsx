//React
import { useEffect, useMemo, useState } from 'react';

//Antd
import {
  CalendarOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import { CiCircleRemove } from 'react-icons/ci';

import { Avatar, Button, ConfigProvider, Dropdown, Input, Table } from 'antd';

import type { ColumnsType } from 'antd/es/table';

//API Thunk
import { getAllCountry } from '@/redux/countries/thunk';
import { getAllTopic } from '@/redux/topics/thunk';
import { getAllEmailManageByUserId } from '@/redux/videos/thunk';

//Functions
import { useAppDispatch, useAppSelector } from '@/core/hook';
import { useDebounce } from '@/hooks/hook';
import { getRandomColor } from '@/units/units';

//Libraries
import _ from 'lodash';

//Selector
import { ProjectSelector } from '@/redux/countries/selector';
import { TopicSelector } from '@/redux/topics/selector';
import { VideoSelector } from '@/redux/videos/selector';

import { AppAction } from '@/redux/app/AppSlice';
import '@ant-design/v5-patch-for-react-19';

interface Props {
     onSearchText: any;
}

const TableListEmail = ({ onSearchText }: Props) => {
     const dispatch = useAppDispatch();

     const [userID, setUserID] = useState<string>('');

     useEffect(() => {
          dispatch(
               getAllEmailManageByUserId({
                    page,
                    limit,
               }),
          );

          const interval = setInterval(() => {
               dispatch(
                    getAllEmailManageByUserId({
                         page,
                         limit,
                    }),
               );
          }, 30 * 60 * 1000);

          return () => clearInterval(interval);
     }, [dispatch, userID]);

     useEffect(() => {
          try {
               const userInfo = localStorage.getItem('USER_INFO');
               if (userInfo) {
                    const parsedUserInfo = JSON.parse(userInfo);
                    setUserID(parsedUserInfo._id);
               }
          } catch (error) {
               console.error('Error parsing user info:', error);
          }
     }, []);

     const limit = useAppSelector(VideoSelector.limitEmail);
     const page = useAppSelector(VideoSelector.pageEmail);
     const total = useAppSelector(VideoSelector.totalEmail);

     const topics = useAppSelector(TopicSelector.topics);
     const countries = useAppSelector(ProjectSelector.countries);
     const emails = useAppSelector(VideoSelector.emails)?.data;
     console.log("🚀 ~ TableListEmail ~ emails:", emails)

     useEffect(() => {
          if (userID) {
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
                         <div
                              className="flex items-center gap-2 w-30 cursor-pointer"
                              onClick={() => {
                                   onSearchText(record.email);
                              }}
                         >
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
                                   {record?.email?.charAt(0).toUpperCase()}
                              </Avatar>
                              <div className="text-sm text-gray-400">{record.email}</div>
                         </div>
                    ),
               },
               {
                    title: 'Chủ đề',
                    dataIndex: 'topicId',
                    key: 'topicId',
                    render: (_: any, record: any) => <div className="truncate">{record.topicId?.topic}</div>,
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
               {
                    title: 'Số Video Đã Hoàn Thành',
                    render: (_: any, record: any) => (
                         <div className="truncate">{`${record?.videoDoneCount}/${record.videoCount}`}</div>
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
          <div className="w-full">
               <div className="text-4xl mb-5">Danh sách Emails</div>
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

                              <Button
                                   onClick={() => {
                                        dispatch(getAllEmailManageByUserId({ page, limit }));
                                        setCountriesFilter('');
                                        setSearchText('');
                                        setTopicsFilter('');
                                   }}
                                   className="bg-transparent text-white"
                                   icon={<CiCircleRemove />}
                              >
                                   Xóa Filter
                              </Button>
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
                              dataSource={emails?.map((item: any, index: number) => ({
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
                                             <div className="text-white">{`Hiển thị ${range[0]}-${range[1]} của ${total} email`}</div>
                                        );
                                   },
                                   onChange: handleChangePage,
                              }}
                         />
                    </ConfigProvider>
               )}
          </div>
     );
};

export default TableListEmail;
