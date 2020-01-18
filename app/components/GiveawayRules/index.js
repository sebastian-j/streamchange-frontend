import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Panel from '../Panel';
import PanelTitle from '../Panel/PanelTitle';
import StyledTextField from '../StyledTextField';
import KeywordInput from './KeywordInput';
import RaffleWrapper from '../RaffleWrapper';
import WinnerView from '../WinnerView';

const UserTypeButton = styled.button`
  background-color: transparent;
  border: 1px solid gray;
  color: ${props => props.theme.buttonTextColor};
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

export default class GiveawayRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forMods: true,
      forSponsors: true,
      forRegulars: true,
      prize: '',
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
    const prize = localStorage.getItem('gv-prize');
    this.setState({ forMods, forSponsors, forRegulars, prize });
  }

  handleToggleButton(event) {
    const { target } = event;
    const { name } = target;
    if (name === 'forMods') {
      this.setState(
        prevState => ({
          forMods: !prevState.forMods,
        }),
        () => {
          localStorage.setItem('gv-forMods', this.state.forMods);
        },
      );
    } else if (name === 'forSponsors') {
      this.setState(
        prevState => ({
          forSponsors: !prevState.forSponsors,
        }),
        () => {
          localStorage.setItem('gv-forSponsors', this.state.forSponsors);
        },
      );
    } else if (name === 'forRegulars') {
      this.setState(
        prevState => ({
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
          ownerId={this.props.channelId}
          id={this.state.winnerId}
          prize={this.state.prize}
          onClose={() => this.setState({ winnerId: null })}
        />
      );
    }
    return (
      <Panel>
        <PanelTitle>Zasady losowania</PanelTitle>
        <UserTypeButton
          name="forMods"
          type="button"
          active={this.state.forMods}
          onClick={this.handleToggleButton}
        >
          Moderatorzy
        </UserTypeButton>
        <UserTypeButton
          name="forSponsors"
          type="button"
          active={this.state.forSponsors}
          onClick={this.handleToggleButton}
        >
          Sponsorzy
        </UserTypeButton>
        <UserTypeButton
          name="forRegulars"
          type="button"
          active={this.state.forRegulars}
          onClick={this.handleToggleButton}
        >
          Zwykli użytkownicy
        </UserTypeButton>
        <StyledTextField
          autoFocus
          margin="dense"
          name="prize"
          onChange={this.handleInputValueChange}
          label="Nagroda (opcjonalne)"
          type="text"
          value={this.state.prize}
          fullWidth
        />
        <KeywordInput />
        <RaffleWrapper onWin={this.winHandler} />
      </Panel>
    );
  }
}

GiveawayRules.propTypes = {
  apiKey: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
};
