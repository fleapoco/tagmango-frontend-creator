import { Question } from "@/types";
import { Flex, Radio } from "antd";
import style from "../../../../style/task.module.scss";

export const Questionbox = ({ question }: { question: Question }) => {
  return (
    <>
      <div className={`${style["question-box-wrapper"]}`}>
        <h2>{question.text}</h2>
        <Flex vertical className="q-wrapper">
          {question?.options?.length > 0 &&
            question.options.map((e) => (
              <li key={e.id} className="wrong-answer">
                <Radio className="q-name-list">{e.text}</Radio>
              </li>
            ))}
        </Flex>
      </div>
    </>
  );
};
