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
import { getAllVideoByUserId } from '@/redux/videos/thunk';
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

interface Props {
     searchText: any;
     onSearchText: any;
     triggerSearch?: boolean;
}

const TableListVideo = ({ searchText, onSearchText, triggerSearch }: Props) => {
     const dispatch = useAppDispatch();
     const [userID, setUserID] = useState<string>('');

     useEffect(() => {
          if (triggerSearch !== undefined) {
               // This will run whenever triggerSearch changes
               handleSearchWithDebounce();
          }
     }, [triggerSearch]);

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

     const { RangePicker } = DatePicker;

     // Progress Color
     const twoColors: ProgressProps['strokeColor'] = {
          '0%': '#108ee9',
          '100%': '#87d068',
     };

     //State Selector
     const limit = useAppSelector(VideoSelector.limit);
     const page = useAppSelector(VideoSelector.page);
     const total = useAppSelector(VideoSelector.total);
     const videos = useAppSelector(VideoSelector.videos);
     const topics = useAppSelector(TopicSelector.topics);
     const countries = useAppSelector(ProjectSelector.countries);

     const [isOpenScriptModal, setIsOpenScriptModal] = useState(false);
     const [scriptContent, setScriptContent] = useState<string | null>(null);
     const [statusFilter, setStatusFilter] = useState('');
     const [countriesFilter, setCountriesFilter] = useState('');
     const [topicsFilter, setTopicsFilter] = useState('');
     const [searchDate, setSearchDate] = useState<any>('');

     //Đây là API để gọi để check liên tục
     // useEffect(() => {

     //      dispatch(getAllVideoByUserId({ userId: userID, filter: { page, limit } }));

     //      const interval = setInterval(() => {
     //           dispatch(getAllVideoByUserId({ userId: userID, filter: { page, limit } }));
     //      }, 5000);

     //      return () => clearInterval(interval);
     // }, [dispatch, userID, page, limit]);

     const listStatusFilter: any = [
          {
               label: (
                    <div className="flex justify-between items-center w-40">
                         <div className="flex items-center gap-2">
                              <CheckCircleOutlined className="text-green-500" /> ALL
                         </div>
                         {statusFilter === '' && <CheckOutlined className="text-blue-500" />}
                    </div>
               ),
               key: '',
          },
          {
               label: (
                    <div className="flex justify-between items-center w-40">
                         <div className="flex items-center gap-2">
                              <CheckCircleOutlined className="text-fuchsia-700" /> Đã tạo xong kịch bản
                         </div>
                         {statusFilter === 'created' && <CheckOutlined className="text-blue-500" />}
                    </div>
               ),
               key: 'created',
          },
          {
               label: (
                    <div className="flex justify-between items-center w-40">
                         <div className="flex items-center gap-2">
                              <ClockCircleOutlined className="text-yellow-500" /> Đã gửi nội dung video
                         </div>
                         {statusFilter === 'sent_create_video' && <CheckOutlined className="text-blue-500" />}
                    </div>
               ),
               key: 'sent_create_video',
          },
          {
               label: (
                    <div className="flex justify-between items-center w-40">
                         <div className="flex items-center gap-2">
                              <CloseCircleOutlined className="text-red-500" /> Đã nhận video
                         </div>
                         {statusFilter === ' receive_video_link_success' && <CheckOutlined className="text-blue-500" />}
                    </div>
               ),
               key: ' receive_video_link_success',
          },
          {
               label: (
                    <div className="flex justify-between items-center w-40">
                         <div className="flex items-center gap-2">
                              <CheckCircleOutlined className="text-orange-700" /> Đã gửi up
                         </div>
                         {statusFilter === 'send_upload_video_success' && <CheckOutlined className="text-blue-500" />}
                    </div>
               ),
               key: 'send_upload_video_success',
          },
          {
               label: (
                    <div className="flex justify-between items-center w-40">
                         <div className="flex items-center gap-2">
                              <ClockCircleOutlined className="text-cyan-400" /> Đang chờ up
                         </div>
                         {statusFilter === 'wait_for_upload_video' && <CheckOutlined className="text-blue-500" />}
                    </div>
               ),
               key: 'wait_for_upload_video',
          },
          {
               label: (
                    <div className="flex justify-between items-center w-40">
                         <div className="flex items-center gap-2">
                              <CloseCircleOutlined className="text-indigo-500" /> Đã up
                         </div>
                         {statusFilter === 'receive_upload_link_success' && <CheckOutlined className="text-blue-500" />}
                    </div>
               ),
               key: 'receive_upload_link_success',
          },
     ];

     useEffect(() => {
          if (userID) {
               dispatch(getAllVideoByUserId({ page, limit }));
               dispatch(getAllCountry({}));
               dispatch(getAllTopic({}));
          }
     }, [dispatch, userID]);

     const returnStatusVideoLocal = (status: string) => {
          const statusMap: Record<string, number> = {
               created: 1,
               sent_create_video_success: 2,
               receive_video_link_success: 3,
               send_upload_video_success: 4,
               wait_for_upload_video: 5,
               receive_upload_video_success: 6,
          };

          const statusIndex = statusMap[status] ?? -1;
          return statusIndex !== -1
               ? { statusIndex: statusIndex - 1, precent: Number(((100 / 6) * statusIndex).toFixed(2)) }
               : null;
     };

     const handleOpenScriptModal = (content: string) => {
          setScriptContent(content);
          setIsOpenScriptModal(true);
     };

     const handleCloseScriptModal = () => {
          setIsOpenScriptModal(false);
     };

     //Search by Status
     const onClickStatusFilter = ({ key }: any) => {
          setStatusFilter(key);
          dispatch(
               getAllVideoByUserId({
                    page,
                    limit,
                    statusVideoLocal: key,
                    countryId: countriesFilter,
                    topicId: topicsFilter,
                    startDate: searchDate[0],
                    endDate: searchDate[1],
                    email: searchText,
               }),
          );
     };

     //Search by country
     const onClickCountriesFilter = ({ key }: any) => {
          setCountriesFilter(key);
          dispatch(
               getAllVideoByUserId({
                    page,
                    limit,
                    statusVideoLocal: statusFilter,
                    countryId: key,
                    topicId: topicsFilter,
                    startDate: searchDate[0],
                    endDate: searchDate[1],
                    email: searchText,
               }),
          );
     };

     //Search by topic
     const onClickTopicFilter = ({ key }: any) => {
          setTopicsFilter(key);
          dispatch(
               getAllVideoByUserId({
                    page,
                    limit,
                    statusVideoLocal: statusFilter,
                    countryId: countriesFilter,
                    topicId: key,
                    startDate: searchDate[0],
                    endDate: searchDate[1],
                    email: searchText,
               }),
          );
     };

     //Search by text
     const handleSearch = () => {
          if (!userID) return;
          dispatch(
               getAllVideoByUserId({
                    page,
                    limit,
                    statusVideoLocal: statusFilter,
                    countryId: countriesFilter,
                    topicId: topicsFilter,
                    startDate: searchDate[0],
                    endDate: searchDate[1],
                    email: searchText,
               }),
          );
     };

     const handleSearchWithDebounce = useDebounce(handleSearch, 700);

     //Search by Date
     const handleDateChange = (dates: any) => {
          if (!dates || dates.length !== 2) {
               setSearchDate(null);
               return;
          }

          const startDate = dates[0].startOf('day').toISOString(); // 00:00:00.000Z
          const endDate = dates[1].endOf('day').toISOString(); // 23:59:59.999Z

          setSearchDate([startDate, endDate]);
          dispatch(
               getAllVideoByUserId({
                    page,
                    limit,
                    statusVideoLocal: statusFilter,
                    countryId: countriesFilter,
                    topicId: topicsFilter,
                    startDate,
                    endDate,
                    email: searchText,
               }),
          );
     };

     const columns = useMemo(() => {
          return [
               {
                    title: 'STT',
                    dataIndex: 'key',
                    // rowScope: 'row',
                    render: (key: any) => <div className="w-5 truncate flex justify-center">{key}</div>,
               },
               {
                    title: 'Tên video',
                    dataIndex: 'videoName',
                    key: 'videoName',
                    render: (videoName: any) => <div className="w-28 truncate">{videoName}</div>,
               },
               {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                    render: (email: any) => (
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
                                   {email.charAt(0).toUpperCase()}
                              </Avatar>
                              <div className="text-sm text-gray-400">{email}</div>
                         </div>
                    ),
               },
               {
                    title: 'Quốc gia',
                    dataIndex: 'countryId',
                    key: 'countryId',
                    render: (countryId: any) => (
                         <div className="truncate">
                              {
                                   countries?.find((item: any) => {
                                        return item._id === countryId;
                                   }).name
                              }
                         </div>
                    ),
               },
               {
                    title: 'Chủ đề',
                    dataIndex: 'topicId',
                    key: 'topicId',
                    render: (topicId: any) => (
                         <div className="truncate">{topics?.find((item: any) => item._id === topicId).topic}</div>
                    ),
               },
               {
                    title: 'Thời gian Upvideo',
                    dataIndex: 'publishDate',
                    key: 'publishDate',
                    render: (publishDate: any) => (
                         <div className="truncate">{moment(publishDate).format('DD/MM/YYYY')}</div>
                    ),
               },
               {
                    title: 'Vị trí hệ thống',
                    dataIndex: 'statusVideoLocal',
                    key: 'statusVideoLocal',
                    render: (publishDate: any) => (
                         <div className="w-40">
                              <ConfigProvider
                                   theme={{
                                        components: {
                                             Progress: {
                                                  colorText: '#FFFFFF',
                                                  remainingColor: '#BEBEBE',
                                             },
                                        },
                                   }}
                              >
                                   <Popover
                                        content={
                                             <div>
                                                  <Steps
                                                       className="text-white"
                                                       progressDot
                                                       // direction="vertical"
                                                       current={returnStatusVideoLocal(publishDate)?.statusIndex}
                                                       items={[
                                                            {
                                                                 title: 'Đã tạo xong kịch bản',
                                                            },
                                                            {
                                                                 title: 'Đã gửi nội dung video',
                                                            },
                                                            {
                                                                 title: 'Đã nhận video',
                                                            },
                                                            {
                                                                 title: 'Đã gửi up',
                                                            },
                                                            {
                                                                 title: 'Đang chờ up',
                                                            },
                                                            {
                                                                 title: 'Đã up',
                                                            },
                                                       ]}
                                                  ></Steps>
                                             </div>
                                        }
                                   >
                                        <Progress
                                             percent={returnStatusVideoLocal(publishDate)?.precent}
                                             strokeColor={twoColors}
                                        />
                                   </Popover>
                              </ConfigProvider>
                         </div>
                    ),
               },
               {
                    title: 'Actions',
                    key: 'actions',
                    render: (record: any) => (
                         <div className="flex gap-2">
                              <Button
                                   type="text"
                                   icon={<EyeOutlined className="text-[#00D1FF]" />}
                                   className="text-primary hover:text-primary-dark"
                                   onClick={() => handleOpenScriptModal(record?.content)}
                              />
                              <Button
                                   type="text"
                                   icon={<EditOutlined className="text-[#00D1FF]" />}
                                   className="text-primary hover:text-primary-dark"
                              />
                              <Button
                                   type="text"
                                   icon={<DeleteOutlined className="text-[#00D1FF]" />}
                                   className="text-primary hover:text-primary-dark"
                              />
                         </div>
                    ),
               },
          ] as ColumnsType<any>;
     }, [countries, topics]);

     const handleChangePage = async (page: any, limit: any) => {
          dispatch(AppAction.showLoading());
          await dispatch(getAllVideoByUserId({ page, limit }));
          dispatch(AppAction.hiddenLoading());
     };

     if (!userID) {
          return <div className="min-h-screen p-8 flex items-center justify-center">Loading...</div>;
     }

     return (
          <>
               {/* Filter */}
               <div className="text-4xl mb-5">Bảng ABC</div>
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
                                        onSearchText(e.target.value);
                                        handleSearchWithDebounce();
                                   }}
                                   prefix={<SearchOutlined />}
                                   placeholder="Tìm kiếm dự án..."
                                   className="w-72 bg-transparent text-white"
                              />

                              <Dropdown menu={{ items: listStatusFilter, onClick: onClickStatusFilter }}>
                                   <Button className="bg-transparent text-white" icon={<FilterOutlined />}>
                                        Trạng thái
                                   </Button>
                              </Dropdown>

                              {!_.isEmpty(countries) && (
                                   <Dropdown
                                        menu={{
                                             items: countries.map((item: any) => ({
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
                                             })),
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

                              <RangePicker
                                   allowClear={true}
                                   className="bg-transparent text-white"
                                   format="YYYY-MM-DD"
                                   value={searchDate ? [dayjs(searchDate[0]), dayjs(searchDate[1])] : null}
                                   onChange={handleDateChange}
                              />
                         </ConfigProvider>
                    </div>
               </div>

               {/* Table */}
               {!_.isEmpty(videos) && (
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
                              dataSource={videos.map((item: any, index: number) => ({
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

               <ModalScript
                    title="Kịch Bản Video"
                    isOpenScriptModal={isOpenScriptModal}
                    content={scriptContent}
                    handleCloseScriptModal={handleCloseScriptModal}
               />
          </>
     );
};

export default TableListVideo;
