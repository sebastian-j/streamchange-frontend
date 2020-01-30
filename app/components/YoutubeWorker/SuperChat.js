import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const OuterFrame = styled.div`
  background-color: #39acff;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  font-family: Roboto, sans-serif;
  left: 50%;
  top: 80vh;
  transform: translateX(-50%);
  position: absolute;
  width: 25vw;
  animation: ${fadeIn} 0.5s ease-out;
`;

const TopBar = styled.div`
  background-color: #0094ff;
  border-radius: 4px 4px 0 0;
  font-weight: bold;
`;

const Logo = styled.img`
  border-radius: 50%;
  height: 32px;
  width: 32px;
  margin: 6px;
`;

const MessageContent = styled.span`
  display: block;
  margin: 6px;
`;

const SuperChat = props => (
  <OuterFrame>
    <TopBar>
      <Logo src={props.imageUrl} alt="logo" /> {props.title}
    </TopBar>
    <MessageContent>{props.message}</MessageContent>
  </OuterFrame>
);

SuperChat.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SuperChat;
