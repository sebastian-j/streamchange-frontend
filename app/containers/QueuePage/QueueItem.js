import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import messages from './messages';
import { deleteQueueItem, updateQueueItem } from './actions';

const Title = styled.span`
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

const DescriptionBox = styled.input`
  background: none;
  border: none;
  border-bottom: 2px solid black;
  font-size: 0.8rem;
  padding-left: 0px;
  outline: none;
`;

const UserBar = styled.div`
  background: linear-gradient(
    to right,
    rgba(230, 150, 230, 0.9) 0%,
    rgba(78, 187, 242, 0.9) 100%
  );
  border: none;
  border-radius: 0 16px 16px 0;
  color: ${(props) => props.theme.inactiveUser};
  line-height: 1.43;
  margin-bottom: 5px;
  max-width: 90%;
  padding: 0;
  outline: 0;
  > div {
    display: flex;
    flex-direction: row;
  }
`;

const FlexSpacer = styled.div`
  flex: 1;
`;

const UserBarColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 2px;
  ${({ fullWidth }) =>
    fullWidth &&
    `
    flex: 1;
  `}
`;

const Logo = styled.img`
  height: 50px;
  width: 50px;
  margin: 5px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.color};
  cursor: pointer;
  outline: none;
  &:hover {
    color: ${(props) => props.theme.buttonTextColorHover};
  }
`;

const EditModeButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.buttonTextColor};
  cursor: pointer;
  font-weight: bold;
  outline: none;
  &:hover {
    color: ${(props) => props.theme.buttonTextColorHover};
  }
`;

const ExtendedTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'rgba(225,246,246,0.9)',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: '300px',
    fontSize: theme.typography.pxToRem(15),
    border: '1px solid #949499',
  },
}))(Tooltip);

export const QueueItem = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(props.message);
  const [isActive, setIsActive] = useState(true);
  const convertDate = (dt) =>
    `${dt.getHours()}:${dt.getMinutes() < 10 ? '0' : ''}${dt.getMinutes()}:${
      dt.getSeconds() < 10 ? '0' : ''
    }${dt.getSeconds()}`;

  const addedAt = new Date(props.addedAt);

  const deleteUser = () => {
    props.deleteItem(props.channelId);
  };

  const toggleEditMode = (mode) => {
    setEditMode(mode);
    window.getSelection().removeAllRanges();
  };

  const markActive = () => {
    const it = { id: props.channelId, lastActiveAt: new Date().toISOString() };
    props.updateItem(it);
    setEditMode(false);
  };

  const updateDescription = () => {
    const it = { id: props.channelId, message: editedDescription };
    props.updateItem(it);
    setEditMode(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      updateDescription();
    }
  };

  const refresh = () => {
    const now = new Date();
    const lastActiveAt = new Date(props.lastActiveAt);
    setIsActive(
      (now.getTime() - lastActiveAt.getTime()) / 1000 <
        parseInt(localStorage.getItem('queue-timeToIdle'), 10),
    );
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    setEditedDescription(props.message);
  }, [props.message]);

  if (editMode)
    return (
      <li>
        <UserBar>
          <div>
            <a
              href={`https://www.youtube.com/channel/${props.channelId}`}
              target="_blank"
            >
              <Logo alt="logo" src={props.imageUrl} edit={editMode} />
            </a>
            <UserBarColumn fullWidth>
              <Title active={isActive}>{props.title}</Title>
              <DescriptionBox
                type="text"
                onChange={(event) => setEditedDescription(event.target.value)}
                onKeyPress={handleKeyPress}
                value={editedDescription}
              />
            </UserBarColumn>
          </div>
          <div>
            <EditModeButton onClick={markActive} type="button">
              <FormattedMessage {...messages.markActiveBtn} />
            </EditModeButton>
            <FlexSpacer />
            <EditModeButton onClick={() => toggleEditMode(false)} type="button">
              <FormattedMessage {...messages.cancelBtn} />
            </EditModeButton>
            <EditModeButton onClick={updateDescription} type="button">
              <FormattedMessage {...messages.saveBtn} />
            </EditModeButton>
          </div>
        </UserBar>
      </li>
    );

  return (
    <li>
      <ExtendedTooltip
        title={
          <>
            <div>
              <FormattedMessage {...messages.addedAtTooltipField} />{' '}
              {convertDate(addedAt)}
            </div>
            <div>
              <FormattedMessage {...messages.activeAtTooltipField} />{' '}
              {convertDate(new Date(props.lastActiveAt))}
            </div>
          </>
        }
        placement="right"
      >
        <UserBar
          onDoubleClick={() => toggleEditMode(true)}
          onMouseEnter={refresh}
        >
          <div>
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
            <FlexSpacer />
            <CloseButton onClick={deleteUser} type="button">
              <svg focusable="false" width="36" height="36" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </CloseButton>
          </div>
        </UserBar>
      </ExtendedTooltip>
    </li>
  );
};

QueueItem.propTypes = {
  addedAt: PropTypes.string,
  channelId: PropTypes.string.isRequired,
  deleteItem: PropTypes.func,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  lastActiveAt: PropTypes.string,
  updateItem: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    deleteItem: (id) => dispatch(deleteQueueItem(id)),
    updateItem: (item) => dispatch(updateQueueItem(item)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(QueueItem);
