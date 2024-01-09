import { Option, Question, QuizSubmission } from "@/types";
import { Flex, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { CustomTag } from "../../../../components/common/tag";
import { Questionbox } from "../common/questionbox";

interface DataType {
  key: React.Key;
  sno: number;
  id: string;
  creatorId: string;
  text: string;
  points: number;
  options: Option[];
  imageUrl?: string;
  submissions: QuizSubmission[];
}

interface PropTypeForTable {
  question: Question[];
  // handleDelete: (id: string) => void;
  // handleUpdate: (groupId: string) => void;
  // handlePagination: (page: number, pageSize: number) => void;
  // CountData: number;
  // dataPerPage: number;
  // currentPage: number;
  // searchQuery?: string;
  // setSearchQuery?: (searchQuery: string) => void;
}

export const AnswerTable = ({
  question,
}: // handleDelete,
// handleUpdate,
// handlePagination,
// dataPerPage,
// CountData,
// currentPage,
PropTypeForTable) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Date",
      dataIndex: "createdAt",
      align: "start",
      render: (value) => dayjs(value).format("DD MMM YYYY"),
    },
    {
      title: "Questions",
      dataIndex: "questions",
      render: (_, record) => {
        return (
          <Flex vertical gap={10} justify="start" align="start">
            <Questionbox
              disablesRadio={true}
              question={record}
              onSelectOption={() => null}
            />
            {/* <RemarkBox /> */}
          </Flex>
        );
      },
    },
    {
      title: "Point Assigned",
      dataIndex: "points",
      render: (value) => {
        return (
          <Flex vertical gap={10} justify="start" align="start">
            <CustomTag title={`${value} XP`} color="#87d068" />
            {/* <RemarkBox /> */}
          </Flex>
        );
      },
    },
    {
      title: "Point Earned",
      dataIndex: "pointearned",
      render: (value, record) => {
        return (
          <Flex vertical gap={10} justify="start" align="start">
            <CustomTag
              title={`${record?.submissions[0]?.score ?? 0} XP`}
              color="#87d068"
            />
            {/* <RemarkBox /> */}
          </Flex>
        );
      },
      width: 300,
    },
  ];

  // const data: DataType[] = [
  //   {
  //     key: "1",
  //     sno: 1,
  //     questions: <Questionbox question={{} as any} />,
  //     pointassigned: <CustomTag title="20 XP" color="#87d068" />,
  //     pointearned: (
  //       <>
  //         <Flex vertical gap={10} justify="start" align="start">
  //           <CustomTag title="20 XP" color="#87d068" />
  //           <RemarkBox />
  //         </Flex>
  //       </>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     sno: 2,
  //     questions: <RemarkBox title="Box Title" />,
  //     pointassigned: <CustomTag title="20 XP" color="#87d068" />,
  //     pointearned: (
  //       <>
  //         <Flex vertical gap={10} justify="start" align="start">
  //           <CustomTag title="20 XP" color="#87d068" />
  //           <RemarkBox />
  //         </Flex>
  //       </>
  //     ),
  //   },
  // ];

  return (
    <>
      <div className="quize-answer-main-table">
        <Table columns={columns as any} dataSource={question} />
      </div>
    </>
  );
};
