import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { makeSelectLocale } from '../../../containers/LanguageProvider/selectors';
import { changeLocale } from '../../../containers/LanguageProvider/actions';
import FirstUseScreen from './FirstUseScreenComponent';

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (value) => dispatch(changeLocale(value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstUseScreen);
