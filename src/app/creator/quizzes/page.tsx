'use client';
import { Col, Flex, Row, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import style from '../../../../style/creator.module.scss';

import { PrimaryButton } from '../../../../components/common/button';
import { AddIcon } from '../../../../components/common/icons';
import PageTitle from '../../../../components/pagetitle';

import { Card } from 'antd';

const { Meta } = Card;

import Link from 'next/link';
import { ActionButton } from '../../../../components/common/actionbutton';
import { PrimaryCard } from '../../../../components/common/card';
import { ActionModal } from '../../../../components/common/modal';
import { CustomTag } from '../../../../components/common/tag';
import { FormInput } from '../../../../components/form/input';

const { Title } = Typography;

const CreatorCertification = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/creator/quizzes/createquiz');
  };
  return (
    <>
      <div className={`${style['creator-quizzes-page']} common-panel-wrapper `}>
        {/* Page Title */}
        <Row className='p-15'>
          <Col span={12}>
            <PageTitle title='Quizzes' />
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
            <PrimaryButton
              text='Create Quiz'
              icon={<AddIcon />}
              onClick={() => setModal(!modal)}
              variant='primary'
            />
          </Col>
        </Row>

        {/* Events Cards */}
        <Row gutter={[16, 16]} className='creator-quiz-card-wrapper p-r-b-l-15'>
          <Col span={24}>
            <PrimaryCard>
              <div className='content-wrapper'>
                <Row style={{ alignItems: 'center' }}>
                  <Col span={8} className='card-heading'>
                    <h4>Quizzes Title add here</h4>
                    <Flex className='questions-count'>
                      <span>30 Questions</span>
                      <span>
                        <CustomTag title='30XP' color='#87d068' />
                      </span>
                    </Flex>
                  </Col>
                  <Col span={8} style={{ textAlign: 'center' }}>
                    <Link href={'/creator/quizzes/responsequiz'}>
                      Total Responses : 140
                    </Link>
                  </Col>
                  <Col span={8} className='action-btn'>
                    <Flex justify='end' gap={10}>
                      <CustomTag
                        title='30 New Responses Submitted'
                        color='blue'
                        className='total-submitted-tag'
                      />
                      <ActionButton />
                    </Flex>
                  </Col>
                </Row>
              </div>
            </PrimaryCard>
          </Col>
        </Row>
        {/* Create Quiz Modal */}
        <ActionModal
          className='create-quiz-title-modal'
          title='Create Quiz title'
          show={modal}
          onClose={() => setModal(!modal)}
          footer={
            <PrimaryButton
              text='Create'
              variant='primary'
              onClick={handleButtonClick}
            />
          }
        >
          <div className='create-quiz-modal-content'>
            <FormInput placeholder='Quiz title' label='Add Quiz title' />
          </div>
        </ActionModal>
      </div>
    </>
  );
};
export default CreatorCertification;
