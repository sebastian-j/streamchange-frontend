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

const PromotedVideo = (props) => (
  <PromotedContentWrapper>
    <AdTitle>
      <FormattedMessage {...messages.title} />
    </AdTitle>
    <PromotedContent>
      <iframe
        id="ytplayer"
        width="500"
        height="170"
        src={`https://www.youtube.com/embed/${props.videoId}?autoplay=0origin=https://www.streamchange.pl`}
        frameBorder="0"
        title="video"
      />
      <div>{props.description}</div>
    </PromotedContent>
  </PromotedContentWrapper>
);

PromotedVideo.propTypes = {
  description: PropTypes.string,
  videoId: PropTypes.string.isRequired,
};

export default PromotedVideo;
