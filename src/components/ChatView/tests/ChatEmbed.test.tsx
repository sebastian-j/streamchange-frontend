import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { beforeEach, describe, expect, it } from 'vitest';

import ChatEmbed from '../ChatEmbed';

const mockStore = configureStore([]);

describe('<ChatEmbed />', () => {
  let store: MockStoreEnhanced<unknown, {}>;
  beforeEach(() => {
    store = mockStore({
      isDarkMode: false,
    });
  });
  it('should render Twitch chat and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <ChatEmbed channel="id" platform="twitch" />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render Kick chat and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <ChatEmbed channel="id" platform="kick" />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
