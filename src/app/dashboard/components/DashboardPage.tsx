'use client';

import React from 'react';
import { useEffect, useState, useMemo } from 'react';
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
} from '@ant-design/icons';
import { ConfigProvider, ProgressProps } from 'antd';
import { getRandomColor } from '@/units/units';
import { Button, Dropdown, Input, Progress, Table, Avatar, Steps, Popover } from 'antd';
import { useAppDispatch, useAppSelector } from '@/core/hook';
import { VideoSelector } from '@/redux/videos/selector';
import type { ColumnsType } from 'antd/es/table';
import { getAllVideoByUserId } from '@/redux/videos/thunk';
import moment from 'moment';
import ModalScript from './ModalScript';
import _ from 'lodash';

const DashboardPage = () => {
     const dispatch = useAppDispatch();
     const userID = JSON.parse(localStorage.getItem('USER_INFO') || '')._id;

     // Progress Color
     const twoColors: ProgressProps['strokeColor'] = {
          '0%': '#108ee9',
          '100%': '#87d068',
     };

     //State Selector
     const limit = useAppSelector(VideoSelector.limit);
     const page = useAppSelector(VideoSelector.page);
     const total = useAppSelector(VideoSelector.total);
     const totalPages = useAppSelector(VideoSelector.totalPages);
     const videos = useAppSelector(VideoSelector.videos);

     const [isOpenScriptModal, setIsOpenScriptModal] = useState(true);
     const [scriptContent, setScriptContent] = useState<string | null>(null);
     const [statusFilter, setStatusFilter] = useState('');

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
          dispatch(getAllVideoByUserId({ userId: userID, filter: { page, limit } }));
     }, []);

     const returnStatusVideoLocal = (status: string) => {
          const statusMap: Record<string, number> = {
               created: 1,
               sent_create_video: 2,
               receive_video_link_success: 3,
               send_upload_video_success: 4,
               wait_for_upload_video: 5,
               receive_upload_link_success: 6,
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

     const onClick = ({ key }: any) => {
          setStatusFilter(key);
          dispatch(getAllVideoByUserId({ userId: userID, filter: { page, limit, status: statusFilter } }));
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
               //Còn 2 trường chủ đề và quốc gia
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
     }, []);

     const handleChangePage = (page: any, limit: any) => {
          dispatch(getAllVideoByUserId({ userId: userID, filter: { page, limit } }));
     };

     return (
          <div className="min-h-screen p-8">
               {/* Filter */}
               <div className="bg-glass-bg bg-transparent backdrop-blur-xl border border-glass-border rounded-2xl p-6 mb-8">
                    <div className="flex gap-4 items-center">
                         <ConfigProvider
                              theme={{
                                   components: {
                                        Input: {
                                             hoverBg: 'transparent',
                                             colorBgContainer: 'rgba(255,255,255,0.01)',
                                             colorTextPlaceholder: '#FFFFFF',
                                             colorIcon: '#FFFFFF',
                                        },
                                   },
                              }}
                         >
                              <Input
                                   // value={search}
                                   // onChange={(e: any) => {
                                   //      setSearch(e.target.value);
                                   //      handleSearchWithDebounce();
                                   // }}
                                   prefix={<SearchOutlined />}
                                   placeholder="Tìm kiếm dự án..."
                                   className="w-72 bg-transparent text-white"
                              />
                         </ConfigProvider>

                         <Dropdown menu={{ items: listStatusFilter, onClick }}>
                              <Button className="bg-transparent text-white" icon={<FilterOutlined />}>
                                   Trạng thái
                              </Button>
                         </Dropdown>

                         {/* <Dropdown menu={{ items: [] }}>
                              <Button className="bg-transparent text-white" icon={<CalendarOutlined />}>
                                   Thời gian
                              </Button>
                         </Dropdown>

                         <Dropdown menu={{ items: [] }}>
                              <Button className="bg-transparent text-white" icon={<SortDescendingOutlined />}>
                                   Sắp xếp
                              </Button>
                         </Dropdown> */}
                         {/* 
                         <Button className="bg-transparent text-white ml-auto" icon={<FileExcelOutlined />}>
                              Xuất Excel
                         </Button> */}
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
                              dataSource={videos.map((item: any, index: number) => ({ key: index + 1, ...item }))}
                              className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl"
                              pagination={{
                                   total: total,
                                   pageSize: limit,
                                   showSizeChanger: true,
                                   showTotal: (total, range) => {
                                        console.log({ total, range });
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
          </div>
     );
};

export default DashboardPage;
