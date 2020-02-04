import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CSGORaffle from '../CSGORaffle';
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

export default class RaffleWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, noUsers: false, duration: 7 };
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
        <NumericInput
          label="Czas trwania animacji (sekundy)"
          minValue={1}
          value={this.state.duration}
          onChange={ret => this.setState({ duration: ret })}
        />
        <StartButton
          disabled={this.state.noUsers}
          type="button"
          onClick={this.openDialog}
        >
          {this.state.noUsers ? 'Nie zaznaczono żadnego użytkownika' : 'Losuj'}
        </StartButton>
        {this.state.isOpen && (
          <CSGORaffle
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
