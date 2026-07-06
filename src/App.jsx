import React, { useState, useEffect } from 'react';
import YoutubeWorker from './components/YoutubeWorker';
import WelcomeDialog from './components/WelcomeDialog'; 

export default function App() {
  const [channelConfig, setChannelConfig] = useState(null);

  useEffect(() => {
    const savedChannel = localStorage.getItem('gv-channel');
    const savedPlatform = localStorage.getItem('gv-platform');
    
    if (savedChannel && savedPlatform) {
      setChannelConfig({ channel: savedChannel, platform: savedPlatform });
    }
  }, []);

  const handleStartStream = (channelName, platformName) => {
    localStorage.setItem('gv-channel', channelName);
    localStorage.setItem('gv-platform', platformName);
    setChannelConfig({ channel: channelName, platform: platformName });
  };

  if (!channelConfig) {
    return (
      <WelcomeDialog onStart={handleStartStream} />
    );
  }

  return (
    <YoutubeWorker 
      videoId={channelConfig.channel} 
      platform={channelConfig.platform} 
      apiKey="test" 
    />
  );
}
