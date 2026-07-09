import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import { BADGE_SETS } from '../ChatView/InternalChatBadges';
import messages from './messages';

const Title = styled.span`
  color: ${(props) => props.theme.staticTextColor};
`;

const ListItem = styled.li`
  display: inline-block;
  list-style: none;
  margin: 0 0 5px 7px;
  .MuiChip-root {
    background-color: ${(props) => props.theme.iconButtonBackground};
    color: ${(props) => props.theme.staticTextColor};
    .MuiAvatar-root {
      background-color: ${(props) => props.theme.buttonBackground};
    }
    .MuiChip-deleteIcon {
      color: ${(props) => props.theme.secondaryTextColor};
      &:hover {
        color: ${(props) => props.theme.staticTextColor};
      }
    }
  }
`;

const FilterChips = (props) => {
  const intl = useIntl();
  const badgeSet = BADGE_SETS[props.platform] || BADGE_SETS.twitch;
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
                label={intl.formatMessage({ ...messages.regularsFilter })}
                onDelete={() => props.onDelete('regulars')}
              />
            </ListItem>
          )}
          {props.filters.moderators && (
            <ListItem>
              <Chip
                avatar={
                  <Avatar>
                    <img src={badgeSet.moderator} alt="" height="20px" />
                  </Avatar>
                }
                label={intl.formatMessage({ ...messages.moderatorsFilter })}
                onDelete={() => props.onDelete('moderators')}
              />
            </ListItem>
          )}
          {props.filters.subscribers && (
            <ListItem>
              <Chip
                avatar={
                  <Avatar>
                    <img src={badgeSet.subscriber} alt="" height="20px" />
                  </Avatar>
                }
                label={intl.formatMessage({ ...messages.subscribersFilter })}
                onDelete={() => props.onDelete('subscribers')}
              />
            </ListItem>
          )}
          {props.filters.vip && (
            <ListItem>
              <Chip
                avatar={
                  <Avatar>
                    <img src={badgeSet.vip} alt="" height="20px" />
                  </Avatar>
                }
                label={intl.formatMessage({ ...messages.vipFilter })}
                onDelete={() => props.onDelete('vip')}
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
                label={intl.formatMessage({ ...messages.selectedFilter })}
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
                label={intl.formatMessage({ ...messages.notSelectedFilter })}
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
  platform: PropTypes.string,
};

export default FilterChips;
