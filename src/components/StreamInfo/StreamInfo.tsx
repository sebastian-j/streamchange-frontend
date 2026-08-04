import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages.js';
import { getPlatformColor } from '../../theme.js';

const Card = styled.div`
  border: 1px solid ${(props) => props.theme.secondaryTextColor}44;
  background: ${(props) => props.theme.panelBackground};
  padding: 12px 16px;
  margin-top: 16px;
  font-family: 'Roboto', sans-serif;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Stat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.secondaryTextColor};
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.staticTextColor};
  text-align: left;
  line-height: 1.3;
  word-break: break-word;
`;

const ViewerStat = styled(Stat)`
  color: #e53935;
`;

const Category = styled.div<{ $platform: string }>`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => getPlatformColor(props.$platform)};
  text-align: left;
  margin-top: 4px;
`;

const NoStream = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.secondaryTextColor};
  text-align: center;
  padding: 8px 0;
  margin-top: 16px;
`;

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
  </svg>
);

const ViewerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const StreamInfo = (props: { streamData: any; platform: string }) => {
  const { streamData, platform } = props;
  const [uptime, setUptime] = useState('---');

  useEffect(() => {
    if (!streamData || !streamData.started_at) return;

    const calculateUptime = (startedAt: string) => {
      if (!startedAt) return 'Ładowanie...';

      const start = new Date(startedAt).getTime();
      const now = new Date().getTime();
      const diff = now - start;
      let hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const minutesStr = minutes.toString().padStart(2, '0');
      const secondsStr = seconds.toString().padStart(2, '0');
      if (platform === 'kick') {
        hours = hours - 2;
      }
      return `${hours}:${minutesStr}:${secondsStr}`;
    };

    const update = () => setUptime(calculateUptime(streamData.started_at));
    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [streamData, platform]);

  if (!streamData) {
    return (
      <NoStream>
        <FormattedMessage {...messages.LOS} />
      </NoStream>
    );
  }

  return (
    <Card>
      <TopRow>
        <Stat>
          <ClockIcon />
          <FormattedMessage {...messages.uptime} values={{ uptime }} />
        </Stat>
        <ViewerStat>
          <ViewerIcon />
          <FormattedMessage
            {...messages.viewers}
            values={{ count: streamData.viewer_count }}
          />
        </ViewerStat>
      </TopRow>
      <Title>
        <FormattedMessage
          {...messages.title}
          values={{ title: streamData.title }}
        />
      </Title>
      <Category $platform={platform}>
        <FormattedMessage
          {...messages.game}
          values={{ game: streamData.game_name }}
        />
      </Category>
    </Card>
  );
};

export default StreamInfo;
