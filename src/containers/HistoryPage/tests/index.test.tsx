import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import HistoryPage from '../index';

const testState = vi.hoisted(() => ({
  items: [
    {
      id: 1,
      displayName: 'Alice',
    },
    {
      id: 2,
      displayName: 'Bob',
    },
  ],
  shouldReject: false,
  shouldPend: false,
}));

vi.mock('../../../components/StreamerWorker/db', () => ({
  default: {
    table: vi.fn(() => {
      let result = [...testState.items];
      let offsetValue = 0;
      let limitValue = result.length;

      const query = {
        filter: vi.fn((predicate: (item: unknown) => boolean) => {
          result = result.filter(predicate);
          return query;
        }),

        reverse: vi.fn(() => {
          result.reverse();
          return query;
        }),

        offset: vi.fn((value: number) => {
          offsetValue = value;
          return query;
        }),

        limit: vi.fn((value: number) => {
          limitValue = value;
          return query;
        }),

        toArray: vi.fn(() => {
          if (testState.shouldPend) {
            return new Promise(() => undefined);
          }

          if (testState.shouldReject) {
            return Promise.reject(new Error('Database error'));
          }

          return Promise.resolve(
            result.slice(offsetValue, offsetValue + limitValue)
          );
        }),
      };

      return query;
    }),
  },
}));

vi.mock('../HistoryTable', () => ({
  default: ({
    items,
  }: {
    items: Array<{ id: number; displayName: string }>;
  }) => (
    <table>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.displayName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

const renderPage = () =>
  render(
    <IntlProvider locale="en" messages={{}}>
      <HistoryPage />
    </IntlProvider>
  );

describe('<HistoryPage />', () => {
  beforeEach(() => {
    testState.items = [
      {
        id: 1,
        displayName: 'Alice',
      },
      {
        id: 2,
        displayName: 'Bob',
      },
    ];
    testState.shouldReject = false;
    testState.shouldPend = false;
  });

  it('renders the loading state while history is loading', () => {
    testState.shouldPend = true;

    renderPage();

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('Loading history')).toBeInTheDocument();
  });

  it('renders an error message when loading history fails', async () => {
    testState.shouldReject = true;

    renderPage();

    expect(await screen.findByText('Cannot load list')).toBeInTheDocument();
  });
});
