import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import messages from './messages';
import AdFrame from '../AdFrame';
import StreamInfo from '../StreamInfo/StreamInfo';
import Panel from '../Panel';
import PanelTitle from '../Panel/PanelTitle';
import StyledTextField from '../StyledTextField';
import StyledFormControl from '../StyledTextField/StyledFormControl';
import KeywordInput from './KeywordInput';
import LotteryLawWarning from './LotteryLawWarning';
import RaffleWrapper from '../RaffleWrapper';
import WinnerView from '../WinnerView';

class GiveawayRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerId: null,
    };
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.winHandler = this.winHandler.bind(this);
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
        <StyledFormControl margin="normal">
          <InputLabel id="user-type-select">
            <FormattedMessage {...messages.userTypeLabel} />
          </InputLabel>
          <Select
            labelId="user-type-select"
            onChange={(event) => this.props.changeReq(event.target.value)}
            value={this.props.requirement}
            variant="standard"
          >
            <MenuItem value={0}>
              <FormattedMessage {...messages.allViewers} />
            </MenuItem>
            <MenuItem value={1}>
              <FormattedMessage {...messages.subscribers} />
            </MenuItem>
          </Select>
        </StyledFormControl>
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
              variant="standard"
              fullWidth
            />
          )}
        </FormattedMessage>
        <KeywordInput />
        <RaffleWrapper onWin={this.winHandler} />
        <LotteryLawWarning open={this.props.requirement === 1} />
        {(this.props.streamInfo?.platform === 'kick' ||
          this.props.streamInfo?.platform === 'twitch') && (
          <StreamInfo
            streamData={this.props.streamInfo?.streamData}
            platform={this.props.streamInfo?.platform}
          />
        )}
        <AdFrame />
      </Panel>
    );
  }
}

GiveawayRules.propTypes = {
  apiKey: PropTypes.string.isRequired,
  changePrize: PropTypes.func.isRequired,
  changeReq: PropTypes.func.isRequired,
  prize: PropTypes.string,
  requirement: PropTypes.number,
};

export default GiveawayRules;
