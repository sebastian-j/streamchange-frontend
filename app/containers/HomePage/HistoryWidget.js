import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import messages from './messages';
import db from '../../components/YoutubeWorker/db';

const StyledLink = styled.span`
  background: ${props => props.theme.buttonBackground};
  border: 1px solid ${props => props.theme.color};
  color: ${props => props.theme.buttonTextColor};
  border-radius: 4px;
  height: 80%;
  padding: 3px 5px;
  margin: 10px 15px 0 0;
  text-decoration: none;
  &:hover {
    background-color: ${props => props.theme.buttonBackgroundHover};
    color: ${props => props.theme.buttonTextColorHover};
  }
`;

const WinnerTableTitle = styled.div`
  font-size: 14px;
  margin: 5px 0;
  text-align: center;
`;

const WarningContent = styled.div`
  font-size: 13px;
`;
const Td = styled.td`
  padding-right: 5px;
  vertical-align: middle;
`;

const ExtendedTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: 'rgba(225,246,246,0.9)',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: '300px',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #949499',
  },
}))(Tooltip);

const HistoryWidget = () => {
  const [winners, setWinners] = useState([]);
  const [warning, setWarning] = useState(false);
  const getHistory = () => {
    db.table('history')
      .reverse()
      .toArray()
      .then(items => {
        setWarning(items.length > 100);
        const it = Array.from(items);
        if (it.length > 3) it.length = 3;
        setWinners(it);
      })
      .catch(() => {
        setWinners([]);
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <ExtendedTooltip
      title={
        <React.Fragment>
          {!warning && winners.length === 0 && (
            <WarningContent>
              <FormattedMessage {...messages.historyEmptyTooltip} />
            </WarningContent>
          )}
          {warning && (
            <WarningContent>
              <FormattedMessage {...messages.historyWidgetWarningText} />
            </WarningContent>
          )}
          {winners.length > 0 && (
            <WinnerTableTitle>
              <FormattedMessage {...messages.historyWidgetTableTitle} />
            </WinnerTableTitle>
          )}
          {winners.map(item => (
            <tr key={item.createdAt}>
              <Td>
                <img src={item.imageUrl} alt="Logo" width="32px" />
              </Td>
              <Td>{item.displayName}</Td>
              <Td>{item.prize}</Td>
            </tr>
          ))}
        </React.Fragment>
      }
    >
      <NavLink to="/giveaway-history" style={{ textDecoration: 'none' }}>
        <StyledLink onMouseEnter={getHistory}>
          <FormattedMessage {...messages.historyLink} />
          {warning && (
            <span role="img" aria-label="warning">
              ⚠️
            </span>
          )}
        </StyledLink>
      </NavLink>
    </ExtendedTooltip>
  );
};

export default HistoryWidget;
