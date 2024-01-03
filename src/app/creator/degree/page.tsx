'use client';

import { Button, Col, Popconfirm, Popover, Row } from 'antd';
import { useRouter } from 'next/navigation';
import style from '../../../../style/task.module.scss';

import { PrimaryButton } from '../../../../components/common/button';
import { AddIcon } from '../../../../components/common/icons';
import PageTitle from '../../../../components/pagetitle';

import { Card } from 'antd';

const { Meta } = Card;

import { Typography } from 'antd';

const { Title } = Typography;

const CreatorCertification = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/creator/degree/newcertification');
  };
  return (
    <>
      <div className={`${style['task-page']}`}>
        {/* Page Title */}
        <Row
          justify={'space-between'}
          style={{ alignItems: 'center', padding: '15px 0' }}
        >
          <Col span={12}>
            <PageTitle title='Degree' />
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <PrimaryButton
              text='New Degree'
              icon={<AddIcon />}
              onClick={handleButtonClick}
              variant='primary'
            />
          </Col>
        </Row>
        {/* Events Cards */}
        <Row
          gutter={[16, 16]}
          style={{ flexWrap: 'wrap', alignItems: 'stretch' }}
        >
          <Col md={12} lg={8} xl={6}>
            <Card
              className='certification-card'
              style={{ width: '100%' }}
              cover={
                <>
                  <img
                    alt='example'
                    src='https://images.unsplash.com/photo-1610878180933-123728745d22?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  />
                  <div className='cover-over-img'>
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
                            <Button
                              style={{ width: '100%', textAlign: 'left' }}
                              type='text'
                            >
                              Delete
                            </Button>
                          </Popconfirm>
                        </>
                      }
                      trigger='click'
                    >
                      <PrimaryButton text='' variant='info' horizontal />
                    </Popover>
                  </div>
                </>
              }
            >
              <Meta
                title='Title Certification'
                description={
                  <div className='events-card-description'>
                    <p style={{ marginBottom: 0 }}>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Nobis quos aliquid maxime id ex cupiditate est assumenda
                      atque mollitia blanditiis.
                    </p>
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default CreatorCertification;
