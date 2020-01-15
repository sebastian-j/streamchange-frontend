import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import db from '../../components/YoutubeWorker/db';
import HistoryItem from './HistoryItem';
import ArrowUpIcon from './arrowUpIcon';
import './style.css';

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoaded: false,
      items: [],
      sort: 'createdAtDESC',
      search: '',
      maxResults: 20,
      page: 0,
      isLastPage: false,
    };
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.getHistory = this.getHistory.bind(this);
  }

  handleSortChange(event) {
    const { target } = event;
    let value = target.id;
    if (value === this.state.sort) {
      value += 'DESC';
    }
    this.setState(
      {
        sort: value,
      },
      () => {
        this.getHistory();
      },
    );
  }

  handleChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.getHistory();
      },
    );
  }

  prevPage() {
    const oldPage = this.state.page;
    if (this.state.page > 0) {
      this.setState({ page: oldPage - 1 }, () => {
        this.getHistory();
      });
    }
  }

  nextPage() {
    const oldPage = this.state.page;
    this.setState({ page: Number(oldPage + 1) }, () => {
      this.getHistory();
    });
  }

  getHistory() {
    const firstResult = Number(this.state.page * this.state.maxResults);
    db.table('history')
      .filter(winner =>
        winner.displayName
          .toLowerCase()
          .includes(this.state.search.toLowerCase()),
      )
      .reverse()
      .offset(firstResult)
      .limit(this.state.maxResults)
      .toArray()
      .then(items => {
        this.setState({ isLoaded: true, error: false, items });
        if (this.state.maxResults > items.length) {
          this.setState({ isLastPage: true });
        } else this.setState({ isLastPage: false });
      })
      .catch(() => {
        this.setState({
          isLoaded: true,
          error: true,
        });
      });
  }

  componentDidMount() {
    this.getHistory();
  }

  render() {
    if (this.state.error) {
      return <div>Nie udało się załadować listy.</div>;
    }
    if (!this.state.isLoaded) {
      return (
        <div>
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
            Ładowanie listy
          </div>
        </div>
      );
    }
    if (this.state.search.length > 2 && this.state.items.length === 0) {
      return (
        <div className="page-wrapper">
          <TextField
            id="search"
            name="search"
            label="Wyszukaj (min. 3 znaki)"
            value={this.state.search}
            onChange={this.handleChange}
            type="text"
            margin="normal"
            fullWidth
          />
          <div>
            <div
              style={{
                fontSize: '2vw',
                marginTop: '10px',
                textAlign: 'center',
              }}
            >
              Żaden kanał nie pasuje do wyszukiwanego słowa.
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="page-wrapper">
        <NavLink to="/giveaway" activeClassName="active">
          <span>Powrót</span>
        </NavLink>
        <TextField
          id="search"
          name="search"
          label="Wyszukaj (min. 3 znaki)"
          value={this.state.search}
          onChange={this.handleChange}
          type="text"
          margin="normal"
          fullWidth
        />
        <table className="md-table">
          <thead className="md-thead">
            <tr>
              <td />
              <td>
                <button
                  className="header-btn"
                  id="displayName"
                  onClick={this.handleSortChange}
                  type="button"
                >
                  Nazwa
                  <ArrowUpIcon
                    className={clsx(
                      'sort-icon',
                      this.state.sort === 'displayName' && 'active',
                      this.state.sort === 'displayNameDESC' && [
                        'active',
                        'icon-direction-desc',
                      ],
                    )}
                  />
                </button>
              </td>
              <td>
                <button
                  className="header-btn"
                  id="prize"
                  onClick={this.handleSortChange}
                  type="button"
                >
                  Nagroda
                  <ArrowUpIcon
                    className={clsx(
                      'sort-icon',
                      this.state.sort === 'prize' && 'active',
                      this.state.sort === 'prizeDESC' && [
                        'active',
                        'icon-direction-desc',
                      ],
                    )}
                  />
                </button>
              </td>
              <td>
                <button
                  className="header-btn"
                  id="message"
                  onClick={this.handleSortChange}
                  type="button"
                >
                  Wiadomość
                  <ArrowUpIcon
                    className={clsx(
                      'sort-icon',
                      this.state.sort === 'message' && 'active',
                      this.state.sort === 'messageDESC' && [
                        'active',
                        'icon-direction-desc',
                      ],
                    )}
                  />
                </button>
              </td>
              <td>
                <button
                  className="header-btn"
                  id="createdAt"
                  onClick={this.handleSortChange}
                  type="button"
                >
                  Data i godzina
                  <ArrowUpIcon
                    className={clsx(
                      'sort-icon',
                      this.state.sort === 'createdAt' && 'active',
                      this.state.sort === 'createdAtDESC' && [
                        'active',
                        'icon-direction-desc',
                      ],
                    )}
                  />
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map(item => (
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
        </table>
        <div className="md-footer">
          {!this.state.isLastPage && (
            <IconButton
              edge="end"
              aria-label="Next page"
              name="next"
              onClick={this.nextPage}
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
          {this.state.page !== 0 && (
            <IconButton
              edge="end"
              aria-label="Previous page"
              name="prev"
              onClick={this.prevPage}
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
          <FormControl style={{ marginRight: '2vw', width: '128px' }}>
            <InputLabel htmlFor="age-simple">Ilość na stronę</InputLabel>
            <Select
              value={this.state.maxResults}
              onChange={this.handleChange}
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
          </FormControl>
        </div>
      </div>
    );
  }
}
