import React from 'react';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import './style.css';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { keyword: '' };
    this.handleToggleButton = this.handleToggleButton.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
  }

  componentDidMount() {}

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
    }
  }

  render() {
    return (
      <div className="flex-column">
        <h2>Uczestnicy</h2>
        <TextField
          autoFocus
          margin="dense"
          name="searchTerm"
          onChange={this.handleInputValueChange}
          id="searchTerm"
          label="Wyszukaj"
          type="text"
          value={this.state.keyword}
          fullWidth
        />
      </div>
    );
  }
}
