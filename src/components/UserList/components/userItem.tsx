import clsx from 'clsx';
import { memo } from 'react';
import InternalChatBadges from '../../ChatView/InternalChatBadges';
import { UserButton } from './UserButton';

interface Props {
  channelId: string;
  color?: string;
  platform?: string;
  title: string;
  badges?: string[];
  isEligible?: boolean;
  handleToggleUser: (id: string) => void;
}

const UserItem = memo(
  ({
    channelId,
    color,
    platform,
    title,
    badges,
    isEligible,
    handleToggleUser,
  }: Props) => {
    const badgeMessage = {
      platform,
      badges,
    };

    return (
      <UserButton
        className={clsx(isEligible && 'isEligible')}
        $userColor={color}
        onClick={() => handleToggleUser(channelId)}
        type="button"
      >
        <InternalChatBadges message={badgeMessage} />
        <span>{title}</span>
      </UserButton>
    );
  }
);

UserItem.displayName = 'UserItem';

export default UserItem;
