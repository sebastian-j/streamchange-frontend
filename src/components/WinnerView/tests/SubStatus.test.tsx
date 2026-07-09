import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeEach } from 'vitest';

import SubStatus from '../SubStatus';

const mockStore = configureStore([]);

describe('<SubStatus />', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore({
      ownerId: 'id',
    });
  });
  it('should render and match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <SubStatus
          apiKey="key"
          id="id"
          streamInfo={{
            ownerId: 'owner',
            thumbnailUrl: 'url',
            title: 'stream',
            videoId: 'vid',
          }}
        />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
