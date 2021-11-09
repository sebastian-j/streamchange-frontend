import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import SupportInformation, { mapDispatchToProps } from '../index';
import { changeDialogVisibility } from '../actions';
import configureStore from '../../../configureStore';

describe('<SupportInformation />', () => {
  let store;
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <SupportInformation />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    describe('closeDialog', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.closeDialog).toBeDefined();
      });

      it('should dispatch changeDialogVisibility when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.closeDialog();
        expect(dispatch).toHaveBeenCalledWith(changeDialogVisibility(false));
      });
    });

    describe('openDialog', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.openDialog).toBeDefined();
      });

      it('should dispatch changeDialogVisibility when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.openDialog();
        expect(dispatch).toHaveBeenCalledWith(changeDialogVisibility(true));
      });
    });
  });
});
