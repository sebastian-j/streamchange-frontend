import PropTypes from 'prop-types';
import clsx from 'clsx';
import InternalChatBadges from '../ChatView/InternalChatBadges';
import { UserButton } from './components/UserButton';

const UserItem = (props) => {
  const toggleEligible = () => {
    props.handleToggleUser(props.channelId);
  };

  const badgeMessage = {
    platform: props.platform,
    isStreamer: props.isStreamer,
    isModerator: props.isModerator,
    isVip: props.isVip,
    isSubscriber: props.isSubscriber,
  };

  return (
    <li>
      <UserButton
        className={clsx(props.isEligible && 'isEligible')}
        userColor={props.color}
        onClick={toggleEligible}
        type="button"
      >
        <InternalChatBadges message={badgeMessage} />
        <span>{props.title}</span>
      </UserButton>
    </li>
  );
};

UserItem.propTypes = {
  channelId: PropTypes.string,
  color: PropTypes.string,
  platform: PropTypes.string,
  title: PropTypes.string.isRequired,
  isModerator: PropTypes.bool,
  isStreamer: PropTypes.bool,
  isSubscriber: PropTypes.bool,
  isVip: PropTypes.bool,
  isEligible: PropTypes.bool,
  handleToggleUser: PropTypes.func.isRequired,
};

export default UserItem;
