import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import KeywordInput from './KeywordInput';
import RaffleWrapper from '../RaffleWrapper';
import WinnerView from '../WinnerView';
import './style.css';

export default class GiveawayRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forMods: true,
      forSponsors: true,
      forRegulars: true,
      prize: '',
      winnerId: null,
    };
    this.handleToggleButton = this.handleToggleButton.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.winHandler = this.winHandler.bind(this);
  }

  componentDidMount() {
    const forMods = localStorage.getItem('gv-forMods') === 'true';
    const forSponsors = localStorage.getItem('gv-forSponsors') === 'true';
    const forRegulars = localStorage.getItem('gv-forRegulars') === 'true';
    const prize = localStorage.getItem('gv-prize');
    this.setState({ forMods, forSponsors, forRegulars, prize });
  }

  handleToggleButton(event) {
    const { target } = event;
    const { name } = target;
    if (name === 'forMods') {
      this.setState(
        prevState => ({
          forMods: !prevState.forMods,
        }),
        () => {
          localStorage.setItem('gv-forMods', this.state.forMods);
        },
      );
    } else if (name === 'forSponsors') {
      this.setState(
        prevState => ({
          forSponsors: !prevState.forSponsors,
        }),
        () => {
          localStorage.setItem('gv-forSponsors', this.state.forSponsors);
        },
      );
    } else if (name === 'forRegulars') {
      this.setState(
        prevState => ({
          forRegulars: !prevState.forRegulars,
        }),
        () => {
          localStorage.setItem('gv-forRegulars', this.state.forRegulars);
        },
      );
    }
  }

  handleInputValueChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    if (value.length < 140) {
      this.setState({
        [name]: value,
      });
      localStorage.setItem(`gv-${name}`, value);
    }
  }

  winHandler(id) {
    this.setState({
      winnerId: id,
    });
  }

  render() {
    if (this.state.winnerId) {
      return (
        <WinnerView
          apiKey={this.props.apiKey}
          ownerId={this.props.channelId}
          id={this.state.winnerId}
          prize={this.state.prize}
          onClose={() => this.setState({ winnerId: null })}
        />
      );
    }
    return (
      <div className="gv-column">
        <h2 className="column-title">Zasady losowania</h2>
        <button
          name="forMods"
          type="button"
          className={clsx('viewer-type-button', this.state.forMods && 'active')}
          onClick={this.handleToggleButton}
        >
          Moderatorzy
        </button>
        <button
          name="forSponsors"
          type="button"
          className={clsx(
            'viewer-type-button',
            this.state.forSponsors && 'active',
          )}
          onClick={this.handleToggleButton}
        >
          Sponsorzy
        </button>
        <button
          name="forRegulars"
          type="button"
          className={clsx(
            'viewer-type-button',
            this.state.forRegulars && 'active',
          )}
          onClick={this.handleToggleButton}
        >
          Zwykli użytkownicy
        </button>
        <TextField
          autoFocus
          margin="dense"
          name="prize"
          onChange={this.handleInputValueChange}
          label="Nagroda (opcjonalne)"
          type="text"
          value={this.state.prize}
          fullWidth
        />
        <KeywordInput />
        <RaffleWrapper onWin={this.winHandler} />
      </div>
    );
  }
}

GiveawayRules.propTypes = {
  apiKey: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
};
