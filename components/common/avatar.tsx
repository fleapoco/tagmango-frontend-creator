import { Avatar } from 'antd';

export type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
  shape: AvatarShape;
  username?: string;
}

export const UserAvatar: React.FC<AvatarProps> = ({
  shape = 'circle',
  username,
}) => {
  return (
    <>
      <Avatar shape={shape}>{username}</Avatar>
    </>
  );
};
