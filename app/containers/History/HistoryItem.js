import React from 'react';
import PropTypes from 'prop-types';
import RelativeDate from '../../components/RelativeDate';

const HistoryItem = props => (
  <tr className="md-tr">
    <td className="md-td md-td-image">
      <a
        href={`https://www.youtube.com/channel/${props.channelId}`}
        target="_blank"
      >
        <img alt="Logo" src={props.imageUrl} height="45px" />
      </a>
    </td>
    <td className="md-td md-td-text-left">
      <span>{props.displayName}</span>
    </td>
    <td className="md-td md-td-text">
      <span>{props.prize}</span>
    </td>
    <td className="md-td md-td-text">
      <span>{props.message}</span>
    </td>
    <td className="md-td md-td-text">
      <RelativeDate ISO8601Date={props.createdAt} />
    </td>
  </tr>
);

HistoryItem.propTypes = {
  channelId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  displayName: PropTypes.string,
  prize: PropTypes.string,
  message: PropTypes.number,
  createdAt: PropTypes.string,
};
export default HistoryItem;
