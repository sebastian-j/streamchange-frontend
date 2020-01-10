import React from 'react';
import PropTypes from 'prop-types';

function MessageItem(props) {
  const dt = new Date(props.date);
  const convertedDate = `${dt.getHours()}:${
    dt.getMinutes() < 10 ? '0' : ''
  }${dt.getMinutes()}:${dt.getSeconds() < 10 ? '0' : ''}${dt.getSeconds()}`;
  return (
    <li className="winner-message">
      <span>{convertedDate}</span>
      <span>{props.text}</span>
    </li>
  );
}

MessageItem.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default MessageItem;
