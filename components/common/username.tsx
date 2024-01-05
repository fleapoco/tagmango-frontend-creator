import { Avatar, Flex } from "antd";

export type AvatarShape = "circle" | "square";

export interface UsernameProps {
  username: string;
}

export const UserName: React.FC<UsernameProps> = ({ username }) => {
  const getAvatarInitials = (name: string): string => {
    // Extract the first letter from the username
    const initials = name.charAt(0).toUpperCase();
    return initials;
  };

  return (
    <>
      <Flex gap={15} align="center">
        <Avatar>{getAvatarInitials(username)}</Avatar>
        {username}
      </Flex>
    </>
  );
};
