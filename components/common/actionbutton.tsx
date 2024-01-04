import { Button, Popconfirm, Popover } from 'antd';
import { PrimaryButton } from './button';

export const ActionButton = () => {
  return (
    <>
      <Popover
        placement='top'
        className='action-btn'
        content={
          <>
            <Button
              type='text'
              style={{
                width: '100%',
                textAlign: 'left',
                marginBottom: '8px',
              }}
            >
              Edit
            </Button>

            <Popconfirm
              title='Are you sure to delete?'
              okText='Yes'
              cancelText='No'
            >
              <Button style={{ width: '100%', textAlign: 'left' }} type='text'>
                Delete
              </Button>
            </Popconfirm>
          </>
        }
        trigger='click'
      >
        <PrimaryButton text='' variant='info' horizontal />
      </Popover>
    </>
  );
};
