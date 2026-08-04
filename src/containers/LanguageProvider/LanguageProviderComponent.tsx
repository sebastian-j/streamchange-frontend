/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import { IntlProvider } from 'react-intl';

type LanguageProviderProps = {
  locale: string;
  messages: Record<string, Record<string, string>>;
  children: React.ReactNode;
};

export function LanguageProvider(props: LanguageProviderProps) {
  return (
    <IntlProvider locale={props.locale} messages={props.messages[props.locale]}>
      {props.children}
    </IntlProvider>
  );
}

export default LanguageProvider;
