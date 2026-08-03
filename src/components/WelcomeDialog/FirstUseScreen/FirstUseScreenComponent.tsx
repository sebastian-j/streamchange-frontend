import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

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

type FirstUseScreenProps = {
  onLocaleToggle: (locale: string) => void;
  locale: string;
};

const FirstUseScreen = (props: FirstUseScreenProps) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  const [language, setLanguage] = useState(props.locale);

  const changeLanguage = (event: React.MouseEvent<HTMLInputElement>) => {
    setLanguage(event.currentTarget.value);
    props.onLocaleToggle(event.currentTarget.value);
  };

  const changeTheme = (event: React.MouseEvent<HTMLInputElement>) => {
    setDarkMode(event.currentTarget.value === '1');
    localStorage.setItem('darkMode', (event.currentTarget.value === '1').toString());
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
          <span>
            <FormattedMessage {...messages.firstUseSaveBtn} />
          </span>
        </StyledButton>
      </div>
      <CookieConsent />
    </Backdrop>
  );
};

export default FirstUseScreen;
