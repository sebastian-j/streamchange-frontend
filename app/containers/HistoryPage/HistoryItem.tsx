import React from 'react';
import PropTypes from 'prop-types';

import { Cell } from './components/Cell';
import { Row } from './components/Row';
import RelativeDate from '../../components/RelativeDate';

const HistoryItem = (props) => (
  <Row>
    <Cell className="image">
      <a
        href={`https://www.youtube.com/channel/${props.channelId}`}
        target="_blank"
      >
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

HistoryItem.propTypes = {
  channelId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  displayName: PropTypes.string,
  prize: PropTypes.string,
  message: PropTypes.string,
  createdAt: PropTypes.string,
};
export default HistoryItem;
