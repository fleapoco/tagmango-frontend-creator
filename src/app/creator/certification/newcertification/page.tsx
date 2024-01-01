'use client';

import { Col, Flex, Row } from 'antd';
import { useRouter } from 'next/navigation';
import { BreadCrumbNav } from '../../../../../components/common/breadcrumb';
import { PrimaryButton } from '../../../../../components/common/button';
import ImageUpload from '../../../../../components/form/imgupload';
import { FormInput } from '../../../../../components/form/input';
import { FormTextArea } from '../../../../../components/form/textarea';
import PageTitle from '../../../../../components/pagetitle';
import style from '../../../../../style/creator.module.scss';

const breadCrumbItems = [
  {
    title: 'Back to Certification',
    link: '/creator/certification',
  },
];

const NewCertification = () => {
  const router = useRouter();
  return (
    <>
      <div
        className={`${style['creator-task-details-form']} common-panel-wrapper`}
      >
        {/* Page Title */}
        <Row className='p-15'>
          <Col span={24}>
            <BreadCrumbNav item={breadCrumbItems} />
            <PageTitle title='New Certification' />
          </Col>
        </Row>
        <Row gutter={[12, 0]} className='p-r-b-l-15 '>
          <Col span={12}>
            <div className='border-box p-15'>
              <ImageUpload />
              <FormInput label='Certification Title' placeholder='Add Title' />
              <div className='form-group'>
                <label htmlFor='requirement'>Requirement</label>
                <FormTextArea placeholder='Description' />
              </div>
              <Flex gap={'middle'} justify='end'>
                <PrimaryButton
                  text='Cancel'
                  variant='secondary'
                  onClick={() => router.back()}
                />
                <PrimaryButton text='Save' variant='primary' />
              </Flex>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NewCertification;
