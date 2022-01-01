import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  color: ${(props) => props.theme.staticTextColor};
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms ease-out 0ms,
    transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &.active {
    opacity: 1;
  }
  &.descending {
    transform: rotate(180deg);
  }
`;
const ArrowUpIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={props.className}
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
  </Svg>
);

ArrowUpIcon.propTypes = {
  className: PropTypes.string,
};
export default ArrowUpIcon;
