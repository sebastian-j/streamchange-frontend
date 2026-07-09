/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import GiveawayPage from '../GiveawayPage/Loadable';
import HistoryPage from '../HistoryPage/Loadable';
import QueuePage from '../QueuePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  useEffect(() => {
    if (!localStorage.getItem('gv-abortCommand')) {
      localStorage.setItem('gv-abortCommand', '!rezygnuje');
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/giveaway" replace />} />
        <Route path="/giveaway" element={<GiveawayPage />} />
        <Route path="/giveaway-history" element={<HistoryPage />} />
        <Route path="/queue" element={<QueuePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </div>
  );
}
