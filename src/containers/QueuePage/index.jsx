import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import messages from './messages';
import { StreamTitle } from './components/StreamTitle';
import { StyledButton } from './components/StyledButton';
import { TopBar } from './components/TopBar';
import { TopButtons } from './components/TopButtons';
import WelcomeDialog from '../../components/WelcomeDialog';
import QueueWorker from '../../components/YoutubeWorker/QueueWorker';
import SettingsDialog from '../../components/SettingsDialog';
import SupportInformation from '../../components/SupportInformation';
import { API_KEY } from '../../config';

const QueuePage = () => {
  const [videoId, setVideoId] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const intl = useIntl();

  const leaveStream = () => {
    setVideoId('');
    setTitle('');
    sessionStorage.removeItem('gv-videoId');
    window.location.reload();
  };

  const launchWorker = (vidId) => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+liveStreamingDetails&id=${vidId}&key=${API_KEY}`
      )
      .then((res) => {
        if (res.data.items.length === 0) {
          setError('notVideo');
        } else if (res.data.items[0].snippet.liveBroadcastContent === 'none') {
          setError('notStream');
        } else {
          const stream = res.data.items[0];
          setVideoId(vidId);
          setTitle(stream.snippet.title);
          sessionStorage.setItem('gv-videoId', vidId);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          if (err.response.data.error.errors[0].reason.includes('Exceeded')) {
            setError('quotaExceeded');
          }
        } else {
          setVideoId(vidId);
          setTitle('Tytuł nieznany');
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
      setVideoId('test');
      setTitle('');
    } else {
      setError('invalidUrl');
    }
  };

  useEffect(() => {
    const id = sessionStorage.getItem('gv-videoId');
    if (id !== null) {
      launchWorker(id);
    }
  }, []);

  if (videoId === '') {
    return (
      <>
        <Helmet htmlAttributes={{ lang: intl.locale }}>
          <title>{intl.formatMessage({ ...messages.pageTitle })}</title>
        </Helmet>
        <WelcomeDialog passVideo={receiveVideo} error={error} variant={1} />
      </>
    );
  }
  return (
    <>
      <Helmet htmlAttributes={{ lang: intl.locale }}>
        <title>{intl.formatMessage({ ...messages.pageTitle })}</title>
      </Helmet>
      <TopBar>
        <div>
          <StreamTitle>{title}</StreamTitle>
          <StyledButton onClick={leaveStream}>
            <span>
              <FormattedMessage {...messages.leaveStreamBtn} />
            </span>
          </StyledButton>
        </div>
        <TopButtons>
          <SupportInformation />
          <SettingsDialog />
        </TopButtons>
      </TopBar>
      <QueueWorker videoId={videoId} />
    </>
  );
};

export default QueuePage;
