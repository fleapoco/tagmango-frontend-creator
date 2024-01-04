import { Card } from 'antd';
import React from 'react';

interface CardProps {
  title?: string | boolean;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const PrimaryCard = ({
  title,
  extra,
  children,
  className,
}: CardProps) => {
  return (
    <>
      <Card
        title={title}
        extra={extra}
        style={{ width: '100%' }}
        className={`${className} card`}
      >
        {children}
      </Card>
    </>
  );
};
