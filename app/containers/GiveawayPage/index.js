import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { makeSelectBanStatus, makeSelectStreamInfo } from './selectors';
import { changeStreamProperties, sendTelemetryData } from './actions';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import HistoryWidget from './HistoryWidget';
import WelcomeDialog from '../../components/WelcomeDialog';
import YoutubeWorker from '../../components/YoutubeWorker';
import SettingsDialog from '../../components/SettingsDialog';
import SupportInformation from '../../components/SupportInformation';
import { API_KEY } from '../../config';

const TopBar = styled.div`
  background-color: ${(props) => props.theme.panelBackground};
  display: flex;
  justify-content: space-between;
  @media (orientation: portrait) {
    flex-direction: column;
  }
`;

const StreamInfo = styled.div`
  height: 5vh;
`;

const StreamImg = styled.img`
  height: 100%;
`;

const StreamTitle = styled.span`
  color: ${(props) => props.theme.staticTextColor};
  margin-left: 10px;
`;

const TopButtons = styled.div`
  align-items: center;
  display: flex;
  @media (orientation: portrait) {
    display: flex;
    justify-content: space-between;
    margin: 30px 10px 4px 10px;
  }
`;

const StyledButton = styled(Button)`
  span {
    color: ${(props) => props.theme.color};
  }
`;

const GiveawayPage = (props) => {
  const [error, setError] = useState(null);
  useInjectSaga({ key: 'giveawayPage', saga: saga });

  const leaveStream = () => {
    const streamProps = {
      ownerId: '',
      thumbnailUrl: '',
      title: '',
      videoId: '',
    };
    props.changeStreamProperties(streamProps);
    sessionStorage.removeItem('gv-videoId');
    sessionStorage.removeItem('gv-title');
    sessionStorage.removeItem('gv-thumbnailUrl');
    window.location.reload();
  };

  const launchWorker = (vidId) => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+liveStreamingDetails&id=${vidId}&key=${API_KEY}`,
      )
      .then((res) => {
        if (res.data.items.length === 0) {
          setError('notVideo');
        } else if (res.data.items[0].snippet.liveBroadcastContent === 'none') {
          setError('notStream');
        } else {
          const stream = res.data.items[0];
          const streamProps = {
            ownerId: stream.snippet.channelId,
            thumbnailUrl: stream.snippet.thumbnails.medium.url,
            title: stream.snippet.title,
            videoId: vidId,
          };
          props.changeStreamProperties(streamProps);
          props.sendTelemetryData(streamProps);
          sessionStorage.setItem('gv-videoId', vidId);
          sessionStorage.setItem('gv-title', streamProps.title);
          sessionStorage.setItem('gv-thumbnailUrl', streamProps.thumbnailUrl);
          sessionStorage.setItem('gv-ownerId', streamProps.ownerId);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          if (err.response.data.error.errors[0].reason.includes('Exceeded')) {
            setError('quotaExceeded');
          }
        } else {
          const streamProps = {
            ownerId: '',
            thumbnailUrl:
              'https://i.ytimg.com/vi/HwsGz6csNA0/maxresdefault.jpg',
            title: 'Tytuł nieznany',
            videoId: vidId,
          };
          props.changeStreamProperties(streamProps);
          sessionStorage.setItem('gv-videoId', vidId);
        }
      });
  };

  const receiveVideo = (videoLink) => {
    if (videoLink.includes('v=')) {
      const vidId = videoLink.split('v=')[1].split('&')[0].split('/')[0];
      launchWorker(vidId);
    } else if (videoLink.includes('video/')) {
      const vidId = videoLink.split('video/')[1].split('/')[0];
      launchWorker(vidId);
    } else if (videoLink.includes('u.be/')) {
      const vidId = videoLink.split('be/')[1].split('?')[0];
      launchWorker(vidId);
    } else if (videoLink === 'test') {
      props.changeStreamProperties({
        ownerId: '',
        thumbnailUrl: 'https://i.ytimg.com/vi/HwsGz6csNA0/maxresdefault.jpg',
        title: '',
        videoId: 'test',
      });
    } else {
      setError('invalidUrl');
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem('gv-videoId');
    const storedTitle = sessionStorage.getItem('gv-title');
    const storedThumbnail = sessionStorage.getItem('gv-thumbnailUrl');
    const storedOwnerId = sessionStorage.getItem('gv-ownerId');
    if (
      id !== null &&
      storedTitle !== null &&
      storedThumbnail !== null &&
      storedOwnerId !== null
    ) {
      const streamProps = {
        ownerId: storedOwnerId,
        thumbnailUrl: storedThumbnail,
        title: storedTitle,
        videoId: id,
      };
      props.changeStreamProperties(streamProps);
    }
  }, []);

  if (props.streamInfo.videoId === '' || props.ban !== null) {
    return (
      <WelcomeDialog
        passVideo={receiveVideo}
        ban={props.ban}
        error={error}
        variant={0}
      />
    );
  }
  return (
    <div>
      <FormattedMessage {...messages.pageTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <TopBar>
        <StreamInfo>
          <StreamImg alt="Thumbnail" src={props.streamInfo.thumbnailUrl} />
          <StreamTitle>{props.streamInfo.title}</StreamTitle>
          <StyledButton onClick={leaveStream}>
            <FormattedMessage {...messages.leaveStreamBtn} />
          </StyledButton>
        </StreamInfo>
        <TopButtons>
          <HistoryWidget />
          <SupportInformation />
          <SettingsDialog />
        </TopButtons>
      </TopBar>
      <YoutubeWorker videoId={props.streamInfo.videoId} apiKey={API_KEY} />
    </div>
  );
};

GiveawayPage.propTypes = {
  ban: PropTypes.object,
  changeStreamProperties: PropTypes.func.isRequired,
  sendTelemetryData: PropTypes.func,
  streamInfo: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ban: makeSelectBanStatus(),
  streamInfo: makeSelectStreamInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changeStreamProperties: (st) => dispatch(changeStreamProperties(st)),
    sendTelemetryData: (st) => dispatch(sendTelemetryData(st)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveawayPage);
