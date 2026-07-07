import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { translationMessages, DEFAULT_LOCALE } from './i18n';

import configureStore from './configureStore';
import App from './App';

const store = configureStore({});
const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <LanguageProvider messages={translationMessages}>
      <StyleProvider>
        <App />
      </StyleProvider>
    </LanguageProvider>
  </Provider>
);
