import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import messages from './messages';
import {
  makeSelectAnimation,
  makeSelectDuration,
  makeSelectVisibility,
} from './selectors';
import {
  changeAnimation,
  changeAnimationDuration,
  changeVisibility,
} from './actions';
import { makeSelectUserArray } from '../UserList/selectors';
import { makeSelectGiveawayRequirement } from '../GiveawayRules/selectors';
import CSGORaffle from '../CSGORaffle';
import FortuneWheelRaffle from '../FortuneWheelRaffle';
import NumericInput from '../NumericInput';
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
  transition: text-shadow .2s linear .3s;
  width: 100%;
  z-index: 0;
  .btn-hover {
    background-color: ${(props) => props.theme.color};
    clip-path: ellipse(50% 180% at 50% 310%);
    left: 0;
    height: 100%;
    position: absolute;
    top: 0;
    transition: clip-path 1s cubic-bezier(.215,.61,.355,1);
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

export const RaffleWrapper = (props) => {
  const [noUsers, setNoUsers] = useState(false);

  const openDialog = () => {
    let eligibleUsers = props.userArray.filter(
      (user) => user.isEligible === true,
    );
    if (props.giveawayReq === 1) {
      eligibleUsers = eligibleUsers.filter((user) => user.isSponsor !== false);
    }
    if (eligibleUsers.length > 0) {
      props.openRaffle();
    } else {
      setNoUsers(true);
      setTimeout(() => setNoUsers(false), 3000);
    }
  };

  const winnerHandler = (event) => {
    props.closeRaffle();
    props.onWin(event);
  };

  return (
    <div>
      <StyledFormControl margin="normal">
        <InputLabel id="animation-select">
          <FormattedMessage {...messages.raffleType} />
        </InputLabel>
        <Select
          onChange={(event) => props.changeAnimationType(event.target.value)}
          value={props.animationType}
          variant="standard"
        >
          <MenuItem value={0}>
            <FormattedMessage {...messages.raffleTypeCS} />
          </MenuItem>
          <MenuItem value={1}>
            <FormattedMessage {...messages.raffleTypeWheel} />
          </MenuItem>
        </Select>
      </StyledFormControl>
      <FormattedMessage {...messages.animationDuration}>
        {(label) => (
          <NumericInput
            label={label}
            minValue={1}
            maxValue={600}
            value={props.animationDuration}
            onChange={(ret) => props.changeAnimationDuration(Number(ret))}
          />
        )}
      </FormattedMessage>
      <StartButton disabled={noUsers} type="button" onClick={openDialog}>
        {noUsers ? (
          <FormattedMessage {...messages.noUserSelected} />
        ) : (
          <FormattedMessage {...messages.startBtn} />
        )}
        <div className="btn-hover" />
      </StartButton>
      {props.isOpen && props.animationType === 0 && (
        <CSGORaffle
          duration={props.animationDuration}
          onClose={props.closeRaffle}
          onWin={winnerHandler}
        />
      )}
      {props.isOpen && props.animationType === 1 && (
        <FortuneWheelRaffle
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

const mapStateToProps = createStructuredSelector({
  animationDuration: makeSelectDuration(),
  animationType: makeSelectAnimation(),
  giveawayReq: makeSelectGiveawayRequirement(),
  isOpen: makeSelectVisibility(),
  userArray: makeSelectUserArray(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changeAnimationDuration: (t) => dispatch(changeAnimationDuration(t)),
    changeAnimationType: (a) => dispatch(changeAnimation(a)),
    closeRaffle: () => dispatch(changeVisibility(false)),
    openRaffle: () => dispatch(changeVisibility(true)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RaffleWrapper);
