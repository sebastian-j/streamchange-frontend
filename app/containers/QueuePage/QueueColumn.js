import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { createStructuredSelector } from 'reselect';

import StyledTextField from '../../components/StyledTextField';
import db from '../../components/YoutubeWorker/db';
import QueueItem from './QueueItem';
import PanelTitle from '../../components/Panel/PanelTitle';
import messages from './messages';
import { makeSelectQueueArray } from './selectors';
import { getQueueFromIdb, purgeQueue } from './actions';

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
    color: ${props => props.theme.color};
  }
`;

export class QueueColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.getUsers = this.getUsers.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    db.table('queue')
      .toArray()
      .then(items => {
        let it = Array.from(items);
        const now = new Date();
        for (let i = 0; i < it.length; i += 1) {
          it[i].addedAtDate = new Date(it[i].addedAt);
          it[i].lastActiveAtDate = new Date(it[i].lastActiveAt);
          if (
            (now.getTime() - it[i].lastActiveAtDate.getTime()) / 1000 >
            parseInt(localStorage.getItem('queue-timeToKick'), 10)
          ) {
            db.queue.delete(it[i].id);
          }
        }
        it = it.filter(
          value =>
            (now.getTime() - value.lastActiveAtDate.getTime()) / 1000 <
            parseInt(localStorage.getItem('queue-timeToKick'), 10),
        );
        it.sort(
          (a, b) =>
            (a.addedAtDate > b.addedAtDate) - (a.addedAtDate < b.addedAtDate),
        );
        this.props.getQueueFromIdb(it);
      });
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
          {this.props.queueArray.map(item => (
            <QueueItem
              key={item.id}
              addedAt={item.addedAt}
              imageUrl={item.imageUrl}
              channelId={item.id}
              title={item.title}
              message={item.message}
              lastActiveAt={item.lastActiveAt}
              handleToggleUser={this.toggleEligible}
            />
          ))}
        </Ul>
        <StyledButton onClick={this.props.purgeQueue}>
          <FormattedMessage {...messages.clearBtn} />
        </StyledButton>
      </UserListPanel>
    );
  }
}

QueueColumn.propTypes = {
  getQueueFromIdb: PropTypes.func,
  purgeQueue: PropTypes.func,
  queueArray: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  queueArray: makeSelectQueueArray(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getQueueFromIdb: arr => dispatch(getQueueFromIdb(arr)),
    purgeQueue: () => dispatch(purgeQueue()),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QueueColumn);
