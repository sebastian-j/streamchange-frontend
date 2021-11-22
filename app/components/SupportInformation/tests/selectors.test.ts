import { selectSupportInfo, makeSelectDialogVisibility } from '../selectors';
import { initialState } from '../reducer';

describe('SupportInformation selectors', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState: any = {
      supportInfo: globalState,
    };
    expect(selectSupportInfo(mockedState)).toEqual(globalState);
  });

  it('should select the SupportInformation initial state', () => {
    const mockedState: any = {};
    expect(selectSupportInfo(mockedState)).toEqual(initialState);
  });

  it('should select the dialog visibility', () => {
    const visibilitySelector = makeSelectDialogVisibility();
    const isOpen = true;
    const mockedState: any = {
      supportInfo: {
        isOpen,
      },
    };
    expect(visibilitySelector(mockedState)).toEqual(isOpen);
  });
});
