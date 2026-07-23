import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Tooltip from '@mui/material/Tooltip';

import messages from './messages';
import db from '../../components/YoutubeWorker/db';

const StyledLink = styled(NavLink)`
  align-items: center;
  border: none;
  color: ${(props) => props.theme.buttonTextColor};
  display: inline-flex;
  font-size: 1.05rem;
  gap: 6px;
  height: 34px;
  justify-content: center;
  padding: 0 10px;
  position: relative;
  margin: 0 15px 0 0;
  text-decoration: none;
  svg.border-hover {
    stroke: currentColor;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    transition: stroke-dashoffset 0.5s cubic-bezier(0.22, 0.28, 0.36, 1);
    rect {
      transform-origin: 50% 50%;
      vector-effect: non-scaling-stroke;
    }
  }
  &:hover {
    svg.border-hover {
      stroke-dashoffset: 0;
    }
  }
  .border {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: auto;
  }
  .border-initial {
    border: 1px solid;
    opacity: 0.2;
  }
  @media (orientation: portrait) {
    height: 48px;
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
  font-size: 0.75rem;
  font-weight: normal;
  padding-right: 5px;
  vertical-align: middle;
`;

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
    <Tooltip
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
          <table>
            <tbody>
              {winners.map((item) => (
                <tr key={item.createdAt}>
                  <Td>
                    <img src={item.imageUrl} alt="Logo" width="32px" />
                  </Td>
                  <Td>{item.displayName}</Td>
                  <Td>{item.prize}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }
    >
      <StyledLink onMouseEnter={getHistory} to="/giveaway-history">
        <span className="border border-initial" />
        <svg className="border border-hover" fill="none">
          <rect width="100%" height="100%" pathLength="1" />
        </svg>
        <FormattedMessage {...messages.historyLink} />
        {warning && (
          <span role="img" aria-label="warning">
            ⚠️
          </span>
        )}
      </StyledLink>
    </Tooltip>
  );
};

export default HistoryWidget;
