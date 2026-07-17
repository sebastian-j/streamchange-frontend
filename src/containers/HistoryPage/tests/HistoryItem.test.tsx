import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { describe, expect, it } from 'vitest';

import HistoryItem from '../HistoryItem';

describe('<HistoryItem />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(
      <IntlProvider locale="en" messages={{}}>
        <HistoryItem
          channelId="id"
          displayName="abc"
          message="abc"
          prize="prize"
          imageUrl="url"
          createdAt="2019-12-24T07:27:56.273Z"
        />
      </IntlProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
