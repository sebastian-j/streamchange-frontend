import React from 'react';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import './style.css';

export default class GiveawayRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      forMods: true,
      forSponsors: true,
      forRegulars: true,
    };
    this.handleToggleButton = this.handleToggleButton.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
  }

  componentDidMount() {
    let keyword = localStorage.getItem('keyword');
    if (keyword === null) {
      keyword = '';
    }
    this.setState({ keyword });
  }

  handleToggleButton(event) {
    const { target } = event;
    const { name } = target;
    if (name === 'forMods') {
      this.setState(prevState => ({
        forMods: !prevState.forMods,
      }));
    } else if (name === 'forSponsors') {
      this.setState(prevState => ({
        forSponsors: !prevState.forSponsors,
      }));
    } else if (name === 'forRegulars') {
      this.setState(prevState => ({
        forRegulars: !prevState.forRegulars,
      }));
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
      localStorage.setItem(name, value);
    }
  }

  render() {
    return (
      <div className="flex-column">
        <h2>Zasady losowania</h2>
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
          name="keyword"
          onChange={this.handleInputValueChange}
          id="keyword"
          label="Słowo kluczowe"
          type="text"
          value={this.state.keyword}
          fullWidth
        />
        <button className="start-lottery-btn" type="button">
          Losuj
        </button>
      </div>
    );
  }
}
