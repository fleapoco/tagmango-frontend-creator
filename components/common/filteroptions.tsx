import { Flex, Space } from 'antd';
import { FormSelect } from '../form/select';

export const FilterOptions = () => {
  return (
    <>
      <div className='table-filter-options'>
        <Flex>
          <FormSelect
            handleChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
          />
          <div>
            <Space>
              Space
              <FormSelect
                handleChange={function (value: string): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </Space>
          </div>
        </Flex>
      </div>
    </>
  );
};
