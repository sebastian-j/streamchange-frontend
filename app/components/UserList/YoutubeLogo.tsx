import React from 'react';
import styled from 'styled-components';

const A = styled.a`
  color: inherit;
  margin-right: 3px;
  svg {
    g {
      transform: scale(0.176);
      path {
        transition: color 100ms ease-out 0ms;
      }
      polygon {
        color: white;
      }
      &:hover path {
        color: #ff0000;
      }
    }
  }
`;

interface Props {
  channelId: string;
}

const YoutubeLogo = ({ channelId }: Props) => (
  <A
    href={`https://www.youtube.com/channel/${channelId}`}
    target="_blank"
    onClick={(event) => event.stopPropagation()}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="20"
      viewBox="0 0 24 17"
    >
      <g>
        <path d="M 118.9,13.3 C 117.5,8.1 113.4,4 108.2,2.6 98.7,0 60.7,0 60.7,0 60.7,0 22.7,0 13.2,2.5 8.1,3.9 3.9,8.1 2.5,13.3 0,22.8 0,42.5 0,42.5 0,42.5 0,62.3 2.5,71.7 3.9,76.9 8,81 13.2,82.4 22.8,85 60.7,85 60.7,85 c 0,0 38,0 47.5,-2.5 5.2,-1.4 9.3,-5.5 10.7,-10.7 2.5,-9.5 2.5,-29.2 2.5,-29.2 0,0 0.1,-19.8 -2.5,-29.3 z" />
        <polygon points="80.2,42.5 48.6,24.3 48.6,60.7" />
      </g>
    </svg>
  </A>
);

export default YoutubeLogo;
