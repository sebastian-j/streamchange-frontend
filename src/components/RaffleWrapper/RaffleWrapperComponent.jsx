import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import useMediaQuery from '@mui/material/useMediaQuery';

import messages from './messages';
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
  @media (orientation: portrait) {
    margin-top: 20px;
  }
`;

const RaffleWrapper = (props) => {
  const intl = useIntl();
  const isMobile = useMediaQuery('(orientation: portrait)');
  const [noUsers, setNoUsers] = useState(false);

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
              {/* CS:GO case opening temporarily unavailable
              <MenuItem value={0}>
                <FormattedMessage {...messages.raffleTypeCS} />
              </MenuItem>
              */}
              <MenuItem value={3}>
                <FormattedMessage {...messages.raffleTypeSlots} />
              </MenuItem>
              <MenuItem value={2}>
                <FormattedMessage {...messages.raffleTypeVertical} />
              </MenuItem>
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
          onClose={props.closeRaffle}
          onWin={winnerHandler}
        />
      )}
      {props.isOpen && effectiveAnimationType === 2 && (
        <VerticalRaffle
          duration={props.animationDuration}
          onClose={props.closeRaffle}
          onWin={winnerHandler}
        />
      )}
      {props.isOpen && props.animationType === 3 && (
        <SlotMachine
          duration={props.animationDuration}
          onClose={props.closeRaffle}
          onWin={winnerHandler}
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
};

export default RaffleWrapper;
