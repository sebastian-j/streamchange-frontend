import { BACKEND_URL } from '../../config';

export const streamInfoPost = async (channel, platform) => {
  if (!channel || !platform) {
    throw new Error('invalidUrl');
  }

  const response = await fetch(`${BACKEND_URL}/api/stream-info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel: channel.trim(),
      platform: platform.trim(),
    }),
  });

  if (!response.ok) {
    throw new Error('notStream');
  }

  const data = await response.json();

  if (!data || !data.is_live) {
    throw new Error('notStream');
  }

  return data;
};