/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

export function LanguageProvider(props) {
  return (
    <IntlProvider locale={props.locale} messages={props.messages[props.locale]}>
      {props.children}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default LanguageProvider;
