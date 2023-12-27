// import { useState } from 'react';

// import type { RadioChangeEvent } from 'antd';
// import { Col, Row, Tabs, Typography } from 'antd';
// import { useRouter } from 'next/router';
// import style from '../../style/task.module.scss';

// import { PrimaryButton } from '../../components/common/button';
// import { PrimaryCard } from '../../components/common/card';
// import { AddIcon } from '../../components/common/icons';
// import PageTitle from '../../components/pagetitle';
// import { CalendarTask } from './calendar';
// import { TaskTable } from './tasktable';

// const { TabPane } = Tabs;

// const { Title } = Typography;

// export const Task = () => {
//   const [value, setValue] = useState(1);

//   const onChange = (e: RadioChangeEvent) => {
//     console.log('radio checked', e.target.value);
//     setValue(e.target.value);
//   };
//   const router = useRouter();

//   const handleButtonClick = () => {
//     router.push('/productivity/task/addtask');
//   };
//   return (
//     <>
//       <div className={`${style['task-page']} common-panel-wrapper`}>
//         {/* Page Title */}
//         <Row
//           justify={'space-between'}
//           style={{ alignItems: 'center' }}
//           className='p-15'
//         >
//           <Col span={12}>
//             <PageTitle title='Tasks' />
//           </Col>
//           <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
//             <PrimaryButton
//               text='New Task'
//               icon={<AddIcon />}
//               variant='primary'
//               onClick={handleButtonClick}
//             />
//           </Col>
//         </Row>
//         {/* Task Total Count Section */}
//         <div className='task-count-wrapper p-r-b-l-15'>
//           <Row gutter={12} className=' '>
//             {[
//               {
//                 taskName: 'Total Tasks Pending',
//                 count: 3,
//               },
//               {
//                 taskName: 'Total Tasks Pending',
//                 count: 3,
//               },
//               {
//                 taskName: 'Total Tasks Pending',
//                 count: 3,
//               },
//             ].map((ele, i) => (
//               <Col key={i} span={6}>
//                 <PrimaryCard title={ele.taskName}>
//                   <h3 style={{ margin: 0 }}>{ele.count}</h3>
//                 </PrimaryCard>
//               </Col>
//             ))}
//           </Row>
//         </div>
//         {/* Calendar And My Task Tab Changing */}
//         <div className='gray-box p-15'>
//           <Row>
//             <Col span={24}>
//               <Tabs defaultActiveKey='1' onChange={() => onChange}>
//                 <TabPane tab='Calendar' key='1'>
//                   <CalendarTask />
//                 </TabPane>
//                 <TabPane tab='My Tasks' key='2'>
//                   <div className='my-tasks-wrapper'>
//                     <div className='table-wrapper'>
//                       <TaskTable
//                         data={[]}
//                         handleDelete={function (id: string): void {
//                           throw new Error('Function not implemented.');
//                         }}
//                         handlePagination={function (
//                           page: number,
//                           pageSize: number
//                         ): void {
//                           throw new Error('Function not implemented.');
//                         }}
//                         CountData={0}
//                         dataPerPage={0}
//                         currentPage={0}
//                       />
//                     </div>
//                   </div>
//                 </TabPane>
//               </Tabs>
//             </Col>
//           </Row>
//         </div>
//       </div>
//     </>
//   );
// };
