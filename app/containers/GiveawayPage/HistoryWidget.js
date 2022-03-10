import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import messages from './messages';
import db from '../../components/YoutubeWorker/db';

const StyledLink = styled(NavLink)`
  border: none;
  border-radius: 6px;
  color: ${(props) => props.theme.buttonTextColor};
  font-size: 1.05rem;
  height: 70%;
  padding: 5px 8px;
  position: relative;
  margin: 0 15px 0 0;
  text-decoration: none;
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
    border-radius: 6px;
    border: 1px solid;
    opacity: 0.2;
  }
  svg.border-hover {
    stroke: currentColor;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    transition: stroke-dashoffset .5s cubic-bezier(.22,.28,.36,1);
    rect {
      transform-origin: 50% 50%;
      vector-effect: non-scaling-stroke;
    }
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
          <rect width="100%" height="100%" rx="6px" pathLength="1"/>
        </svg>
        <FormattedMessage {...messages.historyLink} />
        {warning && (
          <span role="img" aria-label="warning">
              ⚠️
          </span>
        )}
      </StyledLink>
    </ExtendedTooltip>
  );
};

export default HistoryWidget;
