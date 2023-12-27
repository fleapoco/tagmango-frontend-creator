import { Flex, Radio } from 'antd';
import style from '../../../../style/task.module.scss';

export const Questionbox = () => {
  return (
    <>
      <div className={`${style['question-box-wrapper']}`}>
        <h2>Quiz Title Add Here</h2>
        <Flex vertical className='q-wrapper'>
          <li className='right-question'>
            <Radio className='q-name-list'> HTML</Radio>
          </li>
          <li>
            <Radio className='q-name-list'> CSS</Radio>
          </li>
          <li className='wrong-answer'>
            <Radio className='q-name-list'> JS</Radio>
          </li>
          <li>
            <Radio className='q-name-list'> React</Radio>
          </li>
        </Flex>
      </div>
    </>
  );
};
