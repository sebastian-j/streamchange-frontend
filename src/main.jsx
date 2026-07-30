import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { translationMessages } from './i18n';
import LanguageProvider from './containers/LanguageProvider';
import StyleProvider from './containers/StyleProvider';
import configureStore from './configureStore';
import App from './containers/App/index.jsx';
import 'sanitize.css/sanitize.css';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore({});
const container = document.getElementById('app');
const root = createRoot(container); 
root.render(
  <Provider store={store}>
    <LanguageProvider messages={translationMessages}>
      <StyleProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyleProvider>
    </LanguageProvider>
  </Provider>
);
