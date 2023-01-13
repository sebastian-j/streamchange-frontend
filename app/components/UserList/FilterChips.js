import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import messages from './messages';

const Title = styled.span`
  color: ${(props) => props.theme.staticTextColor};
`;

const ListItem = styled.li`
  display: inline-block;
  list-style: none;
  margin: 0 0 5px 7px;
  .MuiChip-root {
    background-color: #e0e0e0;
    .MuiAvatar-root {
      background-color: #f1f1f1;
    }
  }
`;

const FilterChips = (props) => {
  const intl = useIntl();
  const isFiltering = () => !Object.values(props.filters).some((x) => x);
  return (
    <div>
      {!isFiltering() && (
        <div>
          <Title>
            <FormattedMessage {...messages.filtersTooltip} />
          </Title>
          {props.filters.regulars && (
            <ListItem>
              <Chip
                avatar={
                  <Avatar>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="rgb(130,55,238)"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M10.25 13c0 .69-.56 1.25-1.25 1.25S7.75 13.69 7.75 13s.56-1.25 1.25-1.25 1.25.56 1.25 1.25zM15 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm7 .25c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM10.66 4.12C12.06 6.44 14.6 8 17.5 8c.46 0 .91-.05 1.34-.12C17.44 5.56 14.9 4 12 4c-.46 0-.91.05-1.34.12zM4.42 9.47c1.71-.97 3.03-2.55 3.66-4.44C6.37 6 5.05 7.58 4.42 9.47zM20 12c0-.78-.12-1.53-.33-2.24-.7.15-1.42.24-2.17.24-3.13 0-5.92-1.44-7.76-3.69C8.69 8.87 6.6 10.88 4 11.86c.01.04 0 .09 0 .14 0 4.41 3.59 8 8 8s8-3.59 8-8z" />
                    </svg>
                  </Avatar>
                }
                label={intl.formatMessage({...messages.regularsFilter})}
                onDelete={() => props.onDelete('regulars')}
              />
            </ListItem>
          )}
          {props.filters.moderators && (
            <ListItem>
              <Chip
                avatar={
                  <Avatar>
                    <svg viewBox="0 0 16 16" fill="rgb(94, 132, 241)">
                      <g>
                        <path d="M9.64589146,7.05569719 C9.83346524,6.562372 9.93617022,6.02722257 9.93617022,5.46808511 C9.93617022,3.00042984 7.93574038,1 5.46808511,1 C4.90894765,1 4.37379823,1.10270499 3.88047304,1.29027875 L6.95744681,4.36725249 L4.36725255,6.95744681 L1.29027875,3.88047305 C1.10270498,4.37379824 1,4.90894766 1,5.46808511 C1,7.93574038 3.00042984,9.93617022 5.46808511,9.93617022 C6.02722256,9.93617022 6.56237198,9.83346524 7.05569716,9.64589147 L12.4098057,15 L15,12.4098057 L9.64589146,7.05569719 Z" />
                      </g>
                    </svg>
                  </Avatar>
                }
                label={intl.formatMessage({...messages.moderatorsFilter})}
                onDelete={() => props.onDelete('moderators')}
              />
            </ListItem>
          )}
          {props.filters.sponsors && (
            <ListItem>
              <Chip
                avatar={
                  <Avatar>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="rgb(43,166,64)"
                    >
                      <g>
                        <rect fill="none" height="24" width="24" />
                      </g>
                      <g>
                        <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8c0-4.41,3.59-8,8-8 s8,3.59,8,8C20,16.41,16.41,20,12,20z M12.89,11.1c-1.78-0.59-2.64-0.96-2.64-1.9c0-1.02,1.11-1.39,1.81-1.39 c1.31,0,1.79,0.99,1.9,1.34l1.58-0.67c-0.15-0.44-0.82-1.91-2.66-2.23V5h-1.75v1.26c-2.6,0.56-2.62,2.85-2.62,2.96 c0,2.27,2.25,2.91,3.35,3.31c1.58,0.56,2.28,1.07,2.28,2.03c0,1.13-1.05,1.61-1.98,1.61c-1.82,0-2.34-1.87-2.4-2.09L8.1,14.75 c0.63,2.19,2.28,2.78,3.02,2.96V19h1.75v-1.24c0.52-0.09,3.02-0.59,3.02-3.22C15.9,13.15,15.29,11.93,12.89,11.1z" />
                      </g>
                    </svg>
                  </Avatar>
                }
                label={intl.formatMessage({...messages.sponsorsFilter})}
                onDelete={() => props.onDelete('sponsors')}
              />
            </ListItem>
          )}
          {props.filters.verified && (
            <ListItem>
              <Chip
                avatar={
                  <Avatar>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#ffad29"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                  </Avatar>
                }
                label={intl.formatMessage({...messages.verifiedFilter})}
                onDelete={() => props.onDelete('verified')}
              />
            </ListItem>
          )}
          {props.filters.participating && (
            <ListItem>
              <Chip
                avatar={
                  <Avatar>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="rgb(43,166,64)"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <circle cx="15.5" cy="9.5" r="1.5" />
                      <circle cx="8.5" cy="9.5" r="1.5" />
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm4.41-6.11c-.35-.22-.82-.11-1.03.24-.74 1.17-2 1.87-3.38 1.87s-2.64-.7-3.38-1.88c-.22-.35-.68-.46-1.03-.24-.35.22-.46.68-.24 1.03C8.37 16.54 10.1 17.5 12 17.5s3.63-.97 4.65-2.58c.22-.35.11-.81-.24-1.03z" />
                    </svg>
                  </Avatar>
                }
                label={intl.formatMessage({...messages.selectedFilter})}
                onDelete={() => props.onDelete('participating')}
              />
            </ListItem>
          )}
          {props.filters.notParticipating && (
            <ListItem>
              <Chip
                avatar={
                  <Avatar>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="rgb(229,5,69)"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <circle cx="15.5" cy="9.5" r="1.5" />
                      <circle cx="8.5" cy="9.5" r="1.5" />
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-6c-1.9 0-3.63.97-4.65 2.58-.22.35-.11.81.24 1.03.35.22.81.11 1.03-.24.74-1.18 2-1.88 3.38-1.88s2.64.7 3.38 1.88c.14.23.39.35.64.35.14 0 .27-.04.4-.11.35-.22.46-.68.24-1.03C15.63 14.96 13.9 14 12 14z" />
                    </svg>
                  </Avatar>
                }
                label={intl.formatMessage({...messages.notSelectedFilter})}
                onDelete={() => props.onDelete('notParticipating')}
              />
            </ListItem>
          )}
        </div>
      )}
    </div>
  );
};

FilterChips.propTypes = {
  onDelete: PropTypes.func,
  filters: PropTypes.object,
};

export default FilterChips;
