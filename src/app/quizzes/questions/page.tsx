"use client";

import { Card, Col, Flex, Input, Row, Typography } from "antd";
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
  const breadCrumbItems = [
    {
      title: "Back to Quiz",
      link: "/quizzes",
    },
  ];
  return (
    <>
      <div className={`${style["quiz-questions-page"]}`}>
        {/* Page Title */}
        <Row style={{ padding: "15px 0" }}>
          <Col span={24}>
            <BreadCrumbNav item={breadCrumbItems} />
            <PageTitle title="Quiz Questions" />
          </Col>
        </Row>

        <Row className="quiz-questions-card" gutter={[12, 12]}>
          {[1].map((i) => (
            <Col span={12} key={i} className="quizzes-confirmation-card">
              <Card
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    style={{ aspectRatio: "16/9" }}
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
                    <h4>Questions 3/10</h4>
                    <CustomTag color="#87d068" title="30xp" />
                  </Flex>
                  {/* Questions Wrapper */}
                  <Questionbox />
                  {/* Textarea Box Wrapper Start */}
                  <div className="textarea-box">
                    <TextArea
                      rows={4}
                      placeholder="Write you answer"
                      maxLength={6}
                    />
                  </div>
                  {/* Buttons Wrapper */}
                  <Flex gap="middle" className="btns-wrapper">
                    <PrimaryButton text="Skip" variant="secondary" />
                    <PrimaryButton text="Next" variant="primary" />
                  </Flex>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default QuizQuestions;
