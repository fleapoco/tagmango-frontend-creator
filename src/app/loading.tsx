"use client";

import { Spin } from "antd";

const Loading = ({ loading }: { loading?: boolean }) => {
  return (
    <>
      <div className="page-loader">
        <Spin size="large" spinning={loading ?? false} />
      </div>
    </>
  );
};
export default Loading;
