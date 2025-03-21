import { Button, ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import React from 'react';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';

const fakeData = [
     {
          key: 1,
          channelName: 'TechVision',
          channelID: 'UC7A8DLw31Csy4xjHZXJyQ5A',
          channelEmail: 'contact@techvision.com',
          country: 'Vietnam',
          topic: 'Technology',
          subscribers: {
               total: 125600,
               growth: -4.3,
          },
          views: {
               total: 3450000,
               growth: 5.7,
          },
          revenue: {
               total: 42500,
               growth: 6.2,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: true,
          isMonetizing: true,
     },
     {
          key: 2,
          channelName: 'CookingMaster',
          channelID: 'UC9B5Hjw2QM6LYL8IgrN2Azw',
          channelEmail: 'info@cookingmaster.com',
          country: 'Thailand',
          topic: 'Cooking',
          subscribers: {
               total: 843200,
               growth: 7.8,
          },
          views: {
               total: 12750000,
               growth: 9.2,
          },
          revenue: {
               total: 187500,
               growth: -10.3,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: true,
          isMonetizing: true,
     },
     {
          key: 3,
          channelName: 'TravelExplorer',
          channelID: 'UC3F5dGxK2EpH8JhMzx7yD6A',
          channelEmail: 'hello@travelexplorer.com',
          country: 'Malaysia',
          topic: 'Travel',
          subscribers: {
               total: 257400,
               growth: -2.1,
          },
          views: {
               total: 5230000,
               growth: 3.5,
          },
          revenue: {
               total: 0,
               growth: 0,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: false,
          isMonetizing: false,
     },
     {
          key: 4,
          channelName: 'FitnessLife',
          channelID: 'UC0K2j9LCS3FehIi6Q3AmRWQ',
          channelEmail: 'support@fitnesslife.com',
          country: 'Singapore',
          topic: 'Fitness',
          subscribers: {
               total: 512800,
               growth: 6.2,
          },
          views: {
               total: 8920000,
               growth: -8.1,
          },
          revenue: {
               total: 97400,
               growth: -8.5,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: true,
          isMonetizing: true,
     },
     {
          key: 5,
          channelName: 'GamersHub',
          channelID: 'UCpqH2DzVGKMYJW8LWJYUZAg',
          channelEmail: 'team@gamershub.com',
          country: 'Indonesia',
          topic: 'Gaming',
          subscribers: {
               total: 1250000,
               growth: -12.5,
          },
          views: {
               total: 28500000,
               growth: 15.3,
          },
          revenue: {
               total: 358000,
               growth: -16.7,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: true,
          isMonetizing: true,
     },
     {
          key: 6,
          channelName: 'MusicVibes',
          channelID: 'UC7wK3L9_G5HJpFUOf_GVH6g',
          channelEmail: 'contact@musicvibes.com',
          country: 'Vietnam',
          topic: 'Music',
          subscribers: {
               total: 325000,
               growth: -3.8,
          },
          views: {
               total: 6750000,
               growth: 4.2,
          },
          revenue: {
               total: 74800,
               growth: 5.1,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: true,
          isMonetizing: true,
     },
     {
          key: 7,
          channelName: 'DigitalArtistry',
          channelID: 'UCH5Z9P8L6JYqw2vTXAyLK2A',
          channelEmail: 'art@digitalartistry.com',
          country: 'Philippines',
          topic: 'Art & Design',
          subscribers: {
               total: 187500,
               growth: 5.2,
          },
          views: {
               total: 3850000,
               growth: -6.8,
          },
          revenue: {
               total: 0,
               growth: 0,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: false,
          isMonetizing: false,
     },
     {
          key: 8,
          channelName: 'EduLearn',
          channelID: 'UC9RfJ5D3QxU7VyLOgP1W2Qw',
          channelEmail: 'info@edulearn.com',
          country: 'Malaysia',
          topic: 'Education',
          subscribers: {
               total: 427600,
               growth: 9.7,
          },
          views: {
               total: 9120000,
               growth: -11.2,
          },
          revenue: {
               total: 112500,
               growth: 11.8,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: true,
          isMonetizing: true,
     },
     {
          key: 9,
          channelName: 'FashionTrends',
          channelID: 'UCLy2XE5JG8YKUnT3TfJ4VQg',
          channelEmail: 'hello@fashiontrends.com',
          country: 'Thailand',
          topic: 'Fashion',
          subscribers: {
               total: 623400,
               growth: 8.3,
          },
          views: {
               total: 12350000,
               growth: -10.5,
          },
          revenue: {
               total: 147600,
               growth: -12.3,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: true,
          isMonetizing: true,
     },
     {
          key: 10,
          channelName: 'DIYCrafts',
          channelID: 'UC5jK7tE94Hj8L9pzrP2WQbA',
          channelEmail: 'create@diycrafts.com',
          country: 'Vietnam',
          topic: 'DIY & Crafts',
          subscribers: {
               total: 348700,
               growth: 6.7,
          },
          views: {
               total: 7240000,
               growth: 7.9,
          },
          revenue: {
               total: 86500,
               growth: 8.2,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: true,
          isMonetizing: true,
     },
     {
          key: 11,
          channelName: 'ScienceExplained',
          channelID: 'UCH6Z2pLK8Fv9YMqZG7Qp2Aw',
          channelEmail: 'info@scienceexplained.com',
          country: 'Singapore',
          topic: 'Science',
          subscribers: {
               total: 215600,
               growth: 4.1,
          },
          views: {
               total: 4870000,
               growth: 5.3,
          },
          revenue: {
               total: 0,
               growth: 0,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: false,
          isMonetizing: false,
     },
     {
          key: 12,
          channelName: 'PetLovers',
          channelID: 'UC2Q7jK9Lp5ZHj8L9pQrP2WA',
          channelEmail: 'care@petlovers.com',
          country: 'Indonesia',
          topic: 'Pets & Animals',
          subscribers: {
               total: 567800,
               growth: 10.2,
          },
          views: {
               total: 13250000,
               growth: 12.7,
          },
          revenue: {
               total: 176300,
               growth: 13.5,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: true,
          isMonetizing: true,
     },
     {
          key: 13,
          channelName: 'MotorWorld',
          channelID: 'UC8K2j9LCSQ3FehIw6Q3AmRA',
          channelEmail: 'drive@motorworld.com',
          country: 'Philippines',
          topic: 'Automotive',
          subscribers: {
               total: 387200,
               growth: 7.5,
          },
          views: {
               total: 9850000,
               growth: 9.8,
          },
          revenue: {
               total: 118200,
               growth: 10.4,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: true,
          isMonetizing: true,
     },
     {
          key: 14,
          channelName: 'BeautyGlam',
          channelID: 'UC3wK2DzVGKQjW8LWxYUZAP',
          channelEmail: 'beauty@beautyglam.com',
          country: 'Vietnam',
          topic: 'Beauty',
          subscribers: {
               total: 725400,
               growth: 11.3,
          },
          views: {
               total: 18750000,
               growth: 14.2,
          },
          revenue: {
               total: 235900,
               growth: 15.8,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: true,
          isMonetizing: true,
     },
     {
          key: 15,
          channelName: 'FoodieDelights',
          channelID: 'UC6H2DzVGKMqJW8LWJYUZBg',
          channelEmail: 'taste@foodiedelights.com',
          country: 'Thailand',
          topic: 'Food',
          subscribers: {
               total: 495300,
               growth: 9.1,
          },
          views: {
               total: 10820000,
               growth: 11.8,
          },
          revenue: {
               total: 124700,
               growth: 12.6,
          },
          isMonetizationEligible: true,
          isAdsenseRegistered: true,
          isMonetizing: true,
     },
];

const ChannelsDashboardPage = () => {
     const handleTotalAndColor = (array: any, value: string) => {
          const total = array
               .reduce((total: any, currentValue: any) => total + currentValue[value].growth, 0)
               .toLocaleString('en-US');

          return {
               total: `${total >= 0 ? '+' : ''}${total}%`,
               color: total >= 0 ? 'text-green-500' : 'text-red-500',
               icon: total >= 0 ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />,
          };
     };

     const columns = useMemo(() => {
          return [
               {
                    title: <div className="text-center">STT</div>,
                    dataIndex: 'key',
                    key: 'key',
                    fixed: 'left',
                    render: (key: any) => <div className="flex justify-center">{key}</div>,
               },
               {
                    title: <div className="text-center">Tên kênh</div>,
                    dataIndex: 'channelName',
                    key: 'channelName',
                    fixed: 'left',
                    width: 100,
                    render: (channelName: any) => <div className="">{channelName}</div>,
               },
               {
                    title: <div className="text-center">ID Kênh</div>,
                    dataIndex: 'channelID',
                    key: 'channelID',
                    render: (channelID: any) => <div className="flex justify-start">{channelID}</div>,
               },
               {
                    title: <div className="text-center">Email kênh</div>,
                    dataIndex: 'channelEmail',
                    key: 'channelEmail',
                    render: (channelEmail: any) => <div className="flex justify-start">{channelEmail}</div>,
               },
               {
                    title: <div className="text-center">Quốc gia</div>,
                    dataIndex: 'country',
                    key: 'country',
                    render: (country: any) => <div className="flex justify-center">{country}</div>,
               },
               {
                    title: <div className="text-center">Chủ đề</div>,
                    dataIndex: 'topic',
                    key: 'topic',
                    render: (topic: any) => <div className="flex justify-center">{topic}</div>,
               },
               {
                    title: <div className="text-center">Người đăng ký</div>,
                    dataIndex: 'subscribers',
                    key: 'subscribers',
                    children: [
                         {
                              title: <div className="text-center">Tổng</div>,
                              dataIndex: 'subscribers',
                              key: 'total-subscribers',
                              render: (subscribers: any) => (
                                   <div className="flex justify-center">
                                        {subscribers.total.toLocaleString('en-US')}
                                   </div>
                              ),
                              //   width: 100,
                         },
                         {
                              title: <div className="text-center">Tăng trưởng (%)</div>,
                              dataIndex: 'subscribers',
                              key: 'growth-subscribers',
                              render: (subscribers: any) => (
                                   <div
                                        className={`${
                                             subscribers.growth >= 0 ? 'text-green-500' : 'text-red-500'
                                        } flex justify-center items-center`}
                                   >
                                        {`${subscribers.growth >= 0 ? '+' : ''}${subscribers.growth}%`}
                                        {subscribers.growth >= 0 ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                                   </div>
                              ),
                              //   width: 100,
                         },
                    ],
               },
               {
                    title: <div className="text-center">Lượt xem</div>,
                    dataIndex: 'views',
                    key: 'views',
                    children: [
                         {
                              title: <div className="text-center">Tổng</div>,
                              dataIndex: 'views',
                              key: 'total-views',
                              render: (views: any) => (
                                   <div className="flex justify-center">{views.total.toLocaleString('en-US')}</div>
                              ),
                         },
                         {
                              title: <div className="text-center">Tăng trưởng (%)</div>,
                              dataIndex: 'views',
                              key: 'growth-views',
                              render: (views: any) => (
                                   <div
                                        className={`${
                                             views.growth >= 0 ? 'text-green-500' : 'text-red-500'
                                        } flex justify-center items-center`}
                                   >
                                        {`${views.growth >= 0 ? '+' : ''}${views.growth}%`}
                                        {views.growth >= 0 ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                                   </div>
                              ),
                         },
                    ],
               },
               {
                    title: <div className="text-center">Đủ điều kiện kiếm tiền</div>,
                    dataIndex: 'isMonetizationEligible',
                    key: 'isMonetizationEligible',
                    render: (isMonetizationEligible: any) => (
                         <div className="flex justify-center">
                              {isMonetizationEligible ? 'Đủ điều kiện' : 'Chưa đủ điều kiện'}
                         </div>
                    ),
               },
               {
                    title: <div className="text-center">Đã đăng ký Google Adsense</div>,
                    dataIndex: 'isAdsenseRegistered',
                    key: 'isAdsenseRegistered',
                    render: (isAdsenseRegistered: any) => (
                         <div className="flex justify-center">
                              {isAdsenseRegistered ? 'Đã đăng ký' : 'Chưa đăng ký'}
                         </div>
                    ),
               },
               {
                    title: <div className="text-center">Trạng thái kiếm tiền</div>,
                    dataIndex: 'isMonetizing',
                    key: 'isMonetizing',
                    render: (isMonetizing: any) => (
                         <div className="flex justify-center">{isMonetizing ? 'Đã bật' : 'Chưa bật'}</div>
                    ),
               },
               {
                    title: <div className="text-center">Doanh thu</div>,
                    dataIndex: 'revenue',
                    key: 'revenue',
                    children: [
                         {
                              title: <div className="text-center">Tổng</div>,
                              dataIndex: 'revenue',
                              key: 'total-revenue',
                              render: (views: any) => (
                                   <div className="flex justify-center">{views.total.toLocaleString('en-US')}</div>
                              ),
                         },
                         {
                              title: <div className="text-center">Tăng trưởng (%)</div>,
                              dataIndex: 'revenue',
                              key: 'growth-revenue',
                              render: (revenue: any) => (
                                   <div
                                        className={`${
                                             revenue.growth >= 0 ? 'text-green-500' : 'text-red-500'
                                        } flex justify-center items-center`}
                                   >
                                        {`${revenue.growth >= 0 ? '+' : ''}${revenue.growth}%`}
                                        {revenue.growth >= 0 ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                                   </div>
                              ),
                         },
                    ],
               },
               {
                    title: <div className="text-center">Thao tác</div>,
                    dataIndex: 'action',
                    key: 'action',
                    fixed: 'right',
                    render: () => (
                         <div className="flex justify-center">
                              <Button>Chi tiết</Button>
                         </div>
                    ),
               },
          ] as ColumnsType<any>;
     }, []);

     return (
          <div className="min-h-screen p-8">
               <ConfigProvider
                    theme={{
                         components: {
                              Table: {
                                   /* here is your component tokens */
                                   colorBgContainer: '#0A0D20',
                                   colorText: 'white',
                                   colorTextHeading: 'white',
                                   headerBg: '#0A0D20',
                              },
                         },
                    }}
               >
                    <Table
                         bordered
                         columns={columns}
                         dataSource={fakeData}
                         className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl"
                         scroll={{ x: 'max-content' }}
                         summary={(pageData) => {
                              return (
                                   <>
                                        <Table.Summary.Row>
                                             <Table.Summary.Cell key="0" index={0}>
                                                  Tổng ({pageData.length} kênh)
                                             </Table.Summary.Cell>

                                             {/* Các ô không hiển thị */}
                                             <Table.Summary.Cell key="1" index={1} />
                                             <Table.Summary.Cell key="2" index={2} />
                                             <Table.Summary.Cell key="3" index={3} />
                                             <Table.Summary.Cell key="4" index={4} />
                                             <Table.Summary.Cell key="5" index={5} />
                                             {/* Người đăng ký */}
                                             <Table.Summary.Cell key="6" index={6} align="right">
                                                  {pageData
                                                       .reduce(
                                                            (total: any, currentValue: any) =>
                                                                 total + currentValue.revenue.total,
                                                            0,
                                                       )
                                                       .toLocaleString('en-US')}
                                             </Table.Summary.Cell>
                                             <Table.Summary.Cell
                                                  key="7"
                                                  index={7}
                                                  align="center"
                                                  className={`${
                                                       handleTotalAndColor(pageData, 'subscribers').color
                                                  } flex items-center justify-center`}
                                             >
                                                  {handleTotalAndColor(pageData, 'subscribers').total}
                                                  {handleTotalAndColor(pageData, 'subscribers').icon}
                                             </Table.Summary.Cell>
                                             {/*Lượt xem */}
                                             <Table.Summary.Cell key="8" index={8}>
                                                  {pageData
                                                       .reduce(
                                                            (total: any, currentValue: any) =>
                                                                 total + currentValue.views.total,
                                                            0,
                                                       )
                                                       .toLocaleString('en-US')}
                                             </Table.Summary.Cell>
                                             <Table.Summary.Cell
                                                  key="9"
                                                  index={9}
                                                  align="center"
                                                  className={`${
                                                       handleTotalAndColor(pageData, 'views').color
                                                  } flex items-center justify-center`}
                                             >
                                                  {handleTotalAndColor(pageData, 'views').total}
                                                  {handleTotalAndColor(pageData, 'views').icon}
                                             </Table.Summary.Cell>
                                             {/* Đủ điều kiện kiếm tiền */}
                                             <Table.Summary.Cell key="10" index={10} align="center">
                                                  {
                                                       pageData.filter(
                                                            (item: any, index: number) => !!item.isMonetizationEligible,
                                                       ).length
                                                  }
                                                  /{pageData.length}
                                             </Table.Summary.Cell>
                                             {/* Đã đăng ký Google Adsense	 */}
                                             <Table.Summary.Cell key="11" index={11} align="center">
                                                  {
                                                       pageData.filter(
                                                            (item: any, index: number) => !!item.isAdsenseRegistered,
                                                       ).length
                                                  }
                                                  /{pageData.length}
                                             </Table.Summary.Cell>
                                             {/* Trạng thái kiếm tiền */}
                                             <Table.Summary.Cell key="12" index={12} align="center">
                                                  {
                                                       pageData.filter(
                                                            (item: any, index: number) => !!item.isMonetizing,
                                                       ).length
                                                  }
                                                  /{pageData.length}
                                             </Table.Summary.Cell>
                                             {/* Doanh Thu */}
                                             <Table.Summary.Cell key="13" index={13}>
                                                  {pageData
                                                       .reduce(
                                                            (total: any, currentValue: any) =>
                                                                 total + currentValue.revenue.total,
                                                            0,
                                                       )
                                                       .toLocaleString('en-US')}
                                             </Table.Summary.Cell>
                                             <Table.Summary.Cell
                                                  align="center"
                                                  key="14"
                                                  index={14}
                                                  className={`${
                                                       handleTotalAndColor(pageData, 'revenue').color
                                                  } flex items-center justify-center`}
                                             >
                                                  {handleTotalAndColor(pageData, 'revenue').total}
                                                  {handleTotalAndColor(pageData, 'revenue').icon}
                                             </Table.Summary.Cell>

                                             <Table.Summary.Cell key="15" index={15} />
                                        </Table.Summary.Row>
                                   </>
                              );
                         }}
                         //  pagination={{
                         //       total: total,
                         //       pageSize: limit,
                         //       showSizeChanger: true,
                         //       showTotal: (total, range) => {
                         //            return (
                         //                 <div className="text-white">{`Hiển thị ${range[0]}-${range[1]} của ${total} email`}</div>
                         //            );
                         //       },
                         //       onChange: handleChangePage,
                         //  }}
                    />
               </ConfigProvider>
          </div>
     );
};

export default ChannelsDashboardPage;
