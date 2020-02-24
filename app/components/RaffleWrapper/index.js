import React from 'react';
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
  border: 1px solid #0094ff;
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
export default class RaffleWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, noUsers: false, duration: 7, raffleType: 0 };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() {
    db.table('users')
      .filter(user => user.isEligible === true)
      .toArray()
      .then(items => {
        if (items.length > 0) {
          this.setState({ isOpen: true });
        } else {
          this.setState({ noUsers: true });
          setTimeout(() => this.setState({ noUsers: false }), 3000);
        }
      });
  }

  closeDialog() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div>
        <StyledFormControl margin="normal">
          <InputLabel id="animation-select">
            <FormattedMessage {...messages.raffleType} />
          </InputLabel>
          <Select
            labelId="animation-label"
            onChange={event =>
              this.setState({ raffleType: event.target.value })
            }
            value={this.state.raffleType}
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
              value={this.state.duration}
              onChange={ret => this.setState({ duration: ret })}
            />
          )}
        </FormattedMessage>
        <StartButton
          disabled={this.state.noUsers}
          type="button"
          onClick={this.openDialog}
        >
          {this.state.noUsers ? (
            <FormattedMessage {...messages.noUserSelected} />
          ) : (
            <FormattedMessage {...messages.startBtn} />
          )}
        </StartButton>
        {this.state.isOpen && this.state.raffleType === 0 && (
          <CSGORaffle
            duration={this.state.duration}
            onClose={this.closeDialog}
            onWin={this.props.onWin}
          />
        )}
        {this.state.isOpen && this.state.raffleType === 1 && (
          <FortuneWheelRaffle
            duration={this.state.duration}
            onClose={this.closeDialog}
            onWin={this.props.onWin}
          />
        )}
      </div>
    );
  }
}

RaffleWrapper.propTypes = {
  onWin: PropTypes.func.isRequired,
};
