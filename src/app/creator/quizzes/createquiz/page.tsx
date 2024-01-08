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

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const CreatorCreateQuiz = () => {
  const { getUserQuizByQuizId } = useApi();

  const [loadQuiz, setLoadQuiz] = useState<boolean>(false);
  const params = useSearchParams();
  const quizId = params.get("quizId");
  const [quiz, setQuiz] = useState<{ name: string }>({ name: "" });

  const [question, setQuestion] = useState<{
    quizId: string;
    imageUrl: string;
    text: string;
    points: number;
  }>({
    quizId: "",
    text: "",
    imageUrl: "",
    points: 0,
  });

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
    } catch (error) {
    } finally {
      setLoadQuiz(false);
    }
  };

  // const [questionText, setQuestionText] = useState();

  // const handleUpload = (fileUrl: string) => {
  //   setEventDataType((prev) => {
  //     return { ...prev, backgroundImageUrl: fileUrl };
  //   });
  // };

  useEffect(() => {
    if (quizId) fetchQuiz();
  }, [quizId]);

  const handleUpload = (fileUrl: string) => {
    console.log(fileUrl);
    setQuestion({ ...question, imageUrl: fileUrl });
  };

  console.log(question);

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
            <div>
              <div className="creator-quiz-card">
                <FormInput
                  disabled={true}
                  type="text"
                  value={quiz.name}
                  placeholder="Quiz Title"
                />
                <Card
                  style={{ width: "100%" }}
                  cover={
                    <div className="header-wrapper p-15">
                      <div className="label-tag">
                        <CustomTag title="Question 1" className="q-label" />
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
                        <ImageUpload handleUpload={handleUpload} />
                      </div>
                      {/* Create Question Box Start*/}
                      <TextEditor
                        onChange={(e) => setQuestion({ ...question, text: e })}
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
                      />
                      <PrimaryButton text="Save" variant="primary" />
                    </Flex>,
                  ]}
                >
                  {/* Write Answers Box Start */}
                  <div className="card-main-content">
                    <div className="create-questions-list-wrapper">
                      <h4>Answers</h4>
                      {/* <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Vel, reiciendis!
                      </p> */}
                      <List>
                        {[1, 2, 3].map((i) => (
                          <List.Item key={i}>
                            <Flex
                              align="start"
                              gap={12}
                              style={{ width: "100%" }}
                            >
                              <Radio className="radio-list" />
                              <TextEditor
                                onChange={function (newContent: string): void {
                                  throw new Error("Function not implemented.");
                                }}
                              />
                            </Flex>
                          </List.Item>
                        ))}
                      </List>
                    </div>
                  </div>
                </Card>
              </div>

              <PrimaryButton
                text="Add New Answer"
                variant="secondary"
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
