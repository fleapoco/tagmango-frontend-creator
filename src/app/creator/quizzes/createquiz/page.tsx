"use client";

import Loading from "@/app/loading";
import useApi from "@/hooks/useApi";
import { Card, Col, Flex, List, Radio, Row, Typography, message } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCreate, MdDelete } from "react-icons/md";
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
  id: "",
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
  id?: string;
  quizId: string;
  imageUrl: string;
  text: string;
  points: number;
  options: Array<{ id?: string; text: string; isCorrect: boolean }>;
}

const CreatorCreateQuiz = () => {
  const {
    getUserQuizByQuizId,
    createQuestion,
    createMcqOption,
    updateQuestion,
    updateMcqOptions,
    deleteQuestion,
  } = useApi();

  const [loadQuiz, setLoadQuiz] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const params = useSearchParams();
  const quizId = params.get("quizId");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
  const [quiz, setQuiz] = useState<{ name: string }>({ name: "" });
  const [questions, setQuestions] = useState<QuizType[]>([]);
  const [questionIndex, setNewQuestionIndex] = useState<number>(0);
  const [newQuestion, setNewQuestion] = useState<QuizType>(initialQuizState);

  const breadCrumbItems = [
    {
      title: "Back to Quiz",
      link: "/creator/quizzes",
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
          points: ques.points,
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
    setNewQuestion({ ...newQuestion, imageUrl: fileUrl });
  };

  const addNewQuestion = () => {
    setNewQuestion(initialQuizState);
    const newQuestionIndex = questions.length + 1;
    setNewQuestionIndex(newQuestionIndex);
    const newQuestionData = initialQuizState;

    setQuestions((prevData) => [...prevData, newQuestionData]);
  };

  const createQuestionSet = async (item: QuizType, questionId: string) => {
    setLoading(true);

    try {
      const questionData = {
        quizId: quizId!,
        ...(item.text && { text: item.text }),
        ...(item.imageUrl && { imageUrl: item.imageUrl }),
        ...(item.points && { points: Number(item.points) }),
      };

      if (questionId) {
        await updateQuestion(questionId, questionData as any);

        const optionPromises = item.options.map((option) =>
          option.id
            ? updateMcqOptions(option.id, {
                questionId,
                text: option.text,
                isCorrect: option.isCorrect,
              })
            : null
        );

        await Promise.all(optionPromises);
      } else {
        const createdQuestion = await createQuestion(questionData as any);

        const optionPromises = item.options.map((option) =>
          createMcqOption({
            questionId: createdQuestion.id,
            text: option.text,
            isCorrect: option.isCorrect,
          })
        );

        await Promise.all(optionPromises);
      }

      message.success(
        questionId ? "Quiz Updated Successfully" : "Quiz Created Successfully"
      );
      fetchQuiz();
      setNewQuestion(initialQuizState);
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const _deleteQuestion = async (questionId: string) => {
    if (questionId) {
      try {
        const res: { message: string } = await deleteQuestion(questionId);
        if (res.message === "ok") {
          fetchQuiz();
          setNewQuestion(initialQuizState);
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (questions.length < 1) addNewQuestion();
  }, [questions]);

  return loadQuiz ? (
    <Loading loading={loadQuiz} />
  ) : (
    <>
      <div className={`${style["quizzes-create-creator-page"]}`}>
        {/* Page Title */}
        <Row className="p-15">
          <Col span={24}>
            <BreadCrumbNav item={breadCrumbItems} />
            <PageTitle title="Create Quiz title" />
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
                          {/* <div className="action-box">
                            <MdSettingsSuggest size={22} />
                          </div> */}
                          <div className="action-box">
                            <MdCreate size={22} />
                          </div>
                          <div
                            className="action-box"
                            onClick={() => {
                              _deleteQuestion(item.id ?? "");
                            }}
                          >
                            <MdDelete size={22} key={item.id} />
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
                          value={item.text}
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
                          defaultValue={String(item.points)}
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
                          loading={loading}
                          variant="primary"
                          onClick={() =>
                            createQuestionSet(newQuestion, item.id ?? "")
                          }
                        />
                      </Flex>,
                    ]}
                  >
                    {/* Write Answers Box Start */}
                    {item.options && (
                      <div className="card-main-content">
                        <div className="create-newQuestions-list-wrapper">
                          <h4>Answers</h4>
                          {item.options.map((option, optionIndex) => (
                            <List key={optionIndex}>
                              <List.Item>
                                <Flex
                                  align="start"
                                  gap={12}
                                  style={{ width: "100%" }}
                                >
                                  <Radio
                                    className="radio-list"
                                    defaultChecked={option.isCorrect}
                                    checked={
                                      selectedOptionIndex === optionIndex
                                    }
                                    onChange={() => {
                                      setSelectedOptionIndex(optionIndex);
                                      const updatedOptions =
                                        newQuestion.options.map((o, i) => ({
                                          ...o,
                                          isCorrect: i === optionIndex,
                                        }));
                                      setNewQuestion({
                                        ...newQuestion,
                                        options: updatedOptions,
                                      });
                                    }}
                                  />
                                  <TextEditor
                                    value={option.text}
                                    onChange={(newContent) => {
                                      const updatedOptions = [
                                        ...newQuestion.options,
                                      ];
                                      updatedOptions[optionIndex].text =
                                        newContent;
                                      updatedOptions[optionIndex].id =
                                        option.id;
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
