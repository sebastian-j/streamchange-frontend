import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { makeSelectGiveawayPrize } from './selectors';
import { changePrize } from './actions';
import AdFrame from '../AdFrame';
import Panel from '../Panel';
import PanelTitle from '../Panel/PanelTitle';
import StyledTextField from '../StyledTextField';
import KeywordInput from './KeywordInput';
import RaffleWrapper from '../RaffleWrapper';
import WinnerView from '../WinnerView';

const UserTypeButton = styled.button`
  background-color: transparent;
  border: 1px solid gray;
  color: ${(props) => props.theme.buttonTextColor};
  cursor: pointer;
  padding: 6px 12px;
  outline: none;
  ${({ active }) =>
    active &&
    `
    border: 1px solid #0094ff;
    text-shadow: 0px 0px 4px #0cd2ef;
  `}
`;

export class GiveawayRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forMods: true,
      forSponsors: true,
      forRegulars: true,
      winnerId: null,
    };
    this.handleToggleButton = this.handleToggleButton.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.winHandler = this.winHandler.bind(this);
  }

  componentDidMount() {
    const forMods = localStorage.getItem('gv-forMods') === 'true';
    const forSponsors = localStorage.getItem('gv-forSponsors') === 'true';
    const forRegulars = localStorage.getItem('gv-forRegulars') === 'true';
    this.setState({ forMods, forSponsors, forRegulars });
  }

  handleToggleButton(event) {
    const { target } = event;
    const { name } = target;
    if (name === 'forMods') {
      this.setState(
        (prevState) => ({
          forMods: !prevState.forMods,
        }),
        () => {
          localStorage.setItem('gv-forMods', this.state.forMods);
        },
      );
    } else if (name === 'forSponsors') {
      this.setState(
        (prevState) => ({
          forSponsors: !prevState.forSponsors,
        }),
        () => {
          localStorage.setItem('gv-forSponsors', this.state.forSponsors);
        },
      );
    } else if (name === 'forRegulars') {
      this.setState(
        (prevState) => ({
          forRegulars: !prevState.forRegulars,
        }),
        () => {
          localStorage.setItem('gv-forRegulars', this.state.forRegulars);
        },
      );
    }
  }

  handleInputValueChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    if (value.length < 140) {
      this.setState({
        [name]: value,
      });
      localStorage.setItem(`gv-${name}`, value);
    }
  }

  winHandler(id) {
    this.setState({
      winnerId: id,
    });
  }

  render() {
    if (this.state.winnerId) {
      return (
        <WinnerView
          apiKey={this.props.apiKey}
          id={this.state.winnerId}
          prize={this.props.prize}
          onClose={() => this.setState({ winnerId: null })}
        />
      );
    }
    return (
      <Panel>
        <PanelTitle>
          <FormattedMessage {...messages.panelTitle} />
        </PanelTitle>
        <UserTypeButton
          name="forMods"
          type="button"
          active={this.state.forMods}
          onClick={this.handleToggleButton}
        >
          <FormattedMessage {...messages.moderators} />
        </UserTypeButton>
        <UserTypeButton
          name="forSponsors"
          type="button"
          active={this.state.forSponsors}
          onClick={this.handleToggleButton}
        >
          <FormattedMessage {...messages.sponsors} />
        </UserTypeButton>
        <UserTypeButton
          name="forRegulars"
          type="button"
          active={this.state.forRegulars}
          onClick={this.handleToggleButton}
        >
          <FormattedMessage {...messages.regulars} />
        </UserTypeButton>
        <FormattedMessage {...messages.prize}>
          {(label) => (
            <StyledTextField
              autoFocus
              margin="dense"
              name="prize"
              onChange={(event) => {
                this.props.changePrize(event.target.value);
              }}
              label={label}
              type="text"
              value={this.props.prize}
              fullWidth
            />
          )}
        </FormattedMessage>
        <KeywordInput />
        <RaffleWrapper onWin={this.winHandler} />
        <AdFrame />
      </Panel>
    );
  }
}

GiveawayRules.propTypes = {
  apiKey: PropTypes.string.isRequired,
  changePrize: PropTypes.func.isRequired,
  prize: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  prize: makeSelectGiveawayPrize(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changePrize: (a) => dispatch(changePrize(a)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveawayRules);
