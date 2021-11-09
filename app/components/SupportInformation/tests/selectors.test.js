import { selectSupportInfo, makeSelectDialogVisibility } from '../selectors';
import { initialState } from '../reducer';

describe('SupportInformation selectors', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      supportInfo: globalState,
    };
    expect(selectSupportInfo(mockedState)).toEqual(globalState);
  });

  it('should select the SupportInformation initial state', () => {
    const mockedState = {};
    expect(selectSupportInfo(mockedState)).toEqual(initialState);
  });

  it('should select the dialog visibility', () => {
    const visibilitySelector = makeSelectDialogVisibility();
    const isOpen = true;
    const mockedState = {
      supportInfo: {
        isOpen,
      },
    };
    expect(visibilitySelector(mockedState)).toEqual(isOpen);
  });
});
