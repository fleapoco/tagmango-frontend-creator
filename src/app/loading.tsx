'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export interface LoaderProps {
  loading?: boolean;
  pageloader?: boolean;
}

const Loading: React.FC<LoaderProps> = ({ loading, pageloader }) => {
  return (
    <>
      {pageloader ? (
        <div className='inner-page-loader'>
          <LoadingOutlined
            style={{ fontSize: 32, color: 'var(--primary-color)' }}
            spin={loading ?? false}
          />
        </div>
      ) : (
        <div className='page-loader'>
          <Spin size='large' spinning={loading ?? false} />
        </div>
      )}
    </>
  );
};
export default Loading;
