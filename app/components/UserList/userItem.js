import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import YoutubeLogo from './YoutubeLogo';

const Span = styled.span`
  margin-right: 5px;
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
        {props.isSponsor && <img alt="$" width="24" src={props.isSponsor} />}
      </UserButton>
    </li>
  );
};

UserItem.propTypes = {
  channelId: PropTypes.string,
  title: PropTypes.string.isRequired,
  isModerator: PropTypes.bool,
  isSponsor: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isEligible: PropTypes.bool,
  handleToggleUser: PropTypes.func.isRequired,
};

export default UserItem;
