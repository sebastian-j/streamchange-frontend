import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { StyledButton } from './components/StyledButton';
import StyledTextField from '../../components/StyledTextField';
import QueueItem from './QueueItem';
import PanelTitle from '../../components/Panel/PanelTitle';
import { UserListPanel } from '../../components/Panel/UserListPanel';
import messages from './messages';
import { makeSelectQueueArray, makeSelectWidgetCode } from './selectors';
import {
  getQueueFromIdb as actionGet,
  purgeQueue as actionPurge,
} from './actions';
import { QueueItem as QItem } from './types';
import { API_URL } from '../../config';

interface Props {
  getQueueFromIdb: (items: QItem[]) => void;
  purgeQueue: () => void;
  queueArray: QItem[];
  widgetCode: string;
}

const QueueColumn = ({
  getQueueFromIdb,
  purgeQueue,
  queueArray,
  widgetCode,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getUsers = () => {
    const config = {
      headers: {
        Authorization: `Plain ${widgetCode}`,
      },
    };
    axios
      .get(`${API_URL}/v4/queue/`, config)
      .then((res) => {
        const queueContent: QItem[] = res.data.items.map((a) => ({
          ...a,
        }));
        getQueueFromIdb(queueContent);
      })
      .catch(() => {
        const emptyQueue: QItem[] = [];
        getQueueFromIdb(emptyQueue);
      });
  };

  const handleInputValueChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (value.length < 140) {
      setSearchQuery(value);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserListPanel>
      <PanelTitle>
        <FormattedMessage {...messages.panelTitle} />
      </PanelTitle>
      <FormattedMessage {...messages.searchPlaceholder}>
        {(placeholder) => (
          <StyledTextField
            autoFocus
            margin="dense"
            name="searchQuery"
            onChange={handleInputValueChange}
            label={placeholder}
            type="text"
            value={searchQuery}
            fullWidth
          />
        )}
      </FormattedMessage>
      <ul>
        {queueArray.map((item: QItem) => (
          <QueueItem
            key={item.id}
            addedAt={item.addedAt}
            imageUrl={item.imageUrl}
            channelId={item.id}
            title={item.title}
            message={item.message}
            lastActiveAt={item.lastActiveAt}
          />
        ))}
      </ul>
      <StyledButton onClick={() => purgeQueue()}>
        <FormattedMessage {...messages.clearBtn} />
      </StyledButton>
    </UserListPanel>
  );
};

const mapStateToProps = createStructuredSelector({
  queueArray: makeSelectQueueArray(),
  widgetCode: makeSelectWidgetCode(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getQueueFromIdb: (arr) => dispatch(actionGet(arr)),
    purgeQueue: () => dispatch(actionPurge()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueColumn);
