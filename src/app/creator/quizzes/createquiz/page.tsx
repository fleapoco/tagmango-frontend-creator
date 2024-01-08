"use client";

import useApi from "@/hooks/useApi";
import { Card, Col, Flex, List, Radio, Row, Spin, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCreate, MdDelete, MdSettingsSuggest } from "react-icons/md";
import { BreadCrumbNav } from "../../../../../components/common/breadcrumb";
import { PrimaryButton } from "../../../../../components/common/button";
import { AddIcon } from "../../../../../components/common/icons";
import { CustomTag } from "../../../../../components/common/tag";
import TextEditor from "../../../../../components/common/texteditor";
import ImageUpload from "../../../../../components/form/imgupload";
import { FormInput } from "../../../../../components/form/input";
import PageTitle from "../../../../../components/pagetitle";
import style from "../../../../../style/creator.module.scss";

const { Title } = Typography;

const initialQuizState = {
  quizId: "",
  text: "",
  imageUrl: "",
  points: 0,
  options: Array.from({ length: 4 }, (_, index) => ({
    text: "",
    isCorrect: false,
  })),
};

export interface QuizType {
  quizId: string;
  imageUrl: string;
  text: string;
  points: number;
  options: Array<{ text: string; isCorrect: boolean }>;
}

const CreatorCreateQuiz = () => {
  const { getUserQuizByQuizId } = useApi();

  const [loadQuiz, setLoadQuiz] = useState<boolean>(false);

  const params = useSearchParams();
  const quizId = params.get("quizId");
  const [quiz, setQuiz] = useState<{ name: string }>({ name: "" });
  const [questions, setQuestions] = useState<QuizType[]>([]);
  const [questionIndex, setNewQuestionIndex] = useState<number>(0);
  const [newQuestion, setNewQuestion] = useState<QuizType>(initialQuizState);

  const breadCrumbItems = [
    {
      title: "Back to Quiz",
      link: "/quizzes",
    },
  ];

  const fetchQuiz = async () => {
    setLoadQuiz(true);
    try {
      const data = await getUserQuizByQuizId(quizId!);
      setQuiz({ ...quiz, name: data.name });
      setQuestions(
        data.questions.map((ques) => ({
          ...ques,
          imageUrl: ques.imageUrl ?? "",
          quizId: ques.quizId ?? "",
          options: ques.options ?? [],
        }))
      );
    } catch (error) {
    } finally {
      setLoadQuiz(false);
    }
  };

  useEffect(() => {
    if (quizId) fetchQuiz();
  }, [quizId]);

  const handleUpload = (fileUrl: string) => {
    console.log(fileUrl);
    setNewQuestion({ ...newQuestion, imageUrl: fileUrl });
  };

  const addNewQuestion = () => {
    const newQuestionIndex = questions.length + 1;
    setNewQuestionIndex(newQuestionIndex);
    const newQuestionData = initialQuizState;

    setQuestions((prevData) => [...prevData, newQuestionData]);
  };

  const createQuestionSet = (item: QuizType) => {
    console.log({ item });
  };

  useEffect(() => {
    if (questions.length < 1) addNewQuestion();
  }, [questions]);

  return loadQuiz ? (
    <>
      <Spin size="large" spinning={loadQuiz} fullscreen>
        {undefined}
      </Spin>
    </>
  ) : (
    <>
      <div className={`${style["quizzes-create-creator-page"]}`}>
        {/* Page Title */}
        <Row className="p-15">
          <Col span={24}>
            <BreadCrumbNav item={breadCrumbItems} />
            <PageTitle title="Create Quiz" />
          </Col>
        </Row>

        <Row className="p-r-b-l-15 ">
          <Col span={16}>
            <FormInput
              disabled={true}
              type="text"
              value={quiz.name}
              placeholder="Quiz Title"
            />

            <div>
              {questions.map((item, index) => (
                <div className="creator-quiz-card" key={index}>
                  <Card
                    style={{ width: "100%" }}
                    cover={
                      <div className="header-wrapper p-15">
                        <div className="label-tag">
                          <CustomTag
                            title={`Question ${index + 1}`}
                            className="q-label"
                          />
                        </div>
                        <Flex
                          gap={5}
                          align="center"
                          justify="flex-end"
                          className="actions-box-wrapper"
                        >
                          <div className="action-box">
                            <MdSettingsSuggest size={22} />
                          </div>
                          <div className="action-box">
                            <MdCreate size={22} />
                          </div>
                          <div className="action-box">
                            <MdDelete size={22} />
                          </div>
                        </Flex>

                        {/* Upload Media For Question Start */}
                        <div className="media-image-quiz">
                          <ImageUpload
                            handleUpload={handleUpload}
                            existImageUrl={item.imageUrl}
                          />
                        </div>
                        {/* Create Question Box Start*/}
                        <TextEditor
                          onChange={(newContent) => {
                            setNewQuestion({
                              ...newQuestion,
                              text: newContent,
                            });
                          }}
                        />
                      </div>
                    }
                    // Footer Buttons Start
                    actions={[
                      <Flex
                        justify="flex-end"
                        align="center"
                        gap={16}
                        className="action-buttons remove-from-group"
                      >
                        <FormInput
                          addonAfter="XP"
                          type="text"
                          placeholder="Points"
                          onChange={(e) =>
                            setNewQuestion({
                              ...newQuestion,
                              points: Number(e.target.value),
                            })
                          }
                        />
                        <PrimaryButton
                          text="Save"
                          variant="primary"
                          onClick={() => createQuestionSet(newQuestion)}
                        />
                      </Flex>,
                    ]}
                  >
                    {/* Write Answers Box Start */}
                    {newQuestion.options && (
                      <div className="card-main-content">
                        <div className="create-newQuestions-list-wrapper">
                          <h4>Answers</h4>
                          {newQuestion.options.map((option, optionIndex) => (
                            <List key={optionIndex}>
                              <List.Item>
                                <Flex
                                  align="start"
                                  gap={12}
                                  style={{ width: "100%" }}
                                >
                                  <Radio className="radio-list" />
                                  <TextEditor
                                    // value={option.text}
                                    onChange={(newContent) => {
                                      const updatedOptions = [
                                        ...newQuestion.options,
                                      ];
                                      updatedOptions[optionIndex].text =
                                        newContent;
                                      setNewQuestion({
                                        ...newQuestion,
                                        options: updatedOptions,
                                      });
                                    }}
                                  />
                                </Flex>
                              </List.Item>
                            </List>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              ))}

              <PrimaryButton
                text="Add New Question"
                variant="secondary"
                onClick={addNewQuestion}
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
