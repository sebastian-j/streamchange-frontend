import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import useMediaQuery from '@mui/material/useMediaQuery';

import messages from './messages';
import confettiIcon from './assets/confetti.png';
import CSGORaffle from '../CSGORaffle';
import FortuneWheelRaffle from '../FortuneWheelRaffle';
import VerticalRaffle from '../VerticalRaffle';
import SlotMachine from '../SlotMachine';
import NumericInput from '../NumericInput';
import RaffleInfoDialog from '../RaffleInfoDialog';
import StyledFormControl from '../StyledTextField/StyledFormControl';

const StartButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackground};
  border: 1px solid ${(props) => props.theme.color};
  color: ${(props) => props.theme.buttonTextColor};
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 10px;
  padding: 10px 0;
  position: relative;
  transition: text-shadow 0.2s linear 0.3s;
  width: 100%;
  z-index: 0;
  .btn-hover {
    background-color: ${(props) => props.theme.color};
    clip-path: ellipse(50% 180% at 50% 310%);
    left: 0;
    height: 100%;
    position: absolute;
    top: 0;
    transition: clip-path 1s cubic-bezier(0.215, 0.61, 0.355, 1);
    width: 100%;
    z-index: -1;
  }
  &:hover {
    text-shadow: 0 0 5px ${(props) => props.theme.startButtonShadowColor};
    transition: text-shadow 0s;
    .btn-hover {
      clip-path: ellipse(120% 180% at 50% 60%);
    }
  }
`;

const AnimationDurationSlot = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  @media (orientation: portrait) {
    margin-top: 20px;
  }
`;

const ToggleGroup = styled.div`
  border: 1px solid ${(props) => props.theme.secondaryTextColor};
  border-radius: 4px;
  display: flex;
  flex-shrink: 0;
  height: 30px;
  margin-left: auto;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  align-items: center;
  background: ${({ $on, theme }) =>
    $on
      ? `color-mix(in srgb, ${theme.color} 18%, transparent)`
      : 'transparent'};
  border: none;
  color: ${({ $on, theme }) => ($on ? theme.color : theme.secondaryTextColor)};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 100%;
  justify-content: center;
  transition:
    color 0.35s ease,
    background-color 0.35s ease;
  width: 30px;
  @media (orientation: portrait) {
    width: 26px;
  }
  & + & {
    border-left: 1px solid ${(props) => props.theme.secondaryTextColor};
  }
  svg {
    fill: currentColor;
    height: 18px;
    width: 18px;
  }
  &:hover {
    background: color-mix(
      in srgb,
      ${(props) => props.theme.color} 12%,
      transparent
    );
  }
`;

// confetti.png is a black glyph on transparent bg - masked so it can pick
// up currentColor and match the on/off state like the volume icon does
const ConfettiIcon = styled.span`
  background-color: currentColor;
  display: block;
  height: 18px;
  mask: url(${confettiIcon}) center / contain no-repeat;
  -webkit-mask: url(${confettiIcon}) center / contain no-repeat;
  position: relative;
  width: 18px;
  &::after {
    content: '';
    display: ${(props) => (props.$on ? 'none' : 'block')};
    background: currentColor;
    height: 2px;
    left: -3px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
    width: 24px;
  }
`;

const readToggle = (key) => localStorage.getItem(key) !== 'off';

const RaffleWrapper = (props) => {
  const intl = useIntl();
  const isMobile = useMediaQuery('(orientation: portrait)');
  const [noUsers, setNoUsers] = useState(false);
  const [soundOn, setSoundOn] = useState(() => readToggle('gv-raffleSound'));
  const [effectsOn, setEffectsOn] = useState(() =>
    readToggle('gv-raffleEffects')
  );
  console.log(props.platform + 'blabalba');

  const toggle = (key, value, setValue) => {
    const newValue = !value;
    localStorage.setItem(key, newValue ? 'on' : 'off');
    setValue(newValue);
  };

  // Mobile only supports the vertical raffle, so the picker is hidden there
  // and this overrides the stored (desktop) preference without touching it.
  const effectiveAnimationType = isMobile ? 2 : props.animationType;

  const openDialog = () => {
    let eligibleUsers = props.userArray.filter(
      (user) => user.isEligible === true
    );
    if (props.giveawayReq === 1) {
      eligibleUsers = eligibleUsers.filter(
        (user) => user.isSubscriber !== false
      );
    }
    if (eligibleUsers.length > 0) {
      props.openRaffle();
    } else {
      setNoUsers(true);
      setTimeout(() => setNoUsers(false), 3000);
    }
  };

  // Stable reference so VerticalRaffle's memo comparator (which skips
  // re-renders from unrelated userArray updates) isn't defeated by a new
  // onWin function on every RaffleWrapper render.
  const { closeRaffle, onWin } = props;
  const winnerHandler = useCallback(
    (event) => {
      closeRaffle();
      onWin(event);
    },
    [closeRaffle, onWin]
  );

  return (
    <div>
      {!isMobile && (
        <>
          <StyledFormControl margin="normal">
            <InputLabel id="animation-select">
              <FormattedMessage {...messages.raffleType} />
            </InputLabel>
            <Select
              onChange={(event) =>
                props.changeAnimationType(event.target.value)
              }
              value={props.animationType}
              variant="standard"
            >
              {props.platform === 'youtube' && (
                <MenuItem value={0}>
                  <FormattedMessage {...messages.raffleTypeCS} />
                </MenuItem>
              )}
              <MenuItem value={3}>
                <FormattedMessage {...messages.raffleTypeSlots} />
              </MenuItem>
              {(props.platform === 'kick' ||
                props.platform === 'twitch') && (
                  <MenuItem value={2}>
                    <FormattedMessage {...messages.raffleTypeVertical} />
                  </MenuItem>
                )}
              <MenuItem value={1}>
                <FormattedMessage {...messages.raffleTypeWheel} />
              </MenuItem>
            </Select>
          </StyledFormControl>
          <RaffleInfoDialog />
        </>
      )}
      <AnimationDurationSlot>
        {props.animationType !== 3 && (
          <NumericInput
            label={intl.formatMessage({ ...messages.animationDuration })}
            minValue={1}
            maxValue={600}
            value={props.animationDuration}
            onChange={(ret) => props.changeAnimationDuration(Number(ret))}
          />
        )}
        <ToggleGroup>
          <ToggleButton
            aria-label={intl.formatMessage({ ...messages.toggleSound })}
            aria-pressed={soundOn}
            $on={soundOn}
            onClick={() => toggle('gv-raffleSound', soundOn, setSoundOn)}
            title={intl.formatMessage({ ...messages.toggleSound })}
            type="button"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {soundOn ? (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              ) : (
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
              )}
            </svg>
          </ToggleButton>
          {props.animationType !== 3 && (
            <ToggleButton
              aria-label={intl.formatMessage({ ...messages.toggleEffects })}
              aria-pressed={effectsOn}
              $on={effectsOn}
              onClick={() =>
                toggle('gv-raffleEffects', effectsOn, setEffectsOn)
              }
              title={intl.formatMessage({ ...messages.toggleEffects })}
              type="button"
            >
              <ConfettiIcon $on={effectsOn} />
            </ToggleButton>
          )}
        </ToggleGroup>
      </AnimationDurationSlot>
      <StartButton disabled={noUsers} type="button" onClick={openDialog}>
        {noUsers ? (
          <FormattedMessage {...messages.noUserSelected} />
        ) : (
          <FormattedMessage {...messages.startBtn} />
        )}
        <div className="btn-hover" />
      </StartButton>
      {props.isOpen && effectiveAnimationType === 0 && (
        <CSGORaffle
          duration={props.animationDuration}
          onClose={props.closeRaffle}
          onWin={winnerHandler}
        />
      )}
      {props.isOpen && effectiveAnimationType === 1 && (
        <FortuneWheelRaffle
          duration={props.animationDuration}
          effectsOn={effectsOn}
          onClose={props.closeRaffle}
          onWin={winnerHandler}
          soundOn={soundOn}
        />
      )}
      {props.isOpen && effectiveAnimationType === 2 && (
        <VerticalRaffle
          duration={props.animationDuration}
          effectsOn={effectsOn}
          onClose={props.closeRaffle}
          onWin={winnerHandler}
          soundOn={soundOn}
        />
      )}
      {props.isOpen && props.animationType === 3 && (
        <SlotMachine
          duration={props.animationDuration}
          effectsOn={effectsOn}
          onClose={props.closeRaffle}
          onWin={winnerHandler}
          soundOn={soundOn}
        />
      )}
    </div>
  );
};

RaffleWrapper.propTypes = {
  animationDuration: PropTypes.number.isRequired,
  animationType: PropTypes.number.isRequired,
  changeAnimationDuration: PropTypes.func.isRequired,
  changeAnimationType: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeRaffle: PropTypes.func.isRequired,
  giveawayReq: PropTypes.number,
  openRaffle: PropTypes.func.isRequired,
  onWin: PropTypes.func.isRequired,
  userArray: PropTypes.array,
  platform: PropTypes.string,
};

export default RaffleWrapper;
