import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import StyledTextField from '../StyledTextField';
import db from '../YoutubeWorker/db';
import UserItem from './userItem';
import PanelTitle from '../Panel/PanelTitle';
import messages from './messages';

const UserListPanel = styled.div`
  background-color: ${props => props.theme.panelBackground};
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  flex-grow: 1;
  margin: 15px;
  padding: 15px;
`;

const Ul = styled.ul`
  overflow-y: scroll;
  list-style: none;
  padding: 0;
`;

const StyledButton = styled(Button)`
  span {
    color: ${props => props.theme.materialButtonColor};
  }
`;

const Counts = styled.span`
  color: ${props => props.theme.secondaryTextColor};
  font-size: 0.9rem;
`;

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
    db.users.clear().then(() => this.getUsers());
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
      <UserListPanel>
        <PanelTitle>
          <FormattedMessage {...messages.panelTitle} />
        </PanelTitle>
        <FormattedMessage {...messages.searchPlaceholder}>
          {placeholder => (
            <StyledTextField
              autoFocus
              margin="dense"
              name="search"
              onChange={this.handleInputValueChange}
              label={placeholder}
              type="text"
              value={this.state.search}
              fullWidth
            />
          )}
        </FormattedMessage>
        <Ul>
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
        </Ul>
        <StyledButton onClick={this.clearList}>
          <FormattedMessage {...messages.clearBtn} />
        </StyledButton>
        <Counts>
          <FormattedMessage
            {...messages.counter}
            values={{
              selected: this.state.items.filter(
                item => item.isEligible === true,
              ).length,
              all: this.state.items.length,
            }}
          />
        </Counts>
      </UserListPanel>
    );
  }
}
