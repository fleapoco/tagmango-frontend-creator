import { Avatar, Flex } from 'antd';

export type AvatarShape = 'circle' | 'square';

export interface UsernameProps {
  username: string;
}

export const UserName: React.FC<UsernameProps> = ({ username }) => {
  return (
    <>
      <Flex gap={15} align='center'>
        <Avatar>S</Avatar>
        {username}
      </Flex>
    </>
  );
};
