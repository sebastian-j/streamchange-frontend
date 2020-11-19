import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import messages from './messages';
import { deleteQueueItem } from './actions';

const Title = styled.div`
  color: gray;
  font-weight: bold;
  font-size: 1.1rem;
  vertical-align: middle;
  ${({ active }) =>
    active &&
    `
    color: black;
  `}
`;

const Description = styled.div`
  color: gray;
  font-size: 0.8rem;
  ${({ active }) =>
    active &&
    `
    color: black;
  `}
`;

const UserBar = styled.div`
  background: linear-gradient(
    to right,
    rgba(230, 150, 230, 0.9) 0%,
    rgba(78, 187, 242, 0.9) 100%
  );
  border: none;
  border-radius: 0 16px 16px 0;
  color: ${props => props.theme.inactiveUser};
  display: flex;
  flex-direction: row;
  line-height: 1.43;
  margin-bottom: 5px;
  max-width: 90%;
  padding: 0;
  outline: 0;
`;

const UserBarColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 5px 2px;
`;
const Logo = styled.img`
  height: 50px;
  width: 50px;
  margin: 5px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.color};
  cursor: pointer;
  outline: none;
  &:hover {
    color: ${props => props.theme.buttonTextColorHover};
  }
`;

const ExtendedTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: 'rgba(225,246,246,0.9)',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: '300px',
    fontSize: theme.typography.pxToRem(15),
    border: '1px solid #949499',
  },
}))(Tooltip);

export const QueueItem = props => {
  const convertDate = dt =>
    `${dt.getHours()}:${dt.getMinutes() < 10 ? '0' : ''}${dt.getMinutes()}:${
      dt.getSeconds() < 10 ? '0' : ''
    }${dt.getSeconds()}`;
  const now = new Date();
  const addedAt = new Date(props.addedAt);
  const lastActiveAt = new Date(props.lastActiveAt);
  const isActive =
    (now.getTime() - lastActiveAt.getTime()) / 1000 <
    parseInt(localStorage.getItem('queue-timeToIdle'), 10);

  const deleteUser = () => {
    props.deleteItem(props.channelId);
  };

  return (
    <li>
      <ExtendedTooltip
        title={
          <React.Fragment>
            <div>
              <FormattedMessage {...messages.addedAtTooltipField} />{' '}
              {convertDate(addedAt)}
            </div>
            <div>
              <FormattedMessage {...messages.activeAtTooltipField} />{' '}
              {convertDate(lastActiveAt)}
            </div>
          </React.Fragment>
        }
        placement="right"
      >
        <UserBar>
          <a
            href={`https://www.youtube.com/channel/${props.channelId}`}
            target="_blank"
          >
            <Logo alt="logo" src={props.imageUrl} />
          </a>
          <UserBarColumn>
            <Title active={isActive}>{props.title}</Title>
            <Description active={isActive}>{props.message}</Description>
          </UserBarColumn>
          <CloseButton onClick={deleteUser} type="button">
            <svg focusable="false" width="36" height="36" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </CloseButton>
        </UserBar>
      </ExtendedTooltip>
    </li>
  );
};

QueueItem.propTypes = {
  addedAt: PropTypes.string,
  channelId: PropTypes.string,
  deleteItem: PropTypes.func,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  lastActiveAt: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    deleteItem: id => dispatch(deleteQueueItem(id)),
    dispatch,
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(QueueItem);
