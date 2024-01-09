import { Question } from "@/types";
import { Flex, Radio } from "antd";
import { useEffect, useState } from "react";

interface HtmlRendererProps {
  htmlString: string;
}

export const Questionbox = ({
  question,
  onSelectOption,
  disablesRadio = false,
}: {
  question: Question;
  onSelectOption: (optionId: string) => void;
  disablesRadio?: boolean;
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);

  const HtmlRenderer: React.FC<HtmlRendererProps> = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  useEffect(() => {
    setSelectedOptionIndex(-1);
  }, [question]);

  return (
    <>
      <div className="question-box-wrapper">
        <h2>{<HtmlRenderer htmlString={question.text} />}</h2>
        <Flex vertical className="q-wrapper">
          {question?.options?.length > 0 ? (
            question.options.map((option, index) => (
              <>
                {disablesRadio ? (
                  <li
                    key={option.id}
                    className={
                      option.submissions.length &&
                      option.submissions?.[0]?.score !== 0
                        ? "right-question"
                        : option.submissions.length &&
                          option.submissions?.[0]?.score === 0
                        ? "wrong-answer"
                        : ""
                    }
                  >
                    <Radio disabled={disablesRadio} className="q-name-list">
                      {<HtmlRenderer htmlString={option.text} />}
                    </Radio>
                  </li>
                ) : (
                  <li
                    key={option.id}
                    className={
                      option.submissions.length &&
                      option.submissions?.[0]?.score !== 0
                        ? "wrong-answer"
                        : option.submissions.length &&
                          option.submissions?.[0]?.score === 0
                        ? "right-question"
                        : ""
                    }
                  >
                    <Radio
                      disabled={disablesRadio}
                      className="q-name-list"
                      checked={selectedOptionIndex === index}
                      onChange={() => {
                        setSelectedOptionIndex(index);
                        onSelectOption(option.id);
                      }}
                    >
                      {<HtmlRenderer htmlString={option.text} />}
                    </Radio>
                  </li>
                )}
              </>
            ))
          ) : (
            <>---</>
          )}
        </Flex>
      </div>
    </>
  );
};
