import React from 'react';
import TextField from '@material-ui/core/TextField';
import db from '../YoutubeWorker/db';
import UserItem from './userItem';
import './style.css';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { keyword: '', interval: null, items: [] };
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.toggleEligible = this.toggleEligible.bind(this);
  }

  componentDidMount() {
    this.state.interval = setInterval(
      function() {
        db.table('users')
          .toArray()
          .then(items => {
            this.setState({ items });
          });
      }.bind(this),
      3000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
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

  toggleEligible(id) {
    db.users
      .where('id')
      .equals(id)
      .first()
      .then(user => {
        db.table('users')
          .where('id')
          .equals(id)
          .modify({
            isEligible: !user.isEligible,
          });
      });
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
        <ul className="user-list">
          {this.state.items.map(item => (
            <UserItem
              key={item.id}
              channelId={item.id}
              title={item.title}
              isEligible={item.isEligible}
              handleToggleUser={this.toggleEligible}
            />
          ))}
        </ul>
      </div>
    );
  }
}
