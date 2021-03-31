import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { makeSelectLocale } from '../../containers/LanguageProvider/selectors';
import { changeLocale } from '../../containers/LanguageProvider/actions';
import FlagPL from './flag-pl.png';
import FlagUK from './flag-uk.png';
import LightModeImg from './light-mode.png';
import DarkModeImg from './dark-mode.png';
import messages from './messages';

const Backdrop = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.bodyBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
`;
const Title = styled.span`
  color: ${(props) => props.theme.staticTextColor};
  display: block;
  font-size: 2rem;
  margin-bottom: 1vh;
  margin-top: 5vh;
  text-align: center;
`;
const RadioInput = styled.input`
  display: none;
  &:checked + .box {
    background-color: #0068ad;
  }
`;

const Box = styled.div`
  width: 11vw;
  height: 11vw;
  background-color: #ffffffd9;
  transition: all 300ms ease;
  will-change: transition;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  position: relative;
  font-family: sans-serif;
  ${({ left }) =>
    left &&
    `
    border-radius: 5px 0 0 5px;
  `}
  ${({ right }) =>
    right &&
    `
    border-radius: 0 5px 5px 0;
  `}
`;

const LangBox = styled.div`
  width: 11vw;
  height: 4vw;
  background-color: #ffffffd9;
  transition: all 250ms ease;
  will-change: transition;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  position: relative;
  font-family: sans-serif;
  ${({ left }) =>
    left &&
    `
    border-radius: 4px 0 0 4px;
  `}
  ${({ right }) =>
    right &&
    `
    border-radius: 0 4px 4px 0;
  `}
`;

const Tile = styled.span`
  position: absolute;
  transform: translate(0, -50%);
  left: 5px;
  right: 5px;
  top: 85%;
  transition: all 300ms ease;
  font-size: 1.2vw;
  user-select: none;
`;

const LangTile = styled.span`
  position: absolute;
  transform: translate(0, -50%);
  left: 5px;
  right: 5px;
  top: 50%;
  transition: all 300ms ease;
  font-size: 1.2vw;
  user-select: none;
`;

const Flag = styled.img`
  margin-right: 10%;
  width: 20%;
`;

const ThemeImg = styled.img`
  margin-top: 10%;
  width: 96%;
`;
const StyledButton = styled(Button)`
  span {
    color: ${(props) => props.theme.materialButtonColor};
    font-size: 1.25rem;
  }
`;

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
    localStorage.setItem('darkMode', event.target.value === '1');
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
      <div className="tiles-grid">
        <Title>
          <FormattedMessage {...messages.firstUseSelectTheme} />
        </Title>
        <label htmlFor="themeLight">
          <RadioInput
            id="themeLight"
            type="radio"
            name="theme"
            value="0"
            onClick={changeTheme}
            checked={!darkMode}
          />
          <Box className="box" left>
            <ThemeImg src={LightModeImg} alt="light" />
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
            onClick={changeTheme}
            checked={darkMode}
          />
          <Box className="box" right>
            <ThemeImg src={DarkModeImg} alt="dark" />
            <Tile>
              <FormattedMessage {...messages.darkTheme} />
            </Tile>
          </Box>
        </label>
      </div>
      <div className="tiles-grid">
        <Title>
          <FormattedMessage {...messages.firstUseSelectLang} />
        </Title>
        <label htmlFor="pl">
          <RadioInput
            id="pl"
            type="radio"
            name="language"
            value="pl"
            onClick={changeLanguage}
            checked={language === 'pl'}
          />
          <LangBox className="box" left>
            <LangTile>
              <Flag src={FlagPL} alt="pl" />
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
            onClick={changeLanguage}
            checked={language === 'en'}
          />
          <LangBox className="box" right>
            <LangTile>
              <Flag src={FlagUK} alt="en" />
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
