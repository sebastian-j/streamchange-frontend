export const lightTheme = {
  welcomeBackground: '#00000080',
  bodyBackground: '#E2E2E2',
  panelBackground: '#FFF',
  buttonBackground: '#FFF',
  buttonBackgroundHover: '#0059a3',
  buttonTextColor: '#0059a3',
  buttonTextColorHover: '#FFF',
  materialButtonColor: '#3c62b5',
  staticTextColor: '#000',
  secondaryTextColor: 'grey',
  subStatusPositive: '#0c8100',
  subStatusNegative: '#9e0000',
  iconButtonBackground: 'rgb(228, 230, 235)',
  inactiveUser: '#9c9c9c',
  inputLabel: 'rgba(0, 0, 0, 0.54)',
  inputLabelFocused: '#303f9f',
};

export const darkTheme: Theme = {
  welcomeBackground: '#000000CB',
  bodyBackground: '#282828',
  panelBackground: '#1f1f1f',
  buttonBackground: '#232323',
  buttonBackgroundHover: '#3e3e3e',
  buttonTextColor: '#FAFAFA',
  buttonTextColorHover: '#bdf3ff',
  materialButtonColor: '#0086e6',
  staticTextColor: '#FFF',
  secondaryTextColor: 'grey',
  subStatusPositive: '#46d257',
  subStatusNegative: '#df4846',
  iconButtonBackground: 'rgba(255,255,255,0.1)',
  inactiveUser: '#9c9c9c',
  inputLabel: '#acacac',
  inputLabelFocused: '#0086e6',
};

export type Theme = typeof lightTheme;
