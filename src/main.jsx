import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { IntlProvider } from 'react-intl';
import { translationMessages, DEFAULT_LOCALE } from './i18n';

import configureStore from './configureStore';
import App from './App';

const initialState = {};
const store = configureStore(initialState);

const theme = {
  bodyBackground: '#121212',
};

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <IntlProvider locale={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </IntlProvider>
  </Provider>
);
