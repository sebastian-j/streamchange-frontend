import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IntlProvider } from 'react-intl';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';

import AdFrame from '../index';

vi.mock('axios');

const mockedAxios = vi.mocked(axios);

describe('<AdFrame />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-05-18T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('renders the empty advertisement placeholder while content is loading', () => {
    mockedAxios.get.mockReturnValue(new Promise(() => {}));

    render(
      <IntlProvider locale="en">
        <AdFrame />
      </IntlProvider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(mockedAxios.get).toHaveBeenCalledWith('../static/sellers.json');
  });
});
