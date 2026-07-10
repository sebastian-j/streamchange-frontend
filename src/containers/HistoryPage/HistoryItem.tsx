import React from 'react';
import PropTypes from 'prop-types';

import { Cell } from './components/Cell';
import { Row } from './components/Row';
import RelativeDate from '../../components/RelativeDate';

const TextReplace = (channelId) => {
  let channelIDKick = channelId.replace('_', '-');
  return channelIDKick;
};
const HistoryItem = (props) => {
  const channelUrl =
    props.platform === 'twitch'
      ? `https://www.twitch.tv/${props.channelId}`
      : `https://kick.com/${TextReplace(props.channelId)}`;

  return (
    <Row>
      <Cell className="image">
        <a href={channelUrl} target="_blank" rel="noopener noreferrer">
          <img alt="Logo" src={props.imageUrl} height="45px" />
        </a>
      </Cell>
      <Cell className="textLeft">
        <span>{props.displayName}</span>
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
  displayName: PropTypes.string,
  prize: PropTypes.string,
  message: PropTypes.string,
  createdAt: PropTypes.string,
};
export default HistoryItem;
