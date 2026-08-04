import { Avatar } from './components/Avatar';
import { AvatarFallback } from '../../components/AvatarFallback';
import { Cell } from './components/Cell';
import { ChannelLink } from './components/ChannelLink';
import { ChannelName } from './components/ChannelName';
import { Row } from './components/Row';
import RelativeDate from '../../components/RelativeDate';

const toKickSlug = (channelId) => channelId.replaceAll('_', '-');

type HistoryItemProps = {
  channelId: string;
  imageUrl?: string;
  platform?: string;
  displayName?: string;
  color?: string;
  prize?: string;
  message?: string;
  createdAt?: string;
};

const HistoryItem = (props: HistoryItemProps) => {
  const channelUrl =
    props.platform === 'twitch'
      ? `https://www.twitch.tv/${props.channelId}`
      : `https://kick.com/${toKickSlug(props.channelId)}`;

  return (
    <Row>
      <Cell className="identity">
        <ChannelLink
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.imageUrl ? (
            <Avatar alt={props.displayName} src={props.imageUrl} />
          ) : (
            <AvatarFallback $userColor={props.color} aria-hidden="true">
              {props.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
          <ChannelName $userColor={props.color}>
            {props.displayName}
          </ChannelName>
        </ChannelLink>
      </Cell>
      <Cell className="text">
        <span>{props.prize}</span>
      </Cell>
      <Cell className="text">
        <span>{props.message}</span>
      </Cell>
      <Cell className="text">
        <RelativeDate ISO8601Date={props.createdAt} />
      </Cell>
    </Row>
  );
};

export default HistoryItem;
