import React from 'react';
import PropTypes from 'prop-types';

const ArrowUpIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={props.className}
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
  </svg>
);

ArrowUpIcon.propTypes = {
  className: PropTypes.string,
};
export default ArrowUpIcon;
