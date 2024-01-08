import { Question } from "@/types";
import { Flex, Radio } from "antd";
import style from "../../../../style/task.module.scss";

export const Questionbox = ({ question }: { question: Question }) => {
  return (
    <>
      <div className={`${style["question-box-wrapper"]}`}>
        <h2>{question.text}</h2>
        <Flex vertical className="q-wrapper">
          {question?.options?.length > 0 ? (
            question.options.map((option) => (
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
                <Radio className="q-name-list">{option.text}</Radio>
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
