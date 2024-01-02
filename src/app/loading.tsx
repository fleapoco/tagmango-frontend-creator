'use client';

import { Spin } from 'antd';

const Loading = () => {
  return (
    <>
      <div className='page-loader'>
        <Spin size='large' />
      </div>
    </>
  );
};
export default Loading;
