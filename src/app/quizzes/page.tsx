"use client";

import useApi from "@/hooks/useApi";
import { Quiz } from "@/types";
import { Button, Col, Row, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../../components/common/button";
import { PrimaryCard } from "../../../components/common/card";
import { CustomTag } from "../../../components/common/tag";
import PageTitle from "../../../components/pagetitle";
import style from "../../../style/task.module.scss";

const { Title } = Typography;

const QuizzesPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Quiz[]>([]);

  const { getAllUserQuizzes } = useApi();

  const fetchAllUserQuizzes = async () => {
    try {
      setLoading(true);
      const quizzes = await getAllUserQuizzes();
      setQuiz(quizzes ?? []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUserQuizzes();
  }, []);

  return (
    <>
      {!loading && (
        <div className={`${style["quizzes-page"]}`}>
          {/* Page Title */}
          <Row style={{ padding: "15px 0" }}>
            <Col span={24}>
              <PageTitle title="Quizzes" />
            </Col>
          </Row>

          {quiz.length > 0 && (
            <Row className="select-quizzes-card-wrapper" gutter={[12, 12]}>
              {quiz.map((e, i) => (
                <Col span={8} key={i}>
                  <PrimaryCard title={e.name}>
                    <Title level={5}>{e.questions?.length} Question</Title>

                    {e.submissions.length > 0 ? (
                      <Button className="review-btn">
                        Yo've completed the quiz and earned &nbsp;
                        <span className="s-text">{`${e.submissions.reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue.score,
                          0
                        )}XP`}</span>
                        &nbsp;{" "}
                        <Link href={`/quizzes/reviewanswers/${e.id}`}>
                          Review Answers
                        </Link>
                      </Button>
                    ) : (
                      <PrimaryButton
                        onClick={() => router.push(`/quizzes/${e.id}`)}
                        text={
                          <div style={{ display: "flex", gap: "12px" }}>
                            <span>Play & Earn</span>
                            <CustomTag
                              title={`${e.points}XP`}
                              color="#87d068"
                            />
                          </div>
                        }
                        variant="secondary"
                      />
                    )}
                  </PrimaryCard>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </>
  );
};
export default QuizzesPage;
