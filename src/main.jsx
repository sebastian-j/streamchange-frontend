import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { translationMessages, DEFAULT_LOCALE } from './i18n';
import LanguageProvider from './containers/LanguageProvider';
import StyleProvider from './containers/StyleProvider'; 
import configureStore from './configureStore';
import App from './App';
import 'sanitize.css/sanitize.css';

const initialState = {};
const store = configureStore(initialState);
const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <IntlProvider locale={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
      <StyleProvider>
        <App />
      </StyleProvider>
    </IntlProvider>
  </Provider>
);