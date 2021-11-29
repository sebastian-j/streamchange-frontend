import { selectStyle, makeSelectColor, makeSelectDarkMode } from '../selectors';
import { initialState } from '../reducer';

describe('selectStyle', () => {
  it('should select the StyleProvider state', () => {
    const styleState = {
      color: '#fffbdd',
      isDarkMode: true,
    };
    const mockedState: any = {
      theme: styleState,
    };
    expect(selectStyle(mockedState)).toEqual(styleState);
  });

  it('should select the StyleProvider initial state', () => {
    const mockedState: any = {};
    expect(selectStyle(mockedState)).toEqual(initialState);
  });
});

describe('makeSelectColor', () => {
  const colorSelector = makeSelectColor();
  it('should select the username', () => {
    const color = '#fffbdd';
    const mockedState: any = {
      theme: {
        color,
      },
    };
    expect(colorSelector(mockedState)).toEqual(color);
  });
});

describe('makeSelectDarkMode', () => {
  const modeSelector = makeSelectDarkMode();
  it('should select the username', () => {
    const isDarkMode = false;
    const mockedState: any = {
      theme: {
        isDarkMode,
      },
    };
    expect(modeSelector(mockedState)).toEqual(isDarkMode);
  });
});
