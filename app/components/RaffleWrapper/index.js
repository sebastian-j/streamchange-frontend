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
import { makeSelectAnimation, makeSelectVisibility } from './selectors';
import { changeAnimation, changeVisibility } from './actions';
import CSGORaffle from '../CSGORaffle';
import FortuneWheelRaffle from '../FortuneWheelRaffle';
import NumericInput from '../NumericInput';
import db from '../YoutubeWorker/db';

const StartButton = styled.button`
  background-color: ${props => props.theme.buttonBackground};
  border: 1px solid ${props => props.theme.color};
  color: ${props => props.theme.buttonTextColor};
  cursor: pointer;
  margin-top: 10px;
  padding: 8px 12px;
  width: 100%;
  &:hover {
    background-color: ${props => props.theme.buttonBackgroundHover};
    color: ${props => props.theme.buttonTextColorHover};
  }
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  input {
    color: ${props => props.theme.staticTextColor};
  }
  label {
    color: ${props => props.theme.inputLabel};
  }
  label.Mui-focused {
    color: ${props => props.theme.inputLabelFocused};
  }
  span,
  svg {
    color: ${props => props.theme.staticTextColor};
  }
`;
export const RaffleWrapper = props => {
  const [noUsers, setNoUsers] = useState(false);
  const [duration, setDuration] = useState(
    Number(localStorage.getItem('gv-animationDuration')) || 7,
  );

  const openDialog = () => {
    db.table('users')
      .filter(user => user.isEligible === true)
      .toArray()
      .then(items => {
        if (items.length > 0) {
          props.openRaffle();
        } else {
          setNoUsers(true);
          setTimeout(() => setNoUsers(false), 3000);
        }
      });
  };

  const changeDuration = value => {
    setDuration(value);
    localStorage.setItem('gv-animationDuration', String(value));
  };

  const winnerHandler = event => {
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
          onChange={event => props.changeAnimationType(event.target.value)}
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
        {label => (
          <NumericInput
            label={label}
            minValue={1}
            maxValue={600}
            value={duration}
            onChange={ret => changeDuration(ret)}
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
          duration={duration}
          onClose={props.closeRaffle}
          onWin={winnerHandler}
        />
      )}
      {props.isOpen && props.animationType === 1 && (
        <FortuneWheelRaffle
          duration={duration}
          onClose={props.closeRaffle}
          onWin={winnerHandler}
        />
      )}
    </div>
  );
};

RaffleWrapper.propTypes = {
  animationType: PropTypes.number.isRequired,
  changeAnimationType: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeRaffle: PropTypes.func.isRequired,
  openRaffle: PropTypes.func.isRequired,
  onWin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  animationType: makeSelectAnimation(),
  isOpen: makeSelectVisibility(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changeAnimationType: a => dispatch(changeAnimation(a)),
    closeRaffle: () => dispatch(changeVisibility(false)),
    openRaffle: () => dispatch(changeVisibility(true)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RaffleWrapper);
