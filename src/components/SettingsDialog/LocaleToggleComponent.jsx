import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import messages from './messages';
import { appLocales } from '../../i18n';

function LocaleToggle(props) {
  const toggle = (event) => {
    localStorage.setItem('locale', event.target.value);
    props.onLocaleToggle(event);
  };

  return (
    <div>
      <Typography display="inline" style={{ marginRight: '10px' }}>
        <FormattedMessage {...messages.localeTitle} />
      </Typography>
      <Select onChange={toggle} value={props.locale} variant="standard">
        {appLocales.map((item) => (
          <MenuItem value={item} key={item}>
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

export default LocaleToggle;
