import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages.js';

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.staticTextColor};
  padding: 10px;
  font-weight: bold;
`;

const StreamInfo = (props) => {
  const { streamData, platform } = props;
  const [uptime, setUptime] = useState('---');

  const calculateUptime = (startedAt) => {
    if (!startedAt) return 'Ładowanie...';

    const start = new Date(startedAt);
    const now = new Date();
    const diff = now - start;
    let hours = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (minutes.toString().length < 2) minutes = `0${minutes}`;
    if (seconds.toString().length < 2) seconds = `0${seconds}`;
    if (platform === 'kick') {
      hours = hours - 2;
    }
    return `${hours}:${minutes}:${seconds}`;
  };

  const isTwitch = platform === 'twitch';

  useEffect(() => {
    if (!streamData || !streamData.started_at) return;

    const update = () => setUptime(calculateUptime(streamData.started_at));
    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [streamData, platform]);

  return (
    <div>
      {streamData ? (
        <InfoContainer>
          <p>
            <FormattedMessage
              {...messages.title}
              values={{ title: streamData.title }}
            />
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px',
              marginBottom: '10px',
              justifyContent: 'space-between',
            }}
          >
            <span>
              <FormattedMessage {...messages.uptime} values={{ uptime }} />
            </span>
            <span
              style={{
                color: isTwitch ? '#9370DB' : '#7CFC00',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <FormattedMessage
                {...messages.game}
                values={{ game: streamData.game_name }}
              />
            </span>
            <span
              style={{
                color: 'red',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <svg
                fill="currentColor"
                width="20px"
                height="20px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z" />
              </svg>
              <FormattedMessage
                {...messages.viewers}
                values={{ count: streamData.viewer_count }}
              />
            </span>
          </div>
        </InfoContainer>
      ) : (
        <FormattedMessage {...messages.LOS} />
      )}
    </div>
  );
};

export default StreamInfo;
