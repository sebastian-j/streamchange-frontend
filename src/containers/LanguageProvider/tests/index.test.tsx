import { render } from '@testing-library/react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Provider } from 'react-redux';
import { beforeAll, describe, expect, it } from 'vitest';

import configureStore from '../../../configureStore';
import { translationMessages } from '../../../i18n';
import ConnectedLanguageProvider from '../index';
import { LanguageProvider } from '../LanguageProviderComponent';

const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    en: 'This is some en message',
  },
});

describe('<LanguageProvider />', () => {
  it('should render its children', () => {
    const children = <h1>Test</h1>;
    const { container } = render(
      <LanguageProvider messages={messages} locale="en">
        {children}
      </LanguageProvider>
    );
    expect(container.firstChild).not.toBeNull();
  });
});

describe('<ConnectedLanguageProvider />', () => {
  let store: ReturnType<typeof configureStore>;

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render the default language messages', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <ConnectedLanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </ConnectedLanguageProvider>
      </Provider>
    );
    expect(queryByText(messages.someMessage.defaultMessage)).not.toBeNull();
  });
});
