import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const A = styled.a`
  color: inherit;
  margin-right: 3px;
  path {
    transform: scale(0.3);
    transition: color 100ms ease-out 0ms;
  }
  svg:hover path {
    color: #ff0000;
  }
`;

const YoutubeLogo = (props) => (
  <A
    href={`https://www.youtube.com/channel/${props.channelId}`}
    target="_blank"
    onClick={(event) => event.stopPropagation()}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="20"
      viewBox="0 0 24 17"
    >
      <g id="g5" transform="scale(0.58823529,0.58823529)">
        <path d="M 118.9,13.3 C 117.5,8.1 113.4,4 108.2,2.6 98.7,0 60.7,0 60.7,0 60.7,0 22.7,0 13.2,2.5 8.1,3.9 3.9,8.1 2.5,13.3 0,22.8 0,42.5 0,42.5 0,42.5 0,62.3 2.5,71.7 3.9,76.9 8,81 13.2,82.4 22.8,85 60.7,85 60.7,85 c 0,0 38,0 47.5,-2.5 5.2,-1.4 9.3,-5.5 10.7,-10.7 2.5,-9.5 2.5,-29.2 2.5,-29.2 0,0 0.1,-19.8 -2.5,-29.3 z" />
        <polygon
          points="80.2,42.5 48.6,24.3 48.6,60.7 "
          style={{ color: 'white', transform: 'scale(0.3)' }}
        />
      </g>
    </svg>
  </A>
);

YoutubeLogo.propTypes = {
  channelId: PropTypes.string,
};
export default YoutubeLogo;
