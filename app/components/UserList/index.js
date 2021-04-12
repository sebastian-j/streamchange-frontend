import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';

import db from '../YoutubeWorker/db';
import { useInjectReducer } from '../../utils/injectReducer';
import FilterChips from './FilterChips';
import StyledTextField from '../StyledTextField';
import UserItem from './userItem';
import PanelTitle from '../Panel/PanelTitle';
import { makeSelectUserArray } from './selectors';
import { makeSelectGiveawayRequirement } from '../GiveawayRules/selectors';
import {
  deselectAllUsers,
  getListFromIdb,
  purgeList,
  selectAllUsers,
  toggleEligibility,
} from './actions';
import messages from './messages';
import reducer from './reducer';

const UserListPanel = styled.div`
  background-color: ${(props) => props.theme.panelBackground};
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  flex-grow: 1;
  margin: 15px;
  padding: 15px;
`;

const Ul = styled.ul`
  overflow-y: scroll;
  list-style: none;
  padding: 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledButton = styled(Button)`
  span {
    color: ${(props) => props.theme.color};
  }
`;

const Counts = styled.span`
  color: ${(props) => props.theme.secondaryTextColor};
  font-size: 0.9rem;
`;

const ThemedSvg = styled.svg`
  color: ${(props) => props.theme.staticTextColor};
`;

const UserList = (props) => {
  useInjectReducer({ key: 'userList', reducer });
  const [anchorEl, setAnchorEl] = useState(null);
  const [filtersAnchorEl, setFiltersAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    moderators: false,
    sponsors: false,
    verified: false,
    regulars: false,
    participating: false,
    notParticipating: false,
  });
  let selectedCount = 0;
  let allCount = 0;

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openFiltersMenu = (event) => {
    setFiltersAnchorEl(event.currentTarget);
  };

  const closeFiltersMenu = () => {
    setFiltersAnchorEl(null);
  };

  const handleInputValueChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setSearchQuery(value);
    if (value.length > 0 && value.length < 140) {
      setItems(
        props.userArray.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    } else if (value.length === 0) {
      setItems([]);
    }
  };

  const isFiltering = () => !Object.values(filters).some((x) => x);

  const getUsers = () => {
    let ret = items.length === 0 ? props.userArray : items;
    if (props.giveawayReq === 1)
      ret = ret.filter((user) => user.isSponsor !== false);
    if (isFiltering) {
      if (filters.participating && !filters.notParticipating) {
        ret = ret.filter((user) => user.isEligible);
      } else if (!filters.participating && filters.notParticipating) {
        ret = ret.filter((user) => !user.isEligible);
      }
      if (
        filters.moderators ||
        filters.regulars ||
        filters.sponsors ||
        filters.verified
      ) {
        ret = ret.filter(
          (user) =>
            (filters.moderators && user.isModerator) ||
            (filters.sponsors && user.isSponsor) ||
            (filters.verified && user.isVerified) ||
            (filters.regulars && !user.isModerator && !user.isSponsor),
        );
      }
    }
    selectedCount = ret.filter((item) => item.isEligible === true).length;
    allCount = ret.length;
    return ret;
  };

  useEffect(() => {
    if (props.userArray.length === 0) {
      db.table('users')
        .toArray()
        .then((arr) => {
          props.getList(arr);
        });
    }
  }, []);

  return (
    <UserListPanel>
      <Header>
        <PanelTitle>
          <FormattedMessage {...messages.panelTitle} />
        </PanelTitle>
        <HeaderButtons>
          <FormattedMessage {...messages.filtersTooltip}>
            {(title) => (
              <Tooltip title={title} aria-label="add">
                <IconButton
                  edge="end"
                  aria-label="Options"
                  onClick={openFiltersMenu}
                >
                  <ThemedSvg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18px"
                    height="18px"
                  >
                    <g>
                      <path d="M0,0h24 M24,24H0" fill="none" />
                      <path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" />
                      <path d="M0,0h24v24H0V0z" fill="none" />
                    </g>
                  </ThemedSvg>
                </IconButton>
              </Tooltip>
            )}
          </FormattedMessage>
          <IconButton edge="end" aria-label="Options" onClick={openMenu}>
            <ThemedSvg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18px"
              height="18px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </ThemedSvg>
          </IconButton>
        </HeaderButtons>
        <MenuList
          id="options-menu"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={closeMenu}
        >
          <MenuItem
            onClick={() => {
              props.selectAllUsers();
              closeMenu();
            }}
          >
            <FormattedMessage {...messages.selectUsers} />
          </MenuItem>
          <MenuItem
            onClick={() => {
              props.deselectAllUsers();
              closeMenu();
            }}
          >
            <FormattedMessage {...messages.deselectUsers} />
          </MenuItem>
        </MenuList>
        <MenuList
          id="filters-menu"
          anchorEl={filtersAnchorEl}
          open={!!filtersAnchorEl}
          onClose={closeFiltersMenu}
        >
          <MenuItem
            onClick={() =>
              setFilters((prevState) => ({
                ...prevState,
                regulars: !prevState.regulars,
              }))
            }
          >
            <ListItemIcon>
              {filters.regulars && (
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="25px"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </ListItemIcon>
            <FormattedMessage {...messages.regularsFilter} />
          </MenuItem>
          <MenuItem
            onClick={() =>
              setFilters((prevState) => ({
                ...prevState,
                moderators: !prevState.moderators,
              }))
            }
          >
            <ListItemIcon>
              {filters.moderators && (
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="25px"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </ListItemIcon>
            <FormattedMessage {...messages.moderatorsFilter} />
          </MenuItem>
          <MenuItem
            onClick={() =>
              setFilters((prevState) => ({
                ...prevState,
                sponsors: !prevState.sponsors,
              }))
            }
          >
            <ListItemIcon>
              {filters.sponsors && (
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="25px"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </ListItemIcon>
            <FormattedMessage {...messages.sponsorsFilter} />
          </MenuItem>
          <MenuItem
            onClick={() =>
              setFilters((prevState) => ({
                ...prevState,
                verified: !prevState.verified,
              }))
            }
          >
            <ListItemIcon>
              {filters.verified && (
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="25px"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </ListItemIcon>
            <FormattedMessage {...messages.verifiedFilter} />
          </MenuItem>
          <MenuItem
            onClick={() =>
              setFilters((prevState) => ({
                ...prevState,
                participating: !prevState.participating,
              }))
            }
          >
            <ListItemIcon>
              {filters.participating && (
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="25px"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </ListItemIcon>
            <FormattedMessage {...messages.selectedFilter} />
          </MenuItem>
          <MenuItem
            onClick={() =>
              setFilters((prevState) => ({
                ...prevState,
                notParticipating: !prevState.notParticipating,
              }))
            }
          >
            <ListItemIcon>
              {filters.notParticipating && (
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="25px"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </ListItemIcon>
            <FormattedMessage {...messages.notSelectedFilter} />
          </MenuItem>
        </MenuList>
      </Header>
      <FilterChips
        filters={filters}
        onDelete={(key) =>
          setFilters((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
          }))
        }
      />
      <FormattedMessage {...messages.searchPlaceholder}>
        {(placeholder) => (
          <StyledTextField
            autoFocus
            margin="dense"
            name="search"
            onChange={handleInputValueChange}
            label={placeholder}
            type="text"
            value={searchQuery}
            fullWidth
          />
        )}
      </FormattedMessage>
      <Ul>
        {getUsers().map((item) => (
          <UserItem
            key={item.id}
            channelId={item.id}
            title={item.title}
            isModerator={item.isModerator}
            isSponsor={item.isSponsor}
            isEligible={item.isEligible}
            handleToggleUser={props.toggleEligibility}
          />
        ))}
      </Ul>
      <StyledButton onClick={props.purgeList}>
        <FormattedMessage {...messages.clearBtn} />
      </StyledButton>
      <Counts>
        <FormattedMessage
          {...messages.counter}
          values={{
            selected: selectedCount,
            all: allCount,
          }}
        />
      </Counts>
    </UserListPanel>
  );
};

UserList.propTypes = {
  deselectAllUsers: PropTypes.func,
  getList: PropTypes.func,
  giveawayReq: PropTypes.number,
  purgeList: PropTypes.func,
  selectAllUsers: PropTypes.func,
  toggleEligibility: PropTypes.func,
  userArray: PropTypes.array,
};

export function mapDispatchToProps(dispatch) {
  return {
    deselectAllUsers: () => dispatch(deselectAllUsers()),
    getList: (arr) => dispatch(getListFromIdb(arr)),
    purgeList: () => dispatch(purgeList()),
    selectAllUsers: () => dispatch(selectAllUsers()),
    toggleEligibility: (id) => dispatch(toggleEligibility(id)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  giveawayReq: makeSelectGiveawayRequirement(),
  userArray: makeSelectUserArray(),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
