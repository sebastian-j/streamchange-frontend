import '@testing-library/jest-dom/vitest';

import { fireEvent, render, type RenderResult } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import configureStore from '../../../configureStore';
import ConnectedQueueRules, { mapDispatchToProps } from '../QueueRules';

type ActionPayload = string | number;

interface TestAction {
  type: string;
  payload: ActionPayload;
}

interface PanelProps {
  children?: React.ReactNode;
}

interface TooltipProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  'aria-label'?: string;
}

interface StyledTextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'value'
> {
  label?: string;
  value?: string | number;
  fullWidth?: boolean;
  variant?: string;
  margin?: string;
}

const actionMocks = vi.hoisted(() => ({
  changeCapacity: vi.fn<(value: number) => TestAction>(),
  changeQueueCommand: vi.fn<(value: string) => TestAction>(),
  changeTTI: vi.fn<(value: number) => TestAction>(),
  changeTTK: vi.fn<(value: number) => TestAction>(),
  changeWidgetCode: vi.fn<(value: string) => TestAction>(),
}));

vi.mock('../actions', () => ({
  changeCapacity: actionMocks.changeCapacity,
  changeQueueCommand: actionMocks.changeQueueCommand,
  changeTTI: actionMocks.changeTTI,
  changeTTK: actionMocks.changeTTK,
  changeWidgetCode: actionMocks.changeWidgetCode,
}));

vi.mock('../selectors', () => ({
  makeSelectCapacity: () => () => 10,
  makeSelectQueueCommand: () => () => 'default command',
  makeSelectTTI: () => () => 20,
  makeSelectTTK: () => () => 30,
  makeSelectWidgetCode: () => () => 'widget-code',
}));

vi.mock('../../../components/Panel', () => ({
  default: ({ children }: PanelProps) => (
    <div data-testid="panel">{children}</div>
  ),
}));

vi.mock('../../../components/Panel/PanelTitle', () => ({
  default: ({ children }: PanelProps) => <h2>{children}</h2>,
}));

vi.mock('../../../components/Tooltip/HintParagraph', () => ({
  default: ({ children }: PanelProps) => <p>{children}</p>,
}));

vi.mock('../../../components/StyledTextField', () => ({
  default: ({
    label,
    fullWidth: _fullWidth,
    variant: _variant,
    margin: _margin,
    autoFocus: _autoFocus,
    ...inputProps
  }: StyledTextFieldProps) => <input {...inputProps} aria-label={label} />,
}));

vi.mock('../../../components/AdFrame', () => ({
  default: () => <div data-testid="ad-frame" />,
}));

vi.mock('../QueueWidgetDialog', () => ({
  default: () => <div data-testid="queue-widget-dialog" />,
}));

vi.mock('@mui/material/Tooltip', () => ({
  default: ({ children }: TooltipProps) => <div>{children}</div>,
}));

type Store = ReturnType<typeof configureStore>;

let store: Store;

beforeAll(() => {
  store = configureStore({});
});

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

const renderComponent = (): RenderResult =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedQueueRules />
      </IntlProvider>
    </Provider>
  );

const getInput = (container: HTMLElement, name: string): HTMLInputElement => {
  const input = container.querySelector<HTMLInputElement>(
    `input[name="${name}"]`
  );

  if (!input) {
    throw new Error(`Input with name "${name}" was not found`);
  }

  return input;
};

describe('QueueRules', () => {
  it('renders all form fields and child components', () => {
    const { container, getByTestId } = renderComponent();

    expect(getByTestId('panel')).toBeInTheDocument();
    expect(getByTestId('queue-widget-dialog')).toBeInTheDocument();
    expect(getByTestId('ad-frame')).toBeInTheDocument();

    expect(getInput(container, 'command')).toBeInTheDocument();
    expect(getInput(container, 'capacity')).toBeInTheDocument();
    expect(getInput(container, 'timeToIdle')).toBeInTheDocument();
    expect(getInput(container, 'timeToKick')).toBeInTheDocument();
    expect(getInput(container, 'widgetCode')).toBeInTheDocument();
  });

  it('changes the queue command and stores it in localStorage', () => {
    const { container } = renderComponent();
    const input = getInput(container, 'command');

    actionMocks.changeQueueCommand.mockReturnValue({
      type: 'CHANGE_QUEUE_COMMAND',
      payload: 'new command',
    });

    fireEvent.change(input, {
      target: {
        name: 'command',
        value: 'new command',
      },
    });

    expect(actionMocks.changeQueueCommand).toHaveBeenCalledWith('new command');
    expect(localStorage.getItem('queue-command')).toBe('new command');
  });

  it('does not dispatch the queue command when its length is 140 characters', () => {
    const { container } = renderComponent();
    const input = getInput(container, 'command');
    const longCommand = 'a'.repeat(140);

    fireEvent.change(input, {
      target: {
        name: 'command',
        value: longCommand,
      },
    });

    expect(actionMocks.changeQueueCommand).not.toHaveBeenCalled();
    expect(localStorage.getItem('queue-command')).toBe(longCommand);
  });

  it('changes the queue capacity and stores the value', () => {
    const { container } = renderComponent();
    const input = getInput(container, 'capacity');

    actionMocks.changeCapacity.mockReturnValue({
      type: 'CHANGE_CAPACITY',
      payload: 25,
    });

    fireEvent.change(input, {
      target: {
        name: 'capacity',
        value: '25',
      },
    });

    expect(actionMocks.changeCapacity).toHaveBeenCalledWith(25);
    expect(localStorage.getItem('queue-capacity')).toBe('25');
  });

  it('changes the time to idle and stores the value', () => {
    const { container } = renderComponent();
    const input = getInput(container, 'timeToIdle');

    actionMocks.changeTTI.mockReturnValue({
      type: 'CHANGE_TTI',
      payload: 60,
    });

    fireEvent.change(input, {
      target: {
        name: 'timeToIdle',
        value: '60',
      },
    });

    expect(actionMocks.changeTTI).toHaveBeenCalledWith(60);
    expect(localStorage.getItem('queue-timeToIdle')).toBe('60');
  });

  it('changes the time to kick and stores the value', () => {
    const { container } = renderComponent();
    const input = getInput(container, 'timeToKick');

    actionMocks.changeTTK.mockReturnValue({
      type: 'CHANGE_TTK',
      payload: 90,
    });

    fireEvent.change(input, {
      target: {
        name: 'timeToKick',
        value: '90',
      },
    });

    expect(actionMocks.changeTTK).toHaveBeenCalledWith(90);
    expect(localStorage.getItem('queue-timeToKick')).toBe('90');
  });

  it('changes the widget code without storing it in localStorage', () => {
    const { container } = renderComponent();
    const input = getInput(container, 'widgetCode');

    actionMocks.changeWidgetCode.mockReturnValue({
      type: 'CHANGE_WIDGET_CODE',
      payload: 'new-widget-code',
    });

    fireEvent.change(input, {
      target: {
        name: 'widgetCode',
        value: 'new-widget-code',
      },
    });

    expect(actionMocks.changeWidgetCode).toHaveBeenCalledWith(
      'new-widget-code'
    );
    expect(localStorage.getItem('queue-widgetCode')).toBeNull();
  });
});

describe('mapDispatchToProps', () => {
  it('maps action creators to component props', () => {
    const dispatch = vi.fn();
    const props = mapDispatchToProps(dispatch);

    actionMocks.changeCapacity.mockReturnValue({
      type: 'CHANGE_CAPACITY',
      payload: 10,
    });

    actionMocks.changeQueueCommand.mockReturnValue({
      type: 'CHANGE_QUEUE_COMMAND',
      payload: 'command',
    });

    actionMocks.changeTTI.mockReturnValue({
      type: 'CHANGE_TTI',
      payload: 20,
    });

    actionMocks.changeTTK.mockReturnValue({
      type: 'CHANGE_TTK',
      payload: 30,
    });

    actionMocks.changeWidgetCode.mockReturnValue({
      type: 'CHANGE_WIDGET_CODE',
      payload: 'code',
    });

    props.changeCapacity(10);
    props.changeQueueCommand('command');
    props.changeTTI(20);
    props.changeTTK(30);
    props.changeWidgetCode('code');

    expect(actionMocks.changeCapacity).toHaveBeenCalledWith(10);
    expect(actionMocks.changeQueueCommand).toHaveBeenCalledWith('command');
    expect(actionMocks.changeTTI).toHaveBeenCalledWith(20);
    expect(actionMocks.changeTTK).toHaveBeenCalledWith(30);
    expect(actionMocks.changeWidgetCode).toHaveBeenCalledWith('code');

    expect(dispatch).toHaveBeenCalledWith({
      type: 'CHANGE_CAPACITY',
      payload: 10,
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'CHANGE_QUEUE_COMMAND',
      payload: 'command',
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'CHANGE_TTI',
      payload: 20,
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'CHANGE_TTK',
      payload: 30,
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'CHANGE_WIDGET_CODE',
      payload: 'code',
    });
  });

  it('exposes dispatch as a prop', () => {
    const dispatch = vi.fn();
    const props = mapDispatchToProps(dispatch);

    expect(props.dispatch).toBe(dispatch);
  });
});
