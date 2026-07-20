import React from 'react';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import ArrowUpIcon from './components/arrowUpIcon';
import HistoryItem from './HistoryItem';
import { Table } from './components/Table';
import { TableHeaderButton } from './components/TableHeaderButton';
import { Thead } from './components/Thead';
import { HistoryItem as HItem } from './types';

interface Props {
  items: HItem[];
  sort: string;
  onSortChange: (value: string) => void;
}

const HistoryTable = ({ items, sort, onSortChange }: Props) => {
  const handleSortChange = (event) => {
    const { target } = event;
    let value = target.id;
    if (value === sort) {
      value += 'DESC';
    }
    onSortChange(value);
  };

  return (
    <Table>
      <Thead>
        <tr>
          <td />
          <td>
            <TableHeaderButton
              id="displayName"
              onClick={handleSortChange}
              type="button"
            >
              <FormattedMessage {...messages.nameHeader} />
              <ArrowUpIcon
                className={clsx(
                  sort === 'displayName' && 'active',
                  sort === 'displayNameDESC' && ['active', 'descending']
                )}
              />
            </TableHeaderButton>
          </td>
          <td>
            <TableHeaderButton
              id="prize"
              onClick={handleSortChange}
              type="button"
            >
              <FormattedMessage {...messages.prizeHeader} />
              <ArrowUpIcon
                className={clsx(
                  sort === 'prize' && 'active',
                  sort === 'prizeDESC' && ['active', 'descending']
                )}
              />
            </TableHeaderButton>
          </td>
          <td>
            <TableHeaderButton
              id="message"
              onClick={handleSortChange}
              type="button"
            >
              <FormattedMessage {...messages.messageHeader} />
              <ArrowUpIcon
                className={clsx(
                  sort === 'message' && 'active',
                  sort === 'messageDESC' && ['active', 'descending']
                )}
              />
            </TableHeaderButton>
          </td>
          <td>
            <TableHeaderButton
              id="createdAt"
              onClick={handleSortChange}
              type="button"
            >
              <FormattedMessage {...messages.dateHeader} />
              <ArrowUpIcon
                className={clsx(
                  sort === 'createdAt' && 'active',
                  sort === 'createdAtDESC' && ['active', 'descending']
                )}
              />
            </TableHeaderButton>
          </td>
        </tr>
      </Thead>
      <tbody>
        {items.map((item) => (
          <HistoryItem
            key={item.createdAt}
            channelId={item.channelId}
            imageUrl={item.imageUrl}
            platform={item.platform}
            displayName={item.displayName}
            prize={item.prize}
            message={item.message}
            createdAt={item.createdAt}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default HistoryTable;
