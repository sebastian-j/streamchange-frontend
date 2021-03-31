import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import YoutubeLogo from './YoutubeLogo';

const Span = styled.span`
  vertical-align: middle;
`;

const Svg = styled.svg`
  display: inline-block;
  margin-left: 5px;
  margin-right: 10px;
  height: 1em;
  width: 1em;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.inactiveUser};
  cursor: pointer;
  line-height: 1.43;
  margin: 6px 5px;
  padding: 0;
  outline: 0;
  ${(props) =>
    props.isEligible &&
    `
    color: ${props.theme.color};
`}
`;

const UserItem = (props) => {
  const toggleEligible = () => {
    props.handleToggleUser(props.channelId);
  };

  return (
    <li>
      <UserButton
        isEligible={props.isEligible}
        onClick={toggleEligible}
        type="button"
      >
        <YoutubeLogo channelId={props.channelId} />
        <Span>{props.title}</Span>
        {props.isModerator && (
          <Svg viewBox="0 0 16 16">
            <g>
              <path d="M9.64589146,7.05569719 C9.83346524,6.562372 9.93617022,6.02722257 9.93617022,5.46808511 C9.93617022,3.00042984 7.93574038,1 5.46808511,1 C4.90894765,1 4.37379823,1.10270499 3.88047304,1.29027875 L6.95744681,4.36725249 L4.36725255,6.95744681 L1.29027875,3.88047305 C1.10270498,4.37379824 1,4.90894766 1,5.46808511 C1,7.93574038 3.00042984,9.93617022 5.46808511,9.93617022 C6.02722256,9.93617022 6.56237198,9.83346524 7.05569716,9.64589147 L12.4098057,15 L15,12.4098057 L9.64589146,7.05569719 Z" />
            </g>
          </Svg>
        )}
        {props.isSponsor && (
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <g>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
              <path fill="none" d="M0 0h24v24H0z" />
            </g>
          </Svg>
        )}
      </UserButton>
    </li>
  );
};

UserItem.propTypes = {
  channelId: PropTypes.string,
  title: PropTypes.string.isRequired,
  isModerator: PropTypes.bool,
  isSponsor: PropTypes.bool,
  isEligible: PropTypes.bool,
  handleToggleUser: PropTypes.func.isRequired,
};

export default UserItem;
