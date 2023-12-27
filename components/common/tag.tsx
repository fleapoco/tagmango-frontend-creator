import { Tag } from 'antd';
import React from 'react';

interface TagProps {
  title: React.ReactNode;
  color?: string;
}

export const CustomTag = ({ title, color }: TagProps) => {
  return (
    <>
      <Tag color={color}>{title}</Tag>
    </>
  );
};
