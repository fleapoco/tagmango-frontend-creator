"use client";

import { Card, Col, Flex, List, Radio, Row, Typography } from "antd";
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
  const breadCrumbItems = [
    {
      title: "Back to Quiz",
      link: "/quizzes",
    },
  ];
  return (
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
                        <ImageUpload />
                      </div>
                      {/* Create Question Box Start*/}
                      {/* <TextEditor /> */}
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
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Vel, reiciendis!
                      </p>
                      <List>
                        {[1, 2, 3].map((i) => (
                          <List.Item key={i}>
                            <Flex
                              align="start"
                              gap={12}
                              style={{ width: "100%" }}
                            >
                              <Radio className="radio-list" />
                              <TextEditor />
                            </Flex>
                          </List.Item>
                        ))}
                        <List.Item>
                          <PrimaryButton
                            text="Add Answer"
                            variant="secondary"
                            icon={<AddIcon />}
                          />
                        </List.Item>
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
