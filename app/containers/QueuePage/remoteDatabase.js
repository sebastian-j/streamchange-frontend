import axios from 'axios';
import qs from 'qs';
import { API_URL } from '../../config';

export function deleteQueueItem(channelId) {
  const code = localStorage.getItem('queue-widget-code');
  let str = `${API_URL}/v4/queue?key=${code}`;
  if (channelId) str += `&channelId=${channelId}`;
  axios.delete(str).then(() => {});
}

export function postQueueItem(item) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const queueData = {
    key: localStorage.getItem('queue-widget-code'),
    channelId: item.id,
    title: item.title,
    description: item.message,
    imageUrl: item.imageUrl,
    addedAt: item.addedAt,
    lastActiveAt: item.lastActiveAt,
    tti: parseInt(localStorage.getItem('queue-timeToIdle'), 10),
    ttk: parseInt(localStorage.getItem('queue-timeToKick'), 10),
  };
  axios
    .post(`${API_URL}/v4/queue`, qs.stringify(queueData), config)
    .then(() => {})
    .catch(() => {});
}

export function updateQueueItem(item) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const queueData = {
    key: localStorage.getItem('queue-widget-code'),
    channelId: item.id,
  };
  if (item.lastActiveAt) {
    queueData.lastActiveAt = item.lastActiveAt;
  }
  if (item.message) {
    queueData.description = item.message;
  }
  axios
    .put(`${API_URL}/v4/queue`, qs.stringify(queueData), config)
    .then(() => {})
    .catch(() => {});
}
