import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex } from 'antd';
import Image from 'next/image';

export const Header = () => {
  return (
    <>
      <header className='header-main'>
        <Flex
          justify='space-between'
          align='center'
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <div className='logo-wrapper' style={{ paddingLeft: '20px' }}>
            <Image
              src='https://tagmango.com/staticassets/tagmango_typeface-%281%29.svg-1622023999423.svg'
              width={130}
              height={45}
              quality={100}
              objectFit='contain'
              alt='Logo'
            />
          </div>
          <div className='header-links'>2</div>
          <div className='header-user-wrapper' style={{ paddingRight: '20px' }}>
            <Avatar
              size={37}
              src='https://tagmango.com/staticassets/avatar-placeholder.png-1612857612139.png'
              icon={<UserOutlined />}
            />
          </div>
        </Flex>
      </header>
    </>
  );
};
