import { useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const AdTitle = styled.span<{ margin: number }>`
  color: #7b7b7b;
  font-family: Arial, sans-serif;
  margin-bottom: 5px;
  margin-right: ${({ margin }) => margin}px;
`;

const PromotedContentWrapper = styled.div<{ margin: number; offset: number }>`
  margin-bottom: ${({ margin }) => margin}px;
  position: relative;
  top: calc(45vh - ${({ offset }) => offset}px);
`;

const Image = styled.img`
  width: 31vw;
`;

const Shield = styled.div<{ margin: number }>`
  bottom: 0;
  left: 0;
  padding-bottom: ${({ margin }) => margin}px;
  position: absolute;
  right: 0;
  top: 10px;
`;

type PromotedBannerProps = {
  channelUrl: string;
  imageUrl: string;
  testMargins?: boolean;
  title?: string;
};

const PromotedBanner = ({
  channelUrl,
  imageUrl,
  testMargins = false,
  title,
}: PromotedBannerProps) => {
  const [imgHeight, setImgHeight] = useState<number>(0);
  const isVideo = imageUrl.substr(imageUrl.length - 3) === 'mp4';

  const onImgLoad = ({ target: img }) => {
    setImgHeight(img.offsetHeight);
  };

  const onVideoLoad = ({ target: video }) => {
    setImgHeight(Math.round(video.videoHeight * 0.8));
  };

  return (
    <PromotedContentWrapper
      offset={imgHeight}
      // eslint-disable-next-line react-hooks/purity -- intentional per-render jitter to defeat adblock DOM-pattern detection
      margin={testMargins ? 1 : Math.round(Math.random() * 1000) / 100}
    >
      <AdTitle
        // eslint-disable-next-line react-hooks/purity -- intentional per-render jitter to defeat adblock DOM-pattern detection
        margin={testMargins ? 1 : Math.round(Math.random() * 1000) / 100}
      >
        <FormattedMessage {...messages.title} />
      </AdTitle>
      <a href={channelUrl} target="_blank">
        <div>
          {!isVideo && <Image alt={title} onLoad={onImgLoad} src={imageUrl} />}
          {isVideo && (
            <video
              width="100%"
              title={title}
              autoPlay
              loop
              muted
              onLoadedMetadata={onVideoLoad}
            >
              <source src={imageUrl} type="video/mp4" />
            </video>
          )}
        </div>
        {/* eslint-disable react-hooks/purity -- intentional per-render jitter to defeat adblock DOM-pattern detection */}
        <Shield
          margin={testMargins ? 1 : Math.round(Math.random() * 1000) / 100}
        />
        <Shield
          margin={testMargins ? 1 : Math.round(Math.random() * 1000) / 100}
        />
        <Shield
          margin={testMargins ? 1 : Math.round(Math.random() * 1000) / 100}
        />
        {/* eslint-enable react-hooks/purity */}
      </a>
    </PromotedContentWrapper>
  );
};

export default PromotedBanner;
