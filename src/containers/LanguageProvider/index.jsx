import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeSelectLocale } from './selectors';
import LanguageProvider from './LanguageProviderComponent';

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
