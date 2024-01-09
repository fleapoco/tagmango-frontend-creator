import { Question } from '@/types';
import { Flex } from 'antd';
import { useState } from 'react';
import { MdClose, MdOutlineDone } from 'react-icons/md';

interface HtmlRendererProps {
  htmlString: string;
}

export const Questionbox = ({
  question,
  onSelectOption,
}: {
  question: Question;
  onSelectOption: (optionId: string) => void;
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);

  const HtmlRenderer: React.FC<HtmlRendererProps> = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
  return (
    <>
      <div className='question-box-wrapper'>
        <h2>{<HtmlRenderer htmlString={question.text} />}</h2>
        <Flex vertical className='q-wrapper'>
          {question?.options?.length > 0 ? (
            question.options.map((option, index) => (
              <li
                key={option.id}
                className={
                  option.submissions.length &&
                  option.submissions?.[0]?.score !== 0
                    ? 'right-question'
                    : option.submissions.length &&
                      option.submissions?.[0]?.score === 0
                    ? 'wrong-answer'
                    : ''
                }
              >
                {/* <Radio
                  className="q-name-list"
                  checked={selectedOptionIndex === index}
                  onChange={() => {
                    setSelectedOptionIndex(index);
                    onSelectOption(option.id);
                  }}
                >
                  
                </Radio> */}
                <Flex align='center' justify='space-between'>
                  {<HtmlRenderer htmlString={option.text} />}
                  {/* {option.submissions?.[0]?.score !== 0 ? (
                    'right-question'
                  ) : (
                    <MdOutlineDone size={24} />
                  )} */}
                  {option.submissions.length &&
                  option.submissions?.[0]?.score !== 0 ? (
                    <MdClose size={20} />
                  ) : option.submissions.length &&
                    option.submissions?.[0]?.score === 0 ? (
                    <MdOutlineDone size={20} />
                  ) : (
                    ''
                  )}
                </Flex>
              </li>
            ))
          ) : (
            <>---</>
          )}
        </Flex>
      </div>
    </>
  );
};
