import { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { darkTheme, lightTheme } from '../../theme';

type StyleProviderProps = {
  color?: string;
  children: React.ReactNode;
  isDarkMode: boolean;
};

export function StyleProvider(props: StyleProviderProps) {
  const themeType = props.isDarkMode ? darkTheme : lightTheme;
  const theme = { ...themeType, color: props.color };

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: props.isDarkMode ? 'dark' : 'light',
        },
      }),
    [props.isDarkMode]
  );

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </MuiThemeProvider>
  );
}

export default StyleProvider;
