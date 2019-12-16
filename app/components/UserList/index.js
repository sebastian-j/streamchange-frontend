import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import db from '../YoutubeWorker/db';
import UserItem from './userItem';
import './style.css';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '', interval: null, items: [] };
    this.getUsers = this.getUsers.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.toggleEligible = this.toggleEligible.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    this.state.interval = setInterval(this.getUsers.bind(this), 3000);
  }

  getUsers() {
    db.table('users')
      .filter(user =>
        user.title.toLowerCase().includes(this.state.search.toLowerCase()),
      )
      .toArray()
      .then(items => {
        this.setState({ items });
      });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  handleInputValueChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    if (value.length < 140) {
      this.setState(
        {
          [name]: value,
        },
        () => this.getUsers(),
      );
    }
  }

  clearList() {
    db.messages.clear();
    db.users.clear().then(this.getUsers());
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
          })
          .then(() => {
            this.getUsers();
          });
      });
  }

  render() {
    return (
      <div className="gv-column flex-column">
        <h2 className="column-title">Uczestnicy</h2>
        <TextField
          autoFocus
          margin="dense"
          name="search"
          onChange={this.handleInputValueChange}
          label="Wyszukaj"
          type="text"
          value={this.state.search}
          fullWidth
        />
        <ul className="user-list">
          {this.state.items.map(item => (
            <UserItem
              key={item.id}
              channelId={item.id}
              title={item.title}
              isModerator={item.isModerator}
              isSponsor={item.isSponsor}
              isEligible={item.isEligible}
              handleToggleUser={this.toggleEligible}
            />
          ))}
        </ul>
        <Button color="primary" onClick={this.clearList}>
          Wyczyść listę
        </Button>
      </div>
    );
  }
}
