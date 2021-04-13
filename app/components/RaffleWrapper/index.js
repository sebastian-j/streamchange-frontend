import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

const StartButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackground};
  border: 1px solid ${(props) => props.theme.color};
  color: ${(props) => props.theme.buttonTextColor};
  cursor: pointer;
  margin-top: 10px;
  padding: 8px 12px;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.buttonBackgroundHover};
    color: ${(props) => props.theme.buttonTextColorHover};
  }
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  input {
    color: ${(props) => props.theme.staticTextColor};
  }
  span,
  svg {
    color: ${(props) => props.theme.staticTextColor};
  }
  label span {
    color: ${(props) => props.theme.inputLabel};
  }
  label.Mui-focused span {
    color: ${(props) => props.theme.color};
  }
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid ${(props) => props.theme.color};
  }
  .MuiInput-underline:after {
    border-bottom: 2px solid ${(props) => props.theme.color};
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
