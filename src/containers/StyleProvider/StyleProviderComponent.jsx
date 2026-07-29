import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { darkTheme, lightTheme } from '../../theme';

export function StyleProvider(props) {
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

StyleProvider.propTypes = {
  color: PropTypes.string,
  children: PropTypes.element.isRequired,
  isDarkMode: PropTypes.bool,
};

export default StyleProvider;
