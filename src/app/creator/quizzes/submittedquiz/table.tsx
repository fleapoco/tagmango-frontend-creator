import { Questionbox } from "@/app/quizzes/common/questionbox";
import { RemarkBox } from "@/app/quizzes/common/remarkbox";
import { Flex, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IoMdCheckmark } from "react-icons/io";
import { PrimaryButton } from "../../../../../components/common/button";
import { FormInput } from "../../../../../components/form/input";

interface DataType {
  key: React.Key;
  sno: number;
  questions: React.ReactNode;
  pointassigned: React.ReactNode;
  pointearned: React.ReactNode;
}
export const AnswerTable = () => {
  const columns: ColumnsType = [
    {
      title: "Date",
      dataIndex: "sno",
      align: "start",
    },
    {
      title: "Questions",
      dataIndex: "questions",
    },
    {
      title: "Point Assigned",
      dataIndex: "pointassigned",
    },
    {
      title: "Point Earned",
      dataIndex: "pointearned",
      width: 300,
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      sno: 1,
      questions: (
        <Questionbox
          question={{} as any}
          onSelectOption={function (optionId: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      ),
      pointassigned: "20XP",
      pointearned: (
        <>
          <Flex vertical gap={10} justify="start" align="start">
            20XP
            <RemarkBox />
          </Flex>
        </>
      ),
    },
    {
      key: "2",
      sno: 2,
      questions: <RemarkBox title="Box Title" />,
      pointassigned: "20XP",
      pointearned: (
        <>
          <div>
            <Flex gap={16} align="center" className="points-input">
              <FormInput addonAfter={"XP"} placeholder="Points" type="text" />
              <PrimaryButton
                text=""
                icon={<IoMdCheckmark size={22} />}
                variant="dark"
              />
            </Flex>
            <FormInput label="" placeholder="Add remarks" type="text" />
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="quize-answer-main-table">
        <Table columns={columns as any} dataSource={data} />
      </div>
    </>
  );
};
