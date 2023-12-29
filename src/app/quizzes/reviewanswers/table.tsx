import { Flex, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CustomTag } from '../../../../components/common/tag';
import { Questionbox } from '../common/questionbox';
import { RemarkBox } from '../common/remarkbox';

interface DataType {
  key: React.Key;
  sno: number;
  questions: React.ReactNode;
  pointassigned: React.ReactNode;
  pointearned: React.ReactNode;
}
export const AnswerTable = () => {
  const columns: ColumnsType = [
    {
      title: 'Date',
      dataIndex: 'sno',
      align: 'start',
    },
    {
      title: 'Questions',
      dataIndex: 'questions',
    },
    {
      title: 'Point Assigned',
      dataIndex: 'pointassigned',
    },
    {
      title: 'Point Earned',
      dataIndex: 'pointearned',
      width: 300,
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      sno: 1,
      questions: <Questionbox />,
      pointassigned: <CustomTag title='20 XP' color='#87d068' />,
      pointearned: (
        <>
          <Flex vertical gap={10} justify='start' align='start'>
            <CustomTag title='20 XP' color='#87d068' />
            <RemarkBox />
          </Flex>
        </>
      ),
    },
    {
      key: '2',
      sno: 2,
      questions: <RemarkBox title='Box Title' />,
      pointassigned: <CustomTag title='20 XP' color='#87d068' />,
      pointearned: (
        <>
          <Flex vertical gap={10} justify='start' align='start'>
            <CustomTag title='20 XP' color='#87d068' />
            <RemarkBox />
          </Flex>
        </>
      ),
    },
  ];

  return (
    <>
      <div className='quize-answer-main-table'>
        <Table columns={columns as any} dataSource={data} />
      </div>
    </>
  );
};
