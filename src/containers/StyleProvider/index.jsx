import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { makeSelectColor, makeSelectDarkMode } from './selectors';
import StyleProvider from './StyleProviderComponent';

const mapStateToProps = createStructuredSelector({
  color: makeSelectColor(),
  isDarkMode: makeSelectDarkMode(),
});

export default connect(mapStateToProps)(StyleProvider);
