import React from 'react';
import PropTypes from 'prop-types';
import CSGORaffle from '../CSGORaffle';

export default class RaffleWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() {
    this.setState({ isOpen: true });
  }

  closeDialog() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div>
        <button
          className="start-lottery-btn"
          type="button"
          onClick={this.openDialog}
        >
          Losuj
        </button>
        {this.state.isOpen && (
          <CSGORaffle onClose={this.closeDialog} onWin={this.props.onWin} />
        )}
      </div>
    );
  }
}

RaffleWrapper.propTypes = {
  onWin: PropTypes.func.isRequired,
};
