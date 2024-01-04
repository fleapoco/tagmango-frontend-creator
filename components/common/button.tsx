import { Button } from 'antd';
import React from 'react';

import { MdMoreVert, MdOutlineMoreHoriz } from 'react-icons/md';

interface ButtonProps {
  text?: React.ReactNode;
  variant:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'dark'
    | 'completed'
    | 'primary-border';
  horizontal?: boolean;
  size?: 'small';
  icon?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  ghost?: boolean;
}

export const PrimaryButton = ({
  text,
  variant,
  horizontal,
  onClick,
  loading = false,
  disabled = false,
  size,
  icon,
  ghost,
}: ButtonProps) => {
  const ChangeType = variant === 'primary' ? 'primary' : 'text';

  const infoIcon = horizontal ? <MdOutlineMoreHoriz /> : <MdMoreVert />;

  let InfoIcon = null;

  if (variant === 'info') {
    InfoIcon = infoIcon;
  }

  let _className = 'site-btn';

  if (variant === 'dark') _className += ' dark-btn';
  else if (variant === 'info') _className += ' into-btn';
  else if (variant === 'completed') _className += ' completed-btn';
  else if (variant === 'secondary') _className += ' secondary-btn';
  else _className += ' site-btn';

  if (size == 'small') _className += ' small-btn';
  else _className += '';

  return (
    <>
      <Button
        loading={loading}
        disabled={disabled}
        type={ChangeType}
        className={_className}
        onClick={onClick}
        size={size}
        icon={icon}
        ghost={ghost}
      >
        {InfoIcon}
        {text}
      </Button>
    </>
  );
};
