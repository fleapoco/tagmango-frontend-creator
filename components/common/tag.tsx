import { Tag } from 'antd';
import React from 'react';

interface TagProps {
  title: React.ReactNode;
  variant: 'gray' | 'success';
}

export const CustomTag = ({ title, variant }: TagProps) => {
  const tagColors = variant === 'gray' ? '#e4e6eb' : '#87d068';

  return (
    <>
      <Tag
        color={tagColors}
        style={{ margin: 0, color: variant === 'gray' ? '#424242' : '#fff' }}
      >
        {title}
      </Tag>
    </>
  );
};
