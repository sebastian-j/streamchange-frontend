/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

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
      <Switch>
        <Route exact path="/giveaway" component={GiveawayPage} />
        <Route exact path="/giveaway-history" component={HistoryPage} />
        <Route exact path="/queue" component={QueuePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
