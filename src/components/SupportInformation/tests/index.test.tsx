import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import configureStore from '../../../configureStore';
import { changeDialogVisibility } from '../actions';
import SupportInformation, { mapDispatchToProps } from '../index';

describe('<SupportInformation />', () => {
  let store: ReturnType<typeof configureStore>;

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <SupportInformation />
      </Provider>
    );
    expect(firstChild).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    describe('closeDialog', () => {
      it('should be injected', () => {
        const dispatch = vi.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.closeDialog).toBeDefined();
      });

      it('should dispatch changeDialogVisibility when called', () => {
        const dispatch = vi.fn();
        const result = mapDispatchToProps(dispatch);
        result.closeDialog();
        expect(dispatch).toHaveBeenCalledWith(changeDialogVisibility(false));
      });
    });

    describe('openDialog', () => {
      it('should be injected', () => {
        const dispatch = vi.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.openDialog).toBeDefined();
      });

      it('should dispatch changeDialogVisibility when called', () => {
        const dispatch = vi.fn();
        const result = mapDispatchToProps(dispatch);
        result.openDialog();
        expect(dispatch).toHaveBeenCalledWith(changeDialogVisibility(true));
      });
    });
  });
});
