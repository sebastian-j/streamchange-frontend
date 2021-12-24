import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { makeSelectLocale } from '../../../containers/LanguageProvider/selectors';
import { changeLocale } from '../../../containers/LanguageProvider/actions';
import FlagPL from '../assets/flag-pl.png';
import FlagUK from '../assets/flag-uk.png';
import LightModeImg from '../assets/light-mode.png';
import DarkModeImg from '../assets/dark-mode.png';
import { Backdrop } from './components/Backdrop';
import { Box } from './components/Box';
import CookieConsent from '../CookieConsent';
import { LangBox } from './components/LangBox';
import { LangTile } from './components/LangTile';
import { RadioInput } from './components/RadioInput';
import { StyledButton } from './components/StyledButton';
import { Tile } from './components/Tile';
import { Title } from './components/Title';
import messages from './messages';

const FirstUseScreen = (props) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true',
  );
  const [language, setLanguage] = useState(props.locale);

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
    props.onLocaleToggle(event.target.value);
  };

  const changeTheme = (event) => {
    setDarkMode(event.target.value === '1');
    localStorage.setItem('darkMode', (event.target.value === '1').toString());
  };

  const save = () => {
    localStorage.setItem('locale', language);
    window.location.reload();
  };

  return (
    <Backdrop>
      <Title>
        <FormattedMessage {...messages.firstUseTitle} />
      </Title>
      <div>
        <Title>
          <FormattedMessage {...messages.firstUseSelectTheme} />
        </Title>
        <label htmlFor="themeLight">
          <RadioInput
            id="themeLight"
            type="radio"
            name="theme"
            value="0"
            onChange={() => {}}
            onClick={changeTheme}
            checked={!darkMode}
          />
          <Box className="box left">
            <img src={LightModeImg} alt="light" />
            <Tile>
              <FormattedMessage {...messages.lightTheme} />
            </Tile>
          </Box>
        </label>
        <label htmlFor="themeDark">
          <RadioInput
            id="themeDark"
            type="radio"
            name="theme"
            value="1"
            onChange={() => {}}
            onClick={changeTheme}
            checked={darkMode}
          />
          <Box className="box right">
            <img src={DarkModeImg} alt="dark" />
            <Tile>
              <FormattedMessage {...messages.darkTheme} />
            </Tile>
          </Box>
        </label>
      </div>
      <div>
        <Title>
          <FormattedMessage {...messages.firstUseSelectLang} />
        </Title>
        <label htmlFor="pl">
          <RadioInput
            id="pl"
            type="radio"
            name="language"
            value="pl"
            onChange={() => {}}
            onClick={changeLanguage}
            checked={language === 'pl'}
          />
          <LangBox className="box left">
            <LangTile>
              <img src={FlagPL} alt="pl" />
              <FormattedMessage {...messages.pl} />
            </LangTile>
          </LangBox>
        </label>
        <label htmlFor="en">
          <RadioInput
            id="en"
            type="radio"
            name="language"
            value="en"
            onChange={() => {}}
            onClick={changeLanguage}
            checked={language === 'en'}
          />
          <LangBox className="box right">
            <LangTile>
              <img src={FlagUK} alt="en" />
              <FormattedMessage {...messages.en} />
            </LangTile>
          </LangBox>
        </label>
      </div>
      <div>
        <StyledButton onClick={save} type="button">
          <FormattedMessage {...messages.firstUseSaveBtn} />
        </StyledButton>
      </div>
      <CookieConsent />
    </Backdrop>
  );
};

FirstUseScreen.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (value) => dispatch(changeLocale(value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstUseScreen);
