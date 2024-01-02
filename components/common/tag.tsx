import { Tag } from 'antd';
import React from 'react';

interface TagProps {
  title: React.ReactNode;
  color?: string;
  className?: string;
}

export const CustomTag = ({ title, color, className }: TagProps) => {
  return (
    <>
      <Tag color={color} className={className}>
        {title}
      </Tag>
    </>
  );
};
