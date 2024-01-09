import { ChartData } from '@/app/charity/page';
import type { TimeRangePickerProps } from 'antd';
import { Col, DatePicker, Row, Typography } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import Chart from './Chart';
const { Title } = Typography;

const { RangePicker } = DatePicker;

const onChange = (date: Dayjs) => {
  if (date) {
    console.log('Date: ', date);
  } else {
    console.log('Clear');
  }
};

const onRangeChange = (
  dates: null | (Dayjs | null)[],
  dateStrings: string[]
) => {
  if (dates) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  } else {
    console.log('Clear');
  }
};

const rangePresets: TimeRangePickerProps['presets'] = [
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
];

export const DisplayGraph = (props: {
  chartData: ChartData;
  title: string;
  type: 'area' | 'line' | 'bar';
  onDateChange: (dates: dayjs.Dayjs, dateStrings: [string, string]) => void;
}) => {
  const handleDateChange = (
    dates: dayjs.Dayjs,
    dateStrings: [string, string]
  ) => {
    console.log('Selected Dates:', dates);
    console.log('Formatted Dates:', dateStrings);
    props.onDateChange(dates, dateStrings);
  };

  return (
    <>
      <div className='border-box'>
        <Row style={{ alignItems: 'center' }}>
          <Col span={17}>
            <Title level={4} className='sub-title' style={{ marginBottom: 0 }}>
              {props.title}
            </Title>
          </Col>
          <Col span={7} style={{ textAlign: 'right' }}>
            <RangePicker
              picker='month'
              presets={rangePresets}
              onChange={handleDateChange as any}
              renderExtraFooter={() => 'extra footer'}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className='chart-graph-wrapper'>
              <Chart chartData={props.chartData} type={props.type} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
