"use client";
"use client";

import { Col, Flex, Modal, Row, message } from "antd";
import { useRouter } from "next/navigation";
import style from "../../../../style/creator.module.scss";

import { PrimaryButton } from "../../../../components/common/button";
import { AddIcon } from "../../../../components/common/icons";
import PageTitle from "../../../../components/pagetitle";

import { Card } from "antd";

const { Meta } = Card;

import Loading from "@/app/loading";
import { default as useAPI, default as useApi } from "@/hooks/useApi";
import { Quiz } from "@/types";
import { Typography } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ActionButton } from "../../../../components/common/actionbutton";
import { PrimaryCard } from "../../../../components/common/card";
import { CustomTag } from "../../../../components/common/tag";
import { FormInput } from "../../../../components/form/input";

const { Title } = Typography;

const CreatorCertification = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const { createQuiz } = useApi();
  const [disabledTitleField, setDisabledTitleField] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<{ name: string }>({
    name: "",
  });
  const router = useRouter();
  const { getCreatorQuizzes } = useAPI();

  const handleButtonClick = () => {
    setOpenModal(true);
  };

  const fetchCreatorQuizzes = async () => {
    setLoading(true);
    try {
      const creatorQuizzes = await getCreatorQuizzes();
      setQuizzes(creatorQuizzes ?? []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreatorQuizzes();
  }, []);

  const handleCreateQuiz = async () => {
    try {
      const createdQuiz = await createQuiz({ name: quiz.name });
      message.success("quiz created");
      fetchCreatorQuizzes();
      setOpenModal(false);
      router.push(
        `/creator/quizzes/createquiz?quizId=${createdQuiz.id as string}`
      );
      setQuiz({ ...quiz, name: "" });
    } catch (error) {
    } finally {
    }
  };

  return loading ? (
    <Loading loading />
  ) : (
    <>
      <div className={`${style["creator-quizzes-page"]} common-panel-wrapper `}>
        {/* Page Title */}
        <Row className="p-15">
          <Col span={12}>
            <PageTitle title="Quizzes" />
          </Col>
          <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
            <PrimaryButton
              text="Create Quiz"
              icon={<AddIcon />}
              onClick={handleButtonClick}
              variant="primary"
            />
          </Col>
        </Row>

        {/* Events Cards */}
        <Row gutter={[16, 16]} className="creator-quiz-card-wrapper p-r-b-l-15">
          <Col span={24}>
            {quizzes && quizzes.length > 0 && (
              <PrimaryCard>
                {quizzes.map((quiz) => (
                  <div className="content-wrapper">
                    <Row style={{ alignItems: "center" }}>
                      <Col span={8} className="card-heading">
                        <h4>{quiz.name}</h4>
                        <Flex className="questions-count">
                          <span>{quiz.questions.length} Questions</span>
                          <span>
                            <CustomTag
                              title={
                                quiz.questions.length > 0
                                  ? quiz.questions.reduce(
                                      (accumulator, currentValue) =>
                                        accumulator + currentValue.points,
                                      0
                                    )
                                  : 0
                              }
                              color="#87d068"
                            />
                          </span>
                        </Flex>
                      </Col>
                      <Col span={8} style={{ textAlign: "center" }}>
                        <Link href={"/creator/quizzes/responsequiz"}>
                          Total Responses : 140
                        </Link>
                      </Col>
                      <Col span={8} className="action-btn">
                        <Flex justify="end" gap={10}>
                          <CustomTag
                            title="30 New Responses Submitted"
                            color="blue"
                            className="total-submitted-tag"
                          />
                          <ActionButton
                            actionFor="quiz"
                            id={quiz?.id}
                            fetchCreatorQuizzes={fetchCreatorQuizzes}
                          />
                        </Flex>
                      </Col>
                    </Row>
                  </div>
                ))}
              </PrimaryCard>
            )}
          </Col>
        </Row>
        {/* Create Quiz Modal */}
        {/* <ActionModal
          className='create-quiz-title-modal'
          title='Create Quiz title'
          show={modal}
          onClose={() => setModal(!modal)}
          footer={
            <PrimaryButton
              text='Create'
              variant='primary'
              onClick={handleButtonClick}
            />
          }
        >
          <div className='create-quiz-modal-content'>
            <FormInput placeholder='Quiz title' label='Add Quiz title' />
          </div>
        </ActionModal> */}
      </div>
      <Modal
        open={openModal}
        footer={false}
        onCancel={() => {
          setOpenModal(false);
          setQuiz({ ...quiz, name: "" });
        }}
      >
        <FormInput
          type="text"
          placeholder="Quiz Title"
          disabled={disabledTitleField}
          onChange={(e) =>
            setQuiz((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <div style={{ paddingBottom: "20px" }}>
          <PrimaryButton
            text="Save Quiz"
            variant="primary"
            onClick={handleCreateQuiz}
          />
        </div>
      </Modal>
    </>
  );
};
export default CreatorCertification;
