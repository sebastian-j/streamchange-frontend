import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import messages from './messages';
import db from '../../components/YoutubeWorker/db';

const StyledLink = styled.span`
  background: ${(props) => props.theme.iconButtonBackground};
  border: none;
  border-radius: 6px;
  color: ${(props) => props.theme.buttonTextColor};
  font-size: 1.05rem;
  height: 80%;
  padding: 8px 8px;
  margin: 0 15px 0 0;
  text-decoration: none;
  &:hover {
    background-color: ${(props) => props.theme.buttonBackgroundHover};
    color: ${(props) => props.theme.buttonTextColorHover};
  }
  @media (orientation: portrait) {
    line-height: 3em;
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

const ExtendedTooltip = withStyles((theme) => ({
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
      .then((items) => {
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
        <>
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
          {winners.map((item) => (
            <tr key={item.createdAt}>
              <Td>
                <img src={item.imageUrl} alt="Logo" width="32px" />
              </Td>
              <Td>{item.displayName}</Td>
              <Td>{item.prize}</Td>
            </tr>
          ))}
        </>
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
