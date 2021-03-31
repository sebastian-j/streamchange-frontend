import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import messages from './messages';
import { appLocales } from '../../i18n';
import { changeLocale } from '../../containers/LanguageProvider/actions';
import { makeSelectLocale } from '../../containers/LanguageProvider/selectors';

export function LocaleToggle(props) {
  const toggle = (event) => {
    localStorage.setItem('locale', event.target.value);
    props.onLocaleToggle(event);
  };

  return (
    <div>
      <Typography display="inline" style={{ marginRight: '10px' }}>
        <FormattedMessage {...messages.localeTitle} />
      </Typography>
      <Select onChange={toggle} value={props.locale}>
        {appLocales.map((item) => (
          <MenuItem value={item}>
            <FormattedMessage {...messages[item]} />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (evt) => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
