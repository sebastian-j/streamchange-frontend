import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RelativeDate from '../../components/RelativeDate';

const Row = styled.tr`
  height: 50px;
`;

const Cell = styled.td`
  border-bottom: 1px solid #5e5e5e;
  border-spacing: 0;
  border-collapse: collapse;
  color: ${(props) => props.theme.staticTextColor};
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  &.image {
    max-width: 100px;
  }
  &.textLeft {
    font-size: 1rem;
    padding: 14px 30px 14px 16px;
    text-align: left;
  }
  &.text {
    font-size: 0.875rem;
    padding: 14px 30px 14px 16px;
    text-align: right;
  }
`;

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
