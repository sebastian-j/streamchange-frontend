// Type your key from Google Developer Console
export const API_KEY = import.meta.env.VITE_YOUTUBE_BACKEND_KEY;
// If you use different API, type its URL here
export const API_URL = import.meta.env.VITE_YOUTUBE_BACKEND_URL;
// Type IDs of channels that will have access to special functions
export const PRIVILEGED_CHANNELS = ['ID1', 'ID2'];
// Type hints that will display on welcome screen
export const HINTS = ['hint1', 'hint2'];
// Backend API URL
export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';
// WebSocket endpoint for live chat, set VITE_WS_URL to override
export const WS_URL =
  import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:8000/ws/chat';
