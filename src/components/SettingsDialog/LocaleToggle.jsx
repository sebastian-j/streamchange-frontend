import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { changeLocale } from '../../containers/LanguageProvider/actions';
import { makeSelectLocale } from '../../containers/LanguageProvider/selectors';
import LocaleToggle from './LocaleToggleComponent';

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (evt) => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
