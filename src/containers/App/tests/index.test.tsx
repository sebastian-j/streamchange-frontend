import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../index';

vi.mock('../../GiveawayPage/Loadable', () => ({
  default: () => <div>Giveaway page</div>,
}));

vi.mock('../../HistoryPage/Loadable', () => ({
  default: () => <div>History page</div>,
}));

vi.mock('../../QueuePage/Loadable', () => ({
  default: () => <div>Queue page</div>,
}));

vi.mock('../../NotFoundPage/Loadable', () => ({
  default: () => <div>Not found page</div>,
}));

vi.mock('../../../global-styles', () => ({
  default: () => null,
}));

const renderApp = (initialEntries = ['/']) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects from the root path to the giveaway page', () => {
    renderApp(['/']);

    expect(screen.getByText('Giveaway page')).toBeInTheDocument();
  });

  it('renders the giveaway page', () => {
    renderApp(['/giveaway']);

    expect(screen.getByText('Giveaway page')).toBeInTheDocument();
  });

  it('renders the history page', () => {
    renderApp(['/giveaway-history']);

    expect(screen.getByText('History page')).toBeInTheDocument();
  });

  it('renders the queue page', () => {
    renderApp(['/queue']);

    expect(screen.getByText('Queue page')).toBeInTheDocument();
  });

  it('renders the not found page for an unknown route', () => {
    renderApp(['/unknown-route']);

    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});