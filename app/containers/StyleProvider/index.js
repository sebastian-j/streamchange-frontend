import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { makeSelectColor, makeSelectDarkMode } from './selectors';
import { darkTheme, lightTheme } from '../../theme';

export function StyleProvider(props) {
  const themeType = props.isDarkMode ? darkTheme : lightTheme;
  const theme = { ...themeType, color: props.color };
  return (
    <ThemeProvider theme={theme}>
      {React.Children.only(props.children)}
    </ThemeProvider>
  );
}

StyleProvider.propTypes = {
  color: PropTypes.string,
  children: PropTypes.element.isRequired,
  isDarkMode: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  color: makeSelectColor(),
  isDarkMode: makeSelectDarkMode(),
});

export default connect(mapStateToProps)(StyleProvider);
