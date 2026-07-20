import { useState } from 'react';
import YoutubeWorker from './components/YoutubeWorker';
import WelcomeDialog from './components/WelcomeDialog';
export default function App() {
  const [channelConfig, setChannelConfig] = useState(() => {
    const savedChannel = localStorage.getItem('gv-channel');
    const savedPlatform = localStorage.getItem('gv-platform');

    return savedChannel && savedPlatform
      ? { channel: savedChannel, platform: savedPlatform }
      : null;
  });

  const handleStartStream = (channelName, platformName) => {
    localStorage.setItem('gv-channel', channelName);
    localStorage.setItem('gv-platform', platformName);
    setChannelConfig({ channel: channelName, platform: platformName });
  };

  if (!channelConfig) {
    return <WelcomeDialog onStart={handleStartStream} />;
  }

  return (
    <>
      <YoutubeWorker
        channel={channelConfig.channel}
        platform={channelConfig.platform}
        apiKey="test"
      />
    </>
  );
}
