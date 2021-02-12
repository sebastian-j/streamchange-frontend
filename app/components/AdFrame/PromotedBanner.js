import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Slide = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-180px);
  }
  100% {
    transform: translateY(0px);
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
  top: calc(55vh - ${({ offset }) => offset}px);
`;

const Image = styled.img`
  width: 31vw;
`;

const PromotedBanner = props => {
  const [imgHeight, setImgHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    setImgHeight(img.offsetHeight);
  };

  return (
    <PromotedContentWrapper offset={imgHeight}>
      <AdTitle>
        <FormattedMessage {...messages.title} />
      </AdTitle>
      <a href={props.channelUrl} target="_blank">
        <Image alt={props.title} onLoad={onImgLoad} src={props.imageUrl} />
      </a>
    </PromotedContentWrapper>
  );
};

PromotedBanner.propTypes = {
  channelUrl: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default PromotedBanner;
