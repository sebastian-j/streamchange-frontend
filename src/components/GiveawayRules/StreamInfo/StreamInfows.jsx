import {BACKEND_URL} from '../../../config';
export const fetchStreamInfo = async (channel, platform) => {
  const params = new URLSearchParams({
    channel: channel,
    platform: platform,
  });
  const response = await fetch(
 BACKEND_URL+`/api/stream-info?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Błąd HTTP: ${response.status}`);
  }

  return await response.json();
};
