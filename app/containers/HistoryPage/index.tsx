import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import db from '../../components/YoutubeWorker/db';
import StyledTextField from '../../components/StyledTextField';
import StyledFormControl from '../../components/StyledTextField/StyledFormControl';
import HistoryMenu from './HistoryMenu';
import HistoryTable from './HistoryTable';
import { HistoryItem } from './types';

const PageWrapper = styled.div`
  background-color: ${(props) => props.theme.bodyBackground};
  padding: 10px;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
`;

const ReturnButton = styled(NavLink)`
  display: block;
  color: ${(props) => props.theme.staticTextColor};
  flex-grow: 1;
  line-height: 48px;
  min-height: 48px;
  text-decoration: none;
  & span {
    margin-left: 24px;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Information = styled.div`
  color: ${(props) => props.theme.staticTextColor};
  font-size: 2vw;
  margin-top: 5vh;
  text-align: center;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;
  max-width: 200px;
`;

const HistoryPage = () => {
  const [error, setError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxResults, setMaxResults] = useState<number>(20);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const getHistory = () => {
    const firstResult = Number(page * maxResults);
    db.table('history')
      .filter((winner) =>
        winner.displayName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .reverse()
      .offset(firstResult)
      .limit(maxResults)
      .toArray()
      .then((it: HistoryItem[]) => {
        setIsLoaded(true);
        setError(false);
        setItems(it);
        if (maxResults > it.length) {
          setIsLastPage(true);
        } else setIsLastPage(false);
      })
      .catch(() => {
        setIsLoaded(true);
        setError(true);
      });
  };

  const prevPage = () => {
    if (page > 0) {
      setPage((prevState) => prevState - 1);
    }
  };

  const nextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    getHistory();
  }, [maxResults]);
  useEffect(() => {
    getHistory();
  }, [page]);
  useEffect(() => {
    getHistory();
  }, [searchQuery]);
  useEffect(() => {
    getHistory();
  }, []);

  if (error) {
    return (
      <div>
        <FormattedMessage {...messages.infoError} />
      </div>
    );
  }
  if (!isLoaded) {
    return (
      <PageWrapper>
        <LinearProgress />
        <div
          style={{
            fontSize: '2vw',
            position: 'absolute',
            left: '55%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <FormattedMessage {...messages.infoLoading} />
        </div>
      </PageWrapper>
    );
  }
  return (
    <PageWrapper>
      <Header>
        <ReturnButton to="/giveaway" activeClassName="active">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            <span>
              <FormattedMessage {...messages.returnButton} />
            </span>
          </div>
        </ReturnButton>
        <HistoryMenu onClear={getHistory} />
      </Header>
      <FormattedMessage {...messages.searchLabel}>
        {(label) => (
          <StyledTextField
            id="search"
            name="search"
            label={label}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            type="text"
            margin="normal"
            fullWidth
          />
        )}
      </FormattedMessage>
      {searchQuery.length > 0 && items.length === 0 && (
        <Information>
          <FormattedMessage {...messages.infoNoResults} />
        </Information>
      )}
      {items.length > 0 && <HistoryTable items={items} />}
      <Footer>
        {!isLastPage && (
          <IconButton
            edge="end"
            aria-label="Next page"
            name="next"
            onClick={nextPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              <path fill="none" d="M0 0h24v24H0V0z" />
            </svg>
          </IconButton>
        )}
        {page !== 0 && (
          <IconButton
            edge="end"
            aria-label="Previous page"
            name="prev"
            onClick={prevPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              <path fill="none" d="M0 0h24v24H0V0z" />
            </svg>
          </IconButton>
        )}
        <StyledFormControl margin="normal">
          <InputLabel htmlFor="maxResults">
            <FormattedMessage {...messages.resultsPerPage} />
          </InputLabel>
          <Select
            value={maxResults}
            onChange={(event) => {
              setMaxResults(Number(event.target.value));
            }}
            inputProps={{
              name: 'maxResults',
              id: 'maxResults',
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </StyledFormControl>
      </Footer>
    </PageWrapper>
  );
};

export default HistoryPage;
