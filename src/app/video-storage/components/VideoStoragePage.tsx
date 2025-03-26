'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  SearchOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  SortDescendingOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { CiCircleRemove } from 'react-icons/ci';
import { ConfigProvider } from 'antd';
import { Button, Dropdown, Input, Table, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import _ from 'lodash';

// API Thunk
import { getVideoStorageByUserId } from '@/redux/videos/thunk';
import { getAllCountry } from '@/redux/countries/thunk';
import { getAllTopic } from '@/redux/topics/thunk';

// Functions
import { getRandomColor } from '@/units/units';
import { useAppDispatch, useAppSelector } from '@/core/hook';
import { useDebounce } from '@/hooks/hook';

// Selector
import { VideoSelector } from '@/redux/videos/selector';
import { TopicSelector } from '@/redux/topics/selector';
import { ProjectSelector } from '@/redux/countries/selector';
import { AppAction } from '@/redux/app/AppSlice';
import ModalScript from '@/app/dashboard/components/ModalScript';

const VideoStoragePage = () => {
  const dispatch = useAppDispatch();
  const [userID, setUserID] = useState<string>('');
  
  // States
  const [isOpenScriptModal, setIsOpenScriptModal] = useState(false);
  const [scriptContent, setScriptContent] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [countriesFilter, setCountriesFilter] = useState('');
  const [topicsFilter, setTopicsFilter] = useState('');

  // Selectors
  const limitVideoStorages = useAppSelector(state => state.videos.limitVideoStorages) || 10;
  const pageVideoStorages = useAppSelector(state => state.videos.pageVideoStorages) || 1;
  const totalVideoStorages = useAppSelector(state => state.videos.totalVideoStorages);
  const videoStorages = useAppSelector(state => state.videos.videoStorages) || [];
  const topics = useAppSelector(TopicSelector.topics);
  const countries = useAppSelector(ProjectSelector.countries);

  // Load user ID from localStorage
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

  // Fetch data initially and every 30 mins
  useEffect(() => {
    if (userID) {
      dispatch(
        getVideoStorageByUserId({
          page: pageVideoStorages,
          limit: limitVideoStorages
        })
      );

      const interval = setInterval(() => {
        dispatch(
          getVideoStorageByUserId({
            page: pageVideoStorages,
            limit: limitVideoStorages
          })
        );
      }, 30 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [dispatch, userID, pageVideoStorages, limitVideoStorages]);

  // Fetch countries and topics data
  useEffect(() => {
    if (userID) {
      dispatch(getAllCountry({}));
      dispatch(getAllTopic({}));
    }
  }, [dispatch, userID]);

  // Handle search with debounce
  const handleSearchWithDebounce = useDebounce(() => {
    if (!userID) return;
    dispatch(
      getVideoStorageByUserId({
        page: pageVideoStorages,
        limit: limitVideoStorages,
        countryId: countriesFilter,
        topicId: topicsFilter,
        email: searchText
      })
    );
  }, 700);

  // Handle opening the script modal
  const handleOpenScriptModal = (content: string) => {
    setScriptContent(content);
    setIsOpenScriptModal(true);
  };

  // Handle closing the script modal
  const handleCloseScriptModal = () => {
    setIsOpenScriptModal(false);
  };

  // Search by country
  const onClickCountriesFilter = ({ key }: any) => {
    setCountriesFilter(key);
    dispatch(
      getVideoStorageByUserId({
        page: pageVideoStorages,
        limit: limitVideoStorages,
        countryId: key,
        topicId: topicsFilter,
        email: searchText
      })
    );
  };

  // Search by topic
  const onClickTopicFilter = ({ key }: any) => {
    setTopicsFilter(key);
    dispatch(
      getVideoStorageByUserId({
        page: pageVideoStorages,
        limit: limitVideoStorages,
        countryId: countriesFilter,
        topicId: key,
        email: searchText
      })
    );
  };

  // Handle page change
  const handleChangePage = async (page: number, limit: number) => {
    dispatch(AppAction.showLoading());
    await dispatch(
      getVideoStorageByUserId({
        page,
        limit,
        countryId: countriesFilter,
        topicId: topicsFilter,
        email: searchText
      })
    );
    dispatch(AppAction.hiddenLoading());
  };

  // Table columns
  const columns = useMemo(() => {
    return [
      {
        title: 'STT',
        dataIndex: 'key',
        render: (key: any) => <div className="w-5 truncate flex justify-center">{key}</div>
      },
      {
        title: 'Chủ đề',
        dataIndex: 'topicId',
        key: 'topicId',
        render: (topicId: any) => <div className="truncate">{topicId?.topic}</div>
      },
      {
        title: 'Quốc gia',
        dataIndex: 'countryId',
        key: 'countryId',
        render: (countryId: any) => <div className="truncate">{countryId?.name}</div>
      },
      {
        title: 'Email Count',
        dataIndex: 'emailCount',
        key: 'emailCount',
        render: (emailCount: any) => <div className="truncate">{emailCount || 0}</div>
      },
      {
        title: 'Số video cần dự trữ',
        key: 'reservedVideos',
        render: (record: any) => {
          const emailCount = record.emailCount || 0;
          const reservedVideos = emailCount * 7;
          return <div className="truncate">{reservedVideos}</div>;
        }
      },
      {
        title: 'Số video dự trữ thực tế',
        dataIndex: 'videoDoneCount',
        key: 'videoDoneCount',
        render: (videoDoneCount: any, record: any) => {
          const emailCount = record.emailCount || 0;
          const reservedVideos = emailCount * 7;
          const color = videoDoneCount >= reservedVideos ? 'text-green-500' : 'text-red-500';
          return <div className={`truncate ${color} font-semibold`}>{videoDoneCount}</div>;
        }
      },
      {
        title: 'Thông báo',
        key: 'notification',
        render: (record: any) => {
          const videoDoneCount = record.videoDoneCount || 0;
          const emailCount = record.emailCount || 0;
          const reservedVideos = emailCount * 7;
          
          if (videoDoneCount >= reservedVideos) {
            return <div className="truncate text-green-500 font-semibold">Đã đủ lượng dự trữ</div>;
          } else {
            const shortage = reservedVideos - videoDoneCount;
            return <div className="truncate text-red-500 font-semibold">Thiếu {shortage} video, cần bổ sung thêm!</div>;
          }
        }
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
              onClick={() => handleOpenScriptModal(record?.content || "Nội dung không có sẵn")}
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
        )
      }
    ] as ColumnsType<any>;
  }, []);

  if (!userID) {
    return <div className="min-h-screen p-8 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="text-4xl mb-5">Kho Video Request</div>
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
                  colorIcon: '#FFFFFF'
                },
                DatePicker: {
                  /* here is your component tokens */
                  colorTextPlaceholder: '#FFFFFF',
                  colorIcon: '#FFD700',
                  colorIconHover: '#FFFFFF',
                  colorBgTextHover: '#000000'
                }
              }
            }}
          >
            <Input
              value={searchText}
              onChange={(e: any) => {
                setSearchText(e.target.value);
                handleSearchWithDebounce();
              }}
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm..."
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
                      key: item._id
                    })
                  ),
                  onClick: onClickCountriesFilter
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
                        {topicsFilter === item._id && <CheckOutlined className="text-blue-500" />}
                      </div>
                    ),
                    key: item._id
                  })),
                  onClick: onClickTopicFilter
                }}
              >
                <Button className="bg-transparent text-white" icon={<SortDescendingOutlined />}>
                  Chủ đề
                </Button>
              </Dropdown>
            )}

            <Button
              onClick={() => {
                dispatch(getVideoStorageByUserId({ page: pageVideoStorages, limit: limitVideoStorages }));
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
      {!_.isEmpty(videoStorages) && (
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
                rowSelectedHoverBg: 'rgba(255,255,255,0.05)'
              }
            }
          }}
        >
          <Table
            columns={columns}
            dataSource={videoStorages.map((item: any, index: number) => ({
              key: (pageVideoStorages - 1) * limitVideoStorages + index + 1,
              ...item
            }))}
            className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl"
            pagination={{
              total: totalVideoStorages,
              pageSize: limitVideoStorages,
              showSizeChanger: true,
              showTotal: (total, range) => {
                return (
                  <div className="text-white">{`Hiển thị ${range[0]}-${range[1]} của ${total} video requests`}</div>
                );
              },
              onChange: handleChangePage
            }}
          />
        </ConfigProvider>
      )}

      <ModalScript
        title="Nội dung Video Request"
        isOpenScriptModal={isOpenScriptModal}
        content={scriptContent}
        handleCloseScriptModal={handleCloseScriptModal}
      />
    </div>
  );
};

export default VideoStoragePage;