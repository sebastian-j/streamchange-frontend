import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import messages from './messages';
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
const RaffleWrapper = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [noUsers, setNoUsers] = useState(false);
  const [duration, setDuration] = useState(
    Number(localStorage.getItem('gv-animationDuration')) || 7,
  );
  const [raffleType, setRaffleType] = useState(0);

  const openDialog = () => {
    db.table('users')
      .filter(user => user.isEligible === true)
      .toArray()
      .then(items => {
        if (items.length > 0) {
          setIsOpen(true);
        } else {
          setNoUsers(true);
          setTimeout(() => setNoUsers(false), 3000);
        }
      });
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const changeDuration = value => {
    setDuration(value);
    localStorage.setItem('gv-animationDuration', String(value));
  };

  return (
    <div>
      <StyledFormControl margin="normal">
        <InputLabel id="animation-select">
          <FormattedMessage {...messages.raffleType} />
        </InputLabel>
        <Select
          onChange={event => setRaffleType(event.target.value)}
          value={raffleType}
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
      {isOpen && raffleType === 0 && (
        <CSGORaffle
          duration={duration}
          onClose={closeDialog}
          onWin={props.onWin}
        />
      )}
      {isOpen && raffleType === 1 && (
        <FortuneWheelRaffle
          duration={duration}
          onClose={closeDialog}
          onWin={props.onWin}
        />
      )}
    </div>
  );
};

RaffleWrapper.propTypes = {
  onWin: PropTypes.func.isRequired,
};

export default RaffleWrapper;
