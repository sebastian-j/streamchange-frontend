import React from 'react';
import PropTypes from 'prop-types';

import { Avatar } from './components/Avatar';
import { AvatarFallback } from './components/AvatarFallback';
import { Cell } from './components/Cell';
import { ChannelLink } from './components/ChannelLink';
import { ChannelName } from './components/ChannelName';
import { Row } from './components/Row';
import RelativeDate from '../../components/RelativeDate';

const toKickSlug = (channelId) => channelId.replaceAll('_', '-');

const HistoryItem = (props) => {
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

HistoryItem.propTypes = {
  channelId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  platform: PropTypes.string,
  displayName: PropTypes.string,
  color: PropTypes.string,
  prize: PropTypes.string,
  message: PropTypes.string,
  createdAt: PropTypes.string,
};
export default HistoryItem;
