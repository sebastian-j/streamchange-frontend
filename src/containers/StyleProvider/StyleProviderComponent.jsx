import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../theme';

export function StyleProvider(props) {
  const themeType = props.isDarkMode ? darkTheme : lightTheme;
  const theme = { ...themeType, color: props.color };

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

StyleProvider.propTypes = {
  color: PropTypes.string,
  children: PropTypes.element.isRequired,
  isDarkMode: PropTypes.bool,
};

export default StyleProvider;
