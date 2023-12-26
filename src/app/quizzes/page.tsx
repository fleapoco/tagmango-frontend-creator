'use client';

import { Col, Row, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from '../../../components/common/button';
import { PrimaryCard } from '../../../components/common/card';
import { CustomTag } from '../../../components/common/tag';
import PageTitle from '../../../components/pagetitle';
import style from '../../../style/task.module.scss';

const { Title } = Typography;

const QuizzesPage = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/quizzes/questions');
  };
  return (
    <>
      <div className={`${style['quizzes-page']}`}>
        {/* Page Title */}
        <Row style={{ padding: '15px 0' }}>
          <Col span={24}>
            <PageTitle title='Quizzes' />
          </Col>
        </Row>

        <Row className='select-quizzes-card-wrapper' gutter={[12, 12]}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Col span={8} key={i}>
              <PrimaryCard title='Testing title of quizzes'>
                <Title level={5}>30 Questions</Title>
                <PrimaryButton
                  onClick={handleButtonClick}
                  text={
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span>Play & Earn</span>
                      <CustomTag title='30XP' variant='success' />
                    </div>
                  }
                  variant='secondary'
                />
              </PrimaryCard>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
export default QuizzesPage;
