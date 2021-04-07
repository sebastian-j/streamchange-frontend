import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const AdTitle = styled.span`
  color: #7b7b7b;
  font-family: Arial, sans-serif;
  margin-bottom: 5px;
  margin-right: ${({ margin }) => margin}px;
`;

const PromotedContentWrapper = styled.div`
  margin-bottom: ${({ margin }) => margin}px;
  position: relative;
  top: calc(45vh - ${({ offset }) => offset}px);
`;

const Image = styled.img`
  width: 31vw;
`;

const Shield = styled.div`
  bottom: 0;
  left: 0;
  padding-bottom: ${({ margin }) => margin}px;
  position: absolute;
  right: 0;
  top: 10px;
`;

const PromotedBanner = (props) => {
  const [imgHeight, setImgHeight] = useState(0);
  const isVideo = props.imageUrl.substr(props.imageUrl.length - 3) === 'mp4';

  const onImgLoad = ({ target: img }) => {
    setImgHeight(img.offsetHeight);
  };

  const onVideoLoad = ({ target: video }) => {
    setImgHeight(Math.round(video.videoHeight * 0.6));
  };

  return (
    <PromotedContentWrapper
      offset={imgHeight}
      margin={props.testMargins ? 1 : Math.round(Math.random() * 1000) / 100}
    >
      <AdTitle
        margin={props.testMargins ? 1 : Math.round(Math.random() * 1000) / 100}
      >
        <FormattedMessage {...messages.title} />
      </AdTitle>
      <a href={props.channelUrl} target="_blank">
        <div>
          {!isVideo && (
            <Image alt={props.title} onLoad={onImgLoad} src={props.imageUrl} />
          )}
          {isVideo && (
            <video
              width="100%"
              title={props.title}
              autoPlay
              loop
              muted
              onLoadedMetadata={onVideoLoad}
            >
              <source src={props.imageUrl} type="video/mp4" />
            </video>
          )}
        </div>
        <Shield
          margin={
            props.testMargins ? 1 : Math.round(Math.random() * 1000) / 100
          }
        />
        <Shield
          margin={
            props.testMargins ? 1 : Math.round(Math.random() * 1000) / 100
          }
        />
        <Shield
          margin={
            props.testMargins ? 1 : Math.round(Math.random() * 1000) / 100
          }
        />
      </a>
    </PromotedContentWrapper>
  );
};

PromotedBanner.propTypes = {
  channelUrl: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  testMargins: PropTypes.bool,
  title: PropTypes.string,
};

PromotedBanner.defaultProps = {
  testMargins: false,
};

export default PromotedBanner;
