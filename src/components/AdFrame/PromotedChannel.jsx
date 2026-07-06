import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Slide = keyframes`
  0% {
    top: 33vh;
  }
  50% {
    top: 10vh;
  }
  100% {
    top: 33vh;
  }
`;

const AdTitle = styled.span`
  color: #7b7b7b;
  font-family: Arial, sans-serif;
  margin-bottom: 5px;
`;

const PromotedContentWrapper = styled.div`
  animation: ${Slide} 240s linear infinite;
  position: relative;
`;

const PromotedContent = styled.div`
  border: 1px solid #cecece;
  color: ${(props) => props.theme.staticTextColor};
  display: flex;
  flex-direction: row;
  padding: 14px;
`;

const PromotedChannelLogo = styled.img`
  padding-right: 5px;
  width: 7vw;
`;

const PromotedChannelTitle = styled.a`
  color: ${(props) => props.theme.staticTextColor};
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 4px;
  text-decoration: none;
`;

const PromotedChannel = (props) => (
  <PromotedContentWrapper>
    <AdTitle>
      <FormattedMessage {...messages.title} />
    </AdTitle>
    <PromotedContent>
      <a href={props.channelUrl} target="_blank">
        <PromotedChannelLogo alt={props.title} src={props.imageUrl} />
      </a>
      <div>
        <PromotedChannelTitle href={props.channelUrl} target="_blank">
          {props.title}
        </PromotedChannelTitle>
        <div>{props.description}</div>
      </div>
    </PromotedContent>
  </PromotedContentWrapper>
);

PromotedChannel.propTypes = {
  channelUrl: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default PromotedChannel;
