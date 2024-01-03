"use client";

import { Col, Row } from "antd";

import useAPI from "@/hooks/useApi";
import { Question, Quiz } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PrimaryCard } from "../../../../../components/common/card";
import PageTitle from "../../../../../components/pagetitle";
import { AnswerTable } from "../table";
import style from "/style/task.module.scss";

const ReviewAnswers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);

  const { getUserQuizByQuizId } = useAPI();
  const param = useParams();
  const { quizId } = param;

  const fetchQuizById = async () => {
    try {
      setLoading(true);
      const data = await getUserQuizByQuizId(quizId as string);
      setQuiz(data);

      // const questions = data?.questions ?? [];
      // const nextIndex = questions.findIndex(
      //   (question) => !question.submissions?.length
      // );
      // if (nextIndex >= 0) {
      //   setQuestionIndex(nextIndex);
      //   setQuestion(questions[nextIndex]);
      // } else {
      //   //
      // }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizId) fetchQuizById();
  }, [quizId]);
  return (
    <>
      <div className={`${style["quiz-answer-page"]} common-panel-wrapper`}>
        {/* Page Title */}
        <Row
          justify={"space-between"}
          style={{ alignItems: "center" }}
          className="p-15"
        >
          <Col span={12}>
            <PageTitle title="Tasks" />
          </Col>
        </Row>
        {/* Task Total Count Section */}
        <div className="task-count-wrapper p-r-b-l-15">
          <Row gutter={[12, 0]} className=" ">
            <Col span={6} className="count-card">
              <PrimaryCard title="Questions Attempted">
                <span style={{ margin: 0 }}>
                  {quiz?.submissions?.length ?? 0}{" "}
                  <span className="small-txt">
                    out of <strong>{quiz?.questions.length}</strong>
                  </span>
                </span>
              </PrimaryCard>
            </Col>
            <Col span={6} className="count-card">
              <PrimaryCard title="Points Obtained">
                <span style={{ margin: 0 }}>
                  {quiz?.submissions?.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.score,
                    0
                  ) ?? 0}{" "}
                  XP
                </span>
              </PrimaryCard>
            </Col>
          </Row>
        </div>
        <div className="answer-table-box">
          <AnswerTable question={quiz?.questions ?? []} />
        </div>
      </div>
    </>
  );
};
export default ReviewAnswers;
