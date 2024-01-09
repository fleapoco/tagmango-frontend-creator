"use client";

import { Card, Col, Flex, Input, Row, Typography } from "antd";

import Loading from "@/app/loading";
import useAPI from "@/hooks/useApi";
import { Question, Quiz } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BreadCrumbNav } from "../../../../components/common/breadcrumb";
import { PrimaryButton } from "../../../../components/common/button";
import { CustomTag } from "../../../../components/common/tag";
import PageTitle from "../../../../components/pagetitle";
import style from "../../../../style/task.module.scss";
import { Questionbox } from "../common/questionbox";

const { TextArea } = Input;

const { Meta } = Card;

const { Title } = Typography;

const QuizQuestions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const { getUserQuizByQuizId } = useAPI();
  const param = useParams();
  const { quizId } = param;

  console.log(quizId);

  const breadCrumbItems = [
    {
      title: "Back to Quiz",
      link: "/quizzes",
    },
  ];

  const fetchQuizById = async () => {
    try {
      setLoading(true);
      const data = await getUserQuizByQuizId(quizId as string);
      setQuiz(data);

      const questions = data?.questions ?? [];
      const nextIndex = questions.findIndex(
        (question) => !question.submissions?.length
      );
      if (nextIndex >= 0) {
        setQuestionIndex(nextIndex);
        setQuestion(questions[nextIndex]);
      } else {
        //
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizId) fetchQuizById();
  }, [quizId]);

  const changeQuestion = () => {
    const questions = quiz?.questions ?? [];
    const nextIndex = questionIndex + 1;

    if (nextIndex >= 0 && nextIndex < questions.length) {
      setQuestion(questions[nextIndex]);
      setQuestionIndex(nextIndex);
    }
  };

  return (
    <>
      <div className={`${style["quiz-questions-page"]}`}>
        {/* Page Title */}

        {quiz && !loading ? (
          <>
            <Row style={{ padding: "15px 0" }}>
              <Col span={24}>
                <BreadCrumbNav item={breadCrumbItems} />
                <PageTitle title={quiz?.name || ""} />
              </Col>
            </Row>
            {question && (
              <Row className="quiz-questions-card" gutter={[12, 12]}>
                {/* {quiz.questions.map((e, i) => ( */}
                <Col span={12} className="quizzes-confirmation-card">
                  <Card
                    style={{ width: "100%" }}
                    cover={
                      <img
                        alt="example"
                        style={{ aspectRatio: "16/9" }}
                        src={question.imageUrl}
                      />
                    }
                  >
                    {/* Heading */}
                    <div className="content-wrapper">
                      <Flex
                        align="start"
                        justify="space-between"
                        className="heading-content"
                      >
                        <h4>
                          Questions{" "}
                          {`${questionIndex + 1} / ${quiz?.questions?.length}`}
                        </h4>
                        <CustomTag
                          color="#87d068"
                          title={`${quiz?.questions[questionIndex].points}XP`}
                        />
                      </Flex>
                      {/* Questions Wrapper */}
                      <Questionbox
                        question={question}
                        onSelectOption={(id) => {
                          setSelectedOptionId(id);
                          console.log({ optionId: id });
                        }}
                      />
                      {/* Textarea Box Wrapper Start */}
                      {/* <div className="textarea-box">
                        <TextArea
                          rows={4}
                          placeholder="Write you answer"
                          maxLength={6}
                        />
                      </div> */}
                      {/* Buttons Wrapper */}

                      <Flex gap="middle" className="btns-wrapper">
                        {questionIndex !== quiz.questions.length - 1 && (
                          <PrimaryButton
                            text="Skip"
                            variant="secondary"
                            onClick={() => changeQuestion()}
                          />
                        )}
                        {questionIndex !== quiz.questions.length - 1 ? (
                          <PrimaryButton
                            text="Next"
                            variant="primary"
                            onClick={() => changeQuestion()}
                          />
                        ) : (
                          <PrimaryButton
                            text="Submit"
                            variant="primary"
                            onClick={() => changeQuestion()}
                          />
                        )}
                      </Flex>
                    </div>
                  </Card>
                </Col>
                {/* ))} */}
              </Row>
            )}
          </>
        ) : (
          <Loading loading={!quiz && loading} />
        )}
      </div>
    </>
  );
};

export default QuizQuestions;
