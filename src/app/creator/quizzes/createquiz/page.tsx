'use client';

import { Card, Checkbox, Col, Flex, List, Row, Typography } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { MdCreate, MdDelete, MdSettingsSuggest } from 'react-icons/md';
import { BreadCrumbNav } from '../../../../../components/common/breadcrumb';
import { PrimaryButton } from '../../../../../components/common/button';
import { AddIcon } from '../../../../../components/common/icons';
import { CustomTag } from '../../../../../components/common/tag';
import TextEditor from '../../../../../components/common/texteditor';
import ImageUpload from '../../../../../components/form/imgupload';
import { FormInput } from '../../../../../components/form/input';
import PageTitle from '../../../../../components/pagetitle';
import style from '../../../../../style/creator.module.scss';
const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};

const { Title } = Typography;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const CreatorCreateQuiz = () => {
  const breadCrumbItems = [
    {
      title: 'Back to Quiz',
      link: '/creator/quizzes',
    },
  ];
  return (
    <>
      <div className={`${style['quizzes-create-creator-page']}`}>
        {/* Page Title */}
        <Row className='p-15'>
          <Col span={24}>
            <BreadCrumbNav item={breadCrumbItems} />
            <PageTitle title='Create Quiz title' />
          </Col>
        </Row>
        <Row className='p-r-b-l-15 '>
          <Col span={16}>
            <div>
              <div className='creator-quiz-card'>
                <Card
                  style={{ width: '100%' }}
                  cover={
                    <div className='header-wrapper p-15'>
                      <div className='label-tag'>
                        <CustomTag title='Question 1' className='q-label' />
                      </div>
                      <Flex
                        gap={12}
                        align='center'
                        justify='flex-end'
                        className='actions-box-wrapper'
                      >
                        <PrimaryButton
                          variant={'dark'}
                          icon={<MdSettingsSuggest size={22} />}
                        />
                        <PrimaryButton
                          variant={'secondary'}
                          icon={<MdCreate size={22} />}
                        />
                        <PrimaryButton
                          variant={'secondary'}
                          icon={<MdDelete size={22} />}
                        />
                      </Flex>
                      {/* Upload Media For Question Start */}
                      <div className='media-image-quiz'>
                        <ImageUpload />
                      </div>
                      {/* Create Question Box Start*/}
                      <TextEditor placeholder='Write a question' />
                      {/* Submitted Questions Display */}
                      <div className='question-box-wrapper'>
                        <Flex
                          className='heading-flex'
                          justify='space-between'
                          align='center'
                        >
                          <h2>Select language</h2>
                          <CustomTag
                            color='#87d068'
                            title='20xp'
                            className='point-tag'
                          />
                        </Flex>
                        <Flex vertical className='q-wrapper'>
                          <li>HTML</li>
                          <li>CSS</li>
                          <li>JS</li>
                          <li>React</li>
                        </Flex>
                      </div>
                    </div>
                  }
                  // Footer Buttons Start
                  actions={[
                    <Flex
                      justify='flex-end'
                      align='center'
                      gap={16}
                      className='action-buttons remove-from-group'
                    >
                      <FormInput
                        addonAfter='XP'
                        type='text'
                        placeholder='Points'
                      />
                      <PrimaryButton text='Save' variant='primary' />
                    </Flex>,
                  ]}
                >
                  {/* Write Answers Box Start */}
                  <div className='card-main-content'>
                    <div className='create-questions-list-wrapper'>
                      <div className='heading-wrapper'>
                        <h4>Answers</h4>
                        <p>
                          Make the correct answer by selecting the circle (0)
                        </p>
                      </div>
                      <List className='q-list-wrap'>
                        {[1, 2, 3].map((i) => (
                          <List.Item key={i} style={{ padding: 0 }}>
                            <Flex
                              align='start'
                              gap='0'
                              style={{ width: '100%' }}
                            >
                              <Checkbox
                                className='question-box'
                                style={{ width: '100%' }}
                                onChange={onChange}
                              >
                                <TextEditor placeholder='Add an answer' />
                              </Checkbox>
                            </Flex>
                          </List.Item>
                        ))}
                        <List.Item style={{ padding: 0 }}>
                          <PrimaryButton
                            text='Add Answer'
                            variant='secondary'
                            icon={<AddIcon />}
                          />
                        </List.Item>
                      </List>
                    </div>
                  </div>
                </Card>
              </div>
              <PrimaryButton
                text='Add New Question'
                variant='secondary'
                icon={<AddIcon />}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CreatorCreateQuiz;
