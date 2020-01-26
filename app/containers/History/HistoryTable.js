import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styled from 'styled-components';
import ArrowUpIcon from './arrowUpIcon';
import HistoryItem from './HistoryItem';
import './style.css';

const HeaderButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.staticTextColor};
  padding: 14px 10px 14px 16px;
  outline: none;
  width: 100%;
`;

const Table = styled.table`
  display: table;
  overflow-y: auto;
  min-width: 1052px;
  width: 100%;
`;

const Thead = styled.thead`
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  cursor: pointer;
  user-select: none;
`;

const HistoryTable = props => {
  const [sort, setSort] = useState('createdAtDESC');
  const handleSortChange = event => {
    const { target } = event;
    let value = target.id;
    if (value === sort) {
      value += 'DESC';
    }
    setSort(value);
  };

  return (
    <Table>
      <Thead>
        <tr>
          <td />
          <td>
            <HeaderButton
              id="displayName"
              onClick={handleSortChange}
              type="button"
            >
              Nazwa
              <ArrowUpIcon
                className={clsx(
                  'sort-icon',
                  sort === 'displayName' && 'active',
                  sort === 'displayNameDESC' && [
                    'active',
                    'icon-direction-desc',
                  ],
                )}
              />
            </HeaderButton>
          </td>
          <td>
            <HeaderButton id="prize" onClick={handleSortChange} type="button">
              Nagroda
              <ArrowUpIcon
                className={clsx(
                  'sort-icon',
                  sort === 'prize' && 'active',
                  sort === 'prizeDESC' && ['active', 'icon-direction-desc'],
                )}
              />
            </HeaderButton>
          </td>
          <td>
            <HeaderButton id="message" onClick={handleSortChange} type="button">
              Wiadomość
              <ArrowUpIcon
                className={clsx(
                  'sort-icon',
                  sort === 'message' && 'active',
                  sort === 'messageDESC' && ['active', 'icon-direction-desc'],
                )}
              />
            </HeaderButton>
          </td>
          <td>
            <HeaderButton
              id="createdAt"
              onClick={handleSortChange}
              type="button"
            >
              Data i godzina
              <ArrowUpIcon
                className={clsx(
                  'sort-icon',
                  sort === 'createdAt' && 'active',
                  sort === 'createdAtDESC' && ['active', 'icon-direction-desc'],
                )}
              />
            </HeaderButton>
          </td>
        </tr>
      </Thead>
      <tbody>
        {props.items.map(item => (
          <HistoryItem
            channelId={item.channelId}
            imageUrl={item.imageUrl}
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

HistoryTable.propTypes = {
  items: PropTypes.array,
};

export default HistoryTable;
